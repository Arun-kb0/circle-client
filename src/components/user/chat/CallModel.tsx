import React, { useCallback, useEffect, useRef, useState } from "react";
import BackdropVerifyOtp from "../../backdrop/BackdropVerifyOtp";
import { motion, useElementScroll } from "framer-motion";
import { dropIn } from "../../../constants/animationDropins";
import { FaVideo } from "react-icons/fa";
import { MdCall, MdCallEnd } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  selectChatCallRoomId,
  selectChatCallStatus,
  selectChatCallUser,
  selectChatUser,
  setCallRoomId,
} from "../../../features/chat/chatSlice";
import socketEvents from "../../../constants/socketEvents";
import SocketIoClient from "../../../config/SocketIoClient";
import { SignalDataType } from "../../../constants/types";
import { v4 as uuid } from 'uuid'
import { selectAuthUser } from "../../../features/auth/authSlice";

type Props = {
  handleClose: () => void;
  callModelType: "video" | "audio";
};

const CallModel = ({ handleClose, callModelType }: Props) => {
  const socket = SocketIoClient.getInstance()
  const callRoomId = useSelector(selectChatCallRoomId);
  // const callUser = useSelector(selectChatCallUser);
  const status = useSelector(selectChatCallStatus);
  const chatUser = useSelector(selectChatUser)
  const user = useSelector(selectAuthUser)

  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [message, setMessage] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const negotiationPendingRef = useRef(false);


  const play = () => {

  }


  const cleanupResources = useCallback(() => {
    localStream?.getTracks().forEach((track) => track.stop())
    peerConnectionRef.current?.close()
    peerConnectionRef.current = null
    socket.off(socketEvents.signal, handleSignal)
  }, [localStream, socket])

  const createPeerConnection = useCallback(() => {
    const peerConnection = new RTCPeerConnection()

    peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        socket.emit(socketEvents.signal, {
          type: 'candidate',
          candidate,
          roomId: callRoomId,
          caller: socket.id
        })
      }
    }

    peerConnection.ontrack = ({ streams }) => {
      console.log('peerConnection.ontrack = ' ,streams.toString())
      if (streams[0]) {
        setRemoteStream(streams[0])
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = streams[0]
        }
      }
    }

    peerConnection.onconnectionstatechange = () => {
      if (peerConnection.connectionState === 'failed') {
        console.error('peer connection failed')
      }
    }

    return peerConnection
  }, [callRoomId, socket])

  const callUser = useCallback(async () => {
    if (negotiationPendingRef.current) return
    const peerConnection = createPeerConnection()
    localStream?.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream)
    })
    peerConnectionRef.current = peerConnection

    try {
      const offer = await peerConnection.createOffer()
      negotiationPendingRef.current = true
      await peerConnection.setLocalDescription(offer)
      socket.emit(socketEvents.signal, {
        type: 'offer',
        offer,
        roomId: callRoomId,
        caller: socket.id
      })
      socket.emit(socketEvents.callStarted, { roomId: callRoomId })
      
      console.log('call request send ')
      console.log(socketEvents.signal)
      console.log(socketEvents.callStarted)
    } catch (error) {
      console.log(error)
      negotiationPendingRef.current = false
    }
  }, [localStream, callRoomId, socket, createPeerConnection])


  const handleSignal = useCallback(async (data: any) => {
      console.log('handle signal')
      console.log('handle signal data.type', data.type)
      const peerConnection = peerConnectionRef.current || createPeerConnection()
      peerConnectionRef.current = peerConnection

      try {
        if (data.type === 'offer') {
          await handleOffer(peerConnection, data.offer)
        } else if (data.type === 'answer') {
          await handleAnswer(peerConnection, data.answer)
        } else if (data.candidate) {
          const newCandidate = new RTCIceCandidate(data.candidate)
          await peerConnection.addIceCandidate(newCandidate)
        }
      } catch (error) {
        console.log(error)
      }
  }, [createPeerConnection])

  useEffect(() => {
    const initLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        setLocalStream(stream)
      } catch (error) {
        console.log(error)
      }
    }

    initLocalStream()
    socket.on(socketEvents.signal, handleSignal)
    return cleanupResources
  }, [callRoomId, socket])

  useEffect(() => {
    if (socket) {
      socket.on(socketEvents.callStarted, () => {
        console.log('call started')
        if (!isJoined) {
          console.log('call started true')
          setIsCallStarted(true)
          play()
          setIsJoined(true);
          // if (callUser) callUser();
        } else {
          console.log('call started false')
          setIsCallStarted(false)
        }
      })
    }

    return () => {
      socket.off(socketEvents.callStarted);
    }
  }, [socket, isJoined])

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream
    }
  }, [localStream])


  const handleOffer = async (peerConnection: RTCPeerConnection, offer: RTCSessionDescriptionInit) => {
    if (!offer || peerConnection.signalingState !== 'stable') return
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
   
    localStream?.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream)
    })
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
    socket.emit(socketEvents.signal, {
      type: 'answer',
      answer,
      roomId: callRoomId,
      caller: socket.id
    })
  }

  const handleAnswer = async (peerConnection: RTCPeerConnection, answer: RTCSessionDescriptionInit) => {
    console.log("Peer connection state before setting answer:", peerConnection.signalingState);

    if (!answer || peerConnection.signalingState !== 'have-local-offer') {
      console.warn("Answer ignored: signaling state is", peerConnection.signalingState);
      return
    }
    const answerInstance = new RTCSessionDescription(answer)
    await peerConnection.setRemoteDescription(answerInstance)
    negotiationPendingRef.current = false
  }

  const toggleAudio = useCallback(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
        setAudioEnabled(track.enabled);
      })
    }
  }, [localStream])

  const endCall = useCallback(() => {
    cleanupResources()
  }, [cleanupResources, callRoomId])



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
              {/* Local Video */}
              <video
                ref={localVideoRef}
                autoPlay
                muted
                className="w-full md:w-1/2 h-full rounded-lg bg-black"
              ></video>

              {/* Remote Video */}
              <video
                ref={remoteVideoRef}
                autoPlay
                className="w-full md:w-1/2 h-full rounded-lg bg-black"
              ></video>
            </div>
          </div>

          <div className="flex gap-3 justify-center items-center">
            <button onClick={callUser} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
              <FaVideo size={20} />
            </button>
            <button onClick={callUser} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
              <MdCall size={20} />
            </button>
            <button onClick={endCall} className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
              <MdCallEnd size={20} />
            </button>
          </div>

        </section>
      </motion.div>
    </BackdropVerifyOtp>
  );
};

export default CallModel;
