import React, { useCallback, useEffect, useRef, useState } from "react"
import BackdropVerifyOtp from "../../backdrop/BackdropVerifyOtp"
import { motion, useElementScroll } from "framer-motion"
import { dropIn } from "../../../constants/animationDropins"
import { FaVideo } from "react-icons/fa"
import { MdCall, MdCallEnd } from "react-icons/md"
import { useSelector } from "react-redux"
import {
  selectChatCallRoomId,
  selectChatCallStatus,
  selectChatCallUser,
  selectChatUser,
  setCallRoomId,
} from "../../../features/chat/chatSlice"
import socketEvents from "../../../constants/socketEvents"
import SocketIoClient from "../../../config/SocketIoClient"
import { CallUserEventDataType, SignalDataType } from "../../../constants/types"
import { v4 as uuid } from 'uuid'
import { selectAuthFriendsRoomId, selectAuthUser } from "../../../features/auth/authSlice"
import callRingAudio from '../../../assets/audio/chime_ding.mp3'
import { selectCallNotification } from "../../../features/notification/notificationSlice"
import Peer from 'simple-peer'


type Props = {
  handleClose: () => void;
  callModelType: "video" | "audio";
};

const CallModel = ({ handleClose, callModelType }: Props) => {
  const socket = SocketIoClient.getInstance()
  const callRoomId = useSelector(selectChatCallRoomId);
  const callUserDetails = useSelector(selectChatCallUser);
  const status = useSelector(selectChatCallStatus);
  const chatUser = useSelector(selectChatUser)
  const user = useSelector(selectAuthUser)
  const friendsRoomId = useSelector(selectAuthFriendsRoomId)
  const callNotificationState = useSelector(selectCallNotification)


  const [me, setMe] = useState(callRoomId)
  const [stream, setStream] = useState<MediaStream>()
  const [remoteStream, setRemoteStream] = useState<MediaStream>(new MediaStream())
  const [receivingCall, setReceivingCall] = useState(false)
  const [caller, setCaller] = useState("")
  const [callerSignal, setCallerSignal] = useState<any>(null)
  const [callAccepted, setCallAccepted] = useState(false)
  const [idToCall, setIdToCall] = useState(callRoomId)
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState("")

  const myVideo = useRef<HTMLVideoElement>(null)
  const userVideo = useRef<HTMLVideoElement>(null)
  const connectionRef = useRef<RTCPeerConnection | null>(null)

  const iceConfiguration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  }

  const play = () => {
    new Audio(callRingAudio).play()
  }

  const cleanupResources = useCallback(() => {
    stream?.getTracks()?.forEach(track => track.stop())
    connectionRef.current?.close()
    connectionRef.current = null
    socket?.off(socketEvents.iceCandidate)
  }, [stream, socket])

  useEffect(() => {
    // Get local video/audio stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((localStream) => {
        setStream(localStream);
        if (myVideo.current) {
          myVideo.current.srcObject = localStream;
        }
      })
      .catch((err) => console.error("Error accessing media devices:", err));

    
    // Listen for incoming call event
    socket?.on(socketEvents.callUser, (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    return () => {
      cleanupResources()
    };
  }, [socket])

  useEffect(() => {
    if (userVideo.current) {
      userVideo.current.srcObject = remoteStream;
      userVideo.current.onloadedmetadata = () => {
        userVideo.current!.play().catch(err => console.error("Error playing video:", err));
      }
    }
  }, [remoteStream]);

  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection()

    if (stream) {
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      })
    }

    peerConnection.ontrack = (event) => {
      console.log("Remote track received:", event.track);
      setRemoteStream((prev) => {
        const newTracks = [...prev.getTracks(), event.track];
        const newStream = new MediaStream(newTracks);
        console.log("New remoteStream video tracks:", newStream.getVideoTracks());
        console.log("New remoteStream audio tracks:", newStream.getAudioTracks());
        return newStream;
      })
    }

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit(socketEvents.iceCandidate, {
          candidate: event.candidate,
          to: caller || idToCall, 
        })
      }
    }

    peerConnection.onconnectionstatechange = () => {
      console.log("Connection state:", peerConnection.connectionState);
    }

    return peerConnection;
  }


  const callUser = async (id: string) => {
    if (!stream) {
      console.error("stream is null in callUser");
      return
    }

    const peerConnection = createPeerConnection()
    connectionRef.current = peerConnection

    try {
      // Create an offer and set it as local description
      const offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)


      // Send the offer to the callee via signaling server
      const callUserData = {
        userToCall: id,
        signal: offer, // sending the SDP offer
        from: me,
        name: name,
      };
      socket?.emit(socketEvents.callUser, callUserData)
    } catch (err) {
      console.error("Error creating offer:", err)
    }

    // Listen for the answer from the callee
    socket?.on(socketEvents.callAccepted, async (signal) => {
      setCallAccepted(true)
      try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(signal))
      } catch (err) {
        console.error("Error setting remote description:", err)
      }
    })

    // Listen for ICE candidates from remote peer
    socket?.on(socketEvents.iceCandidate, (candidate) => {
      if (candidate) {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
      }
    })
  }

  const answerCall = async () => {
    if (!stream || !callerSignal) {
      console.error("Stream or callerSignal is not available in answerCall")
      return
    }

    setCallAccepted(true)
    const peerConnection = createPeerConnection()
    connectionRef.current = peerConnection

    // Listen for ICE candidates from the caller
    socket?.on(socketEvents.iceCandidate, (candidate) => {
      if (candidate) {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
      }
    })

    try {
      // Set the remote description with the received offer (callerSignal)
      await peerConnection.setRemoteDescription(new RTCSessionDescription(callerSignal))

      // Create an answer and set it as local description
      const answer = await peerConnection.createAnswer()
      await peerConnection.setLocalDescription(answer)

      // Send the answer back to the caller
      socket?.emit(socketEvents.answerCall, { signal: answer, to: caller })
    } catch (err) {
      console.error("Error answering call:", err)
    }
  }


  const leaveCall = () => {
    setCallEnded(true)
    if (connectionRef.current) {
      connectionRef.current.close()
      connectionRef.current = null
    }
    socket?.emit(socketEvents.leaveCall)
  }

  return (
    <BackdropVerifyOtp onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <section className="rounded-lg bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased h-[80vh] w-[60vw] overflow-hidden">
          {/* Video Call Section */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="p-3 mb-8 w-11/12 h-full flex flex-col md:flex-row gap-4 overflow-hidden rounded-lg border border-gray-400">
              {stream &&
                <video
                  ref={myVideo}
                  playsInline
                  autoPlay
                  muted
                  className="w-full md:w-1/2 h-full rounded-lg bg-black"
                />
              }

              {callAccepted && !callEnded
                ? (
                  <video
                    ref={userVideo}
                    playsInline
                    autoPlay
                    className="w-full md:w-1/2 h-full rounded-lg bg-black"
                  />
                ) : null
              }
            </div>
          </div>

          <div className="flex gap-3 justify-center items-center">

            {callAccepted && !callEnded
              ? (
                <button onClick={leaveCall} className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
                  <MdCallEnd size={20} />
                </button>
              )
              : (
                <button onClick={() => callUser(callRoomId as string)} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                  <MdCall size={20} />
                </button>
              )
            }

            {receivingCall && !callAccepted &&
              <button onClick={answerCall} className="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-green-500">
                <MdCall size={20} />
              </button>
            }
          </div>

        </section>
      </motion.div>
    </BackdropVerifyOtp>
  )
}

export default CallModel
