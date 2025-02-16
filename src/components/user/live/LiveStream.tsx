import React, { useEffect, useState, useRef, useCallback } from 'react';
import SocketIoClient from '../../../config/SocketIoClient';
import socketEvents from '../../../constants/socketEvents';
import { useSelector } from 'react-redux';
import { selectUserSocketId } from '../../../features/user/userSlice';
import { selectAuthUser } from '../../../features/auth/authSlice';
import { LiveUserDataType } from '../../../constants/types';


type Props = {

}

const LiveStream = ({ }: Props) => {
  const socket = SocketIoClient.getInstance();
  const user = useSelector(selectAuthUser);
  const userSocketId = useSelector(selectUserSocketId);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioLocalStream, setAudioLocalStream] = useState<MediaStream | null>(null);
  const myVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<RTCPeerConnection | null>(null);

  // Cleanup: stop all tracks and close connection
  const cleanupResources = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (connectionRef.current) {
      connectionRef.current.close();
      connectionRef.current = null;
    }
    socket?.emit(socketEvents.liveStreamEnded);
  }, [stream, socket]);

  // Acquire local media stream
  useEffect(() => {
    let activeStream: MediaStream | null = null;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((localStream) => {
        activeStream = localStream;
        setStream(localStream);
        const audioOnlyStream = new MediaStream(localStream.getAudioTracks());
        setAudioLocalStream(audioOnlyStream);
        if (myVideo.current) {
          myVideo.current.srcObject = localStream;
        }
      })
      .catch((err) => console.error("Error accessing media devices:", err));

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
      socket?.emit(socketEvents.liveStreamEnded);
    };
  }, [socket]);

  // Create RTCPeerConnection and add local tracks
  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection();

    if (stream) {
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });
    }

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit(socketEvents.liveIceCandidate, {
          candidate: event.candidate,
        });
      }
    };

    peerConnection.onconnectionstatechange = () => {
      console.log("Connection state:", peerConnection.connectionState);
    };

    return peerConnection;
  };

  // End the live stream
  const liveEnd = () => {
    cleanupResources();
    setStream(null);
  };

  // Start the live stream by creating an offer
  const liveStart = async () => {
    if (!stream) {
      console.error("stream is null in liveStart");
      return;
    }
    if (!user || !userSocketId) {
      throw new Error("user or userSocketId is undefined");
    }

    const peerConnection = createPeerConnection();
    connectionRef.current = peerConnection;

    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      const liveUserData: LiveUserDataType = {
        signal: offer,
        from: userSocketId,
        name: user.name,
      };

      // Emit live stream start with offer details
      socket?.emit(socketEvents.liveStreamStarted, liveUserData);
      // Optionally, you can play a ring sound:
      // new Audio(callRingAudio).play();
    } catch (err) {
      console.error("Error creating offer:", err);
    }
  };

  useEffect(() => {
    socket?.on(socketEvents.answeredLiveStream, (data) => {
      console.log(socketEvents.answeredLiveStream)
      if (connectionRef.current) {
        connectionRef.current
          .setRemoteDescription(new RTCSessionDescription(data))
          .then(() => console.log("Remote description set successfully"))
          .catch((error) => console.error("Error setting remote description:", error));
      }

    })

    return () => {
      socket?.off(socketEvents.answeredLiveStream)
    }
  },[socket])

  return (
    <section className="relative rounded-lg bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased h-[80vh] w-[60vw] overflow-hidden">
      <video
        ref={myVideo}
        autoPlay
        muted
        className="w-full h-full object-cover"
      />

      <div className='absolute top-0 right-0 '>
        <button onClick={liveStart} className="capitalize text-sm text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          start live
        </button>

        <button onClick={liveEnd} className="capitalize text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          end stream
        </button>
      </div>

    </section>
  )
}

export default LiveStream
