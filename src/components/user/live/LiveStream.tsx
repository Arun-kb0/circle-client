import { useEffect, useState, useRef, useCallback } from 'react';
import SocketIoClient from '../../../config/SocketIoClient';
import socketEvents from '../../../constants/socketEvents';
import { useSelector } from 'react-redux';
import { selectUserSocketId } from '../../../features/user/userSlice';
import { selectAuthUser } from '../../../features/auth/authSlice';
import { AnsweredLiveDataType, LiveUserDataType } from '../../../constants/types';
import LiveStreamChat from './LiveStreamChat';


type Props = {

}

const LiveStream = ({ }: Props) => {
  const socket = SocketIoClient.getInstance();
  const user = useSelector(selectAuthUser);
  const userSocketId = useSelector(selectUserSocketId);

  const [_, setAudioLocalStream] = useState<MediaStream | null>(null);
  const myVideo = useRef<HTMLVideoElement>(null);
  const [isStreamStarted, setIsStreamStarted] = useState<boolean>(false)
  const [prepareLiveStream, setPrepareLiveStream] = useState<boolean>(false)
  const stream = useRef<MediaStream | null>(null)
  const peerConnectionRef = useRef<Map<string, RTCPeerConnection>>(new Map)

  // Cleanup: stop all tracks and close connection
  const cleanupResources = useCallback(() => {
    if (stream.current) {
      stream.current?.getTracks().forEach((track) => track.stop());
    }
    peerConnectionRef.current.forEach(pc => {
      pc.close()
    })
    peerConnectionRef.current.clear()
    socket?.emit(socketEvents.liveStreamEnded, { userId: user?._id });
  }, [stream, socket]);

  // Acquire local media stream
  useEffect(() => {
    let activeStream: MediaStream | null = null;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((localStream) => {
        activeStream = localStream;
        stream.current = localStream
        // setStream(localStream)
        const audioOnlyStream = new MediaStream(localStream.getAudioTracks());
        setAudioLocalStream(audioOnlyStream);
        // *  Function to assign stream to the video element once it's available.
        const assignVideoStream = () => {
          if (myVideo.current) {
            console.log('myVideo.current is available, assigning stream.');
            myVideo.current.srcObject = localStream;
          } else {
            console.warn('myVideo.current not available yet, retrying...');
            requestAnimationFrame(assignVideoStream);
          }
        }

        assignVideoStream();
      })
      .catch((err) => console.error("Error accessing media devices:", err));

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
      socket?.emit(socketEvents.liveStreamEnded, { userId: user?._id });
    };
  }, [socket]);

  // Create RTCPeerConnection and add local tracks
  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection();

    if (stream.current) {
      const currentStream = stream.current
      currentStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, currentStream);
      });
    }

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit(socketEvents.liveIceCandidate, {
          candidate: event.candidate,
          streamerUserId: user?._id
        });
      }
    };

    peerConnection.onconnectionstatechange = () => {
      console.log("Connection state:", peerConnection.connectionState);
    };

    return peerConnection;
  }

  // const reconnectToUser = (peerConnection: RTCPeerConnection, userId: string) => {
  //   if (peerConnection.connectionState === 'closed') {
  //     peerConnection.restartIce()
  //   }
  // }

  // End the live stream
  const liveEnd = () => {
    cleanupResources()
    stream.current = null
    // setStream(null)
    setIsStreamStarted(false)
    setPrepareLiveStream(false)
  }

  const liveStart = async (userId: string) => {
    if (!stream) {
      console.error("stream is null in liveStart");
      return;
    }
    if (!user || !userSocketId) {
      throw new Error("user or userSocketId is undefined");
    }

    if (peerConnectionRef.current.has(userId)) {
      console.log(`connection already exists for ${userId}`)
      // const existingPc = peerConnectionRef.current.get(userId)
      // reconnectToUser(existingPc as RTCPeerConnection, userId)
      return
    }

    const peerConnection = createPeerConnection();
    // connectionRef.current = peerConnection;
    peerConnectionRef.current.set(userId, peerConnection)
    setIsStreamStarted(true)
    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      const liveUserData: LiveUserDataType = {
        signal: offer,
        from: userSocketId,
        name: user.name,
        userId: user._id
      };
      socket?.emit(socketEvents.liveStreamStarted, liveUserData)
      // Optionally, you can play a ring sound:
      // new Audio(callRingAudio).play();
    } catch (err) {
      console.error("Error creating offer:", err);
    }
  }

  useEffect(() => {
    socket?.on(socketEvents.answeredLiveStream, (data: AnsweredLiveDataType) => {
      console.log(socketEvents.answeredLiveStream)
      console.log(data)
      const pc = peerConnectionRef.current.get(data.userId)
      if (pc) {
        pc.setRemoteDescription(new RTCSessionDescription(data.signal))
          .then(() => console.log("Remote description set successfully"))
          .catch((error) => console.error("Error setting remote description:", error));
      }
    })

    return () => {
      socket?.off(socketEvents.answeredLiveStream)
    }
  }, [socket])

  useEffect(() => {
    socket?.on(socketEvents?.joinedRoomLive, (data: { userId: string }) => {
      console.log('user joined on live', data)
      liveStart(data.userId)
    })
    socket?.on(socketEvents?.liveUserDisconnected, (data: { userId: string }) => {
      console.log('user left room', data)
      peerConnectionRef.current.delete(data.userId)
    })

    return () => {
      socket?.off(socketEvents.liveUserDisconnected)
      socket?.off(socketEvents.joinedRoomLive)
    }
  }, [socket, isStreamStarted])

  const handlePrepareLive = () => {
    socket?.emit(socketEvents.prepareLiveStream, { userId: user?._id, name: user?.name })
    setPrepareLiveStream(true)
  }


  return (
    <section className="flex sm:items-center item-start rounded-lg bg-white dark:bg-gray-900 antialiased h-[80vh] md:w-[60vw] w-[90vw] overflow-hidden">

      <div className='space-y-1'>

        <div className='flex justify-center'>
          {prepareLiveStream
            ? (
              <button onClick={liveEnd} className="capitalize rounded-xl text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">
                end stream
              </button>
            ) : (
              <button onClick={handlePrepareLive} className="capitalize rounded-xl text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">
                start live
              </button>
            )
          }
        </div>

        <video
          ref={myVideo}
          autoPlay
          muted
          className="w-full h-full object-cover"
        />

        <LiveStreamChat
          socket={socket}
          streamerId={user?._id as string}
        />

      </div>

    </section>
  )
}

export default LiveStream
