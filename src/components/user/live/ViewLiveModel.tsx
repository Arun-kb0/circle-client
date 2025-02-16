import React, { useEffect, useState, useRef, useCallback } from 'react';
import SocketIoClient from '../../../config/SocketIoClient';
import socketEvents from '../../../constants/socketEvents';
import { selectUserSocketId, setUserSocketId } from '../../../features/user/userSlice';
import { useSelector } from 'react-redux';

type Props = {
  handleClose: () => void
}
const config = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    // Optionally add TURN servers here for more robust connectivity.
  ]
};


const ViewLiveModel = ({ handleClose }: Props) => {
  const socket = SocketIoClient.getInstance();
  const userSocketId = useSelector(selectUserSocketId);

  const [remoteStream, setRemoteStream] = useState<MediaStream>(new MediaStream());
  const [caller, setCaller] = useState(""); // Broadcaster's socket id
  const [name, setName] = useState("");
  const [callerSignal, setCallerSignal] = useState<any>(null);

  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<RTCPeerConnection | null>(null);
  // Candidate queue for ICE candidates received before remote description is set.
  const candidateQueueRef = useRef<RTCIceCandidateInit[]>([]);


  const cleanupRemoteStream = useCallback(() => {
    remoteStream.getTracks().forEach((track) => track.stop());
  }, [remoteStream]);

  // Create a peer connection (viewer doesn't add local tracks)
  const createPeerConnection = useCallback(() => {
    const peerConnection = new RTCPeerConnection();

    // When remote tracks arrive, add them to the remote stream
    peerConnection.ontrack = (event) => {
      console.log("Remote track received:", event.track);
      setRemoteStream((prev) => {
        const newTracks = [...prev.getTracks(), event.track];
        return new MediaStream(newTracks);
      });
    };

    // Send ICE candidates from the viewer back to the broadcaster,
    // or queue them if remoteDescription is not yet set.
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        if (peerConnection.remoteDescription) {
          peerConnection
            .addIceCandidate(new RTCIceCandidate(event.candidate))
            .catch(err => console.error("Error adding ICE candidate:", err));
        } else {
          candidateQueueRef.current.push(event.candidate.toJSON());
        }
        // Also send candidates to broadcaster
        socket?.emit(socketEvents.liveIceCandidate, {
          candidate: event.candidate,
          to: caller, // send to broadcaster
        });
      }
    };

    peerConnection.onconnectionstatechange = () => {
      console.log("Connection state:", peerConnection.connectionState);
    };

    return peerConnection;
  }, [socket, caller]);

  // Listen for broadcaster's live stream events
  useEffect(() => {
    socket?.on(socketEvents.userLiveStreamStarted, (data) => {
      console.log('Live stream started from broadcaster:', data);
      setCaller(data.socketId || data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    socket?.on(socketEvents.userLiveStreamEnded, (data) => {
      console.log('Live stream ended from broadcaster:', data);
      cleanupRemoteStream();
      setRemoteStream(new MediaStream());
    });

    socket?.on(socketEvents.liveIceCandidate, (candidate: RTCIceCandidateInit) => {
      if (candidate && connectionRef.current) {
        if (connectionRef.current.remoteDescription) {
          connectionRef.current.addIceCandidate(new RTCIceCandidate(candidate))
            .catch(err => console.error("Error adding ICE candidate:", err));
        } else {
          candidateQueueRef.current.push(candidate);
        }
      }
    });

    return () => {
      socket?.off(socketEvents.userLiveStreamStarted);
      socket?.off(socketEvents.userLiveStreamEnded);
      socket?.off(socketEvents.liveIceCandidate);
    };
  }, [socket, cleanupRemoteStream]);

  // Create peer connection on mount
  useEffect(() => {
    const pc = createPeerConnection();
    connectionRef.current = pc;
  }, [createPeerConnection]);

  // When callerSignal (offer from broadcaster) is received,
  // set remote description, flush queued ICE candidates, create an answer, and send it back.
  useEffect(() => {
    if (callerSignal && connectionRef.current) {
      const pc = connectionRef.current;
      pc.setRemoteDescription(new RTCSessionDescription(callerSignal))
        .then(() => {
          // Flush queued ICE candidates
          candidateQueueRef.current.forEach((candidate) => {
            pc.addIceCandidate(new RTCIceCandidate(candidate))
              .catch(err => console.error("Error adding queued ICE candidate:", err));
          });
          candidateQueueRef.current = [];
          return pc.createAnswer();
        })
        .then((answer) => {
          return pc.setLocalDescription(answer).then(() => answer);
        })
        .then((answer) => {
          socket?.emit(socketEvents.answerLiveStream, { signal: answer, to: caller });
        })
        .catch((error) => {
          console.error("Error handling callerSignal:", error);
        });
    }
  }, [callerSignal, socket, caller]);

  // Attach the remote stream to the video element
  useEffect(() => {
    if (userVideo.current) {
      userVideo.current.srcObject = remoteStream;
      userVideo.current.onloadedmetadata = () => {
        userVideo.current?.play().catch(err => console.error("Error playing video:", err));
      };
    }
  }, [remoteStream]);

  const handleEndViewing = () => {
    cleanupRemoteStream();
    socket?.emit(socketEvents.liveStreamEnded);
    if (connectionRef.current) {
      connectionRef.current.close();
      connectionRef.current = null;
    }
    handleClose();
  };

  
  return (
    <section className="relative rounded-lg bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased h-[80vh] w-[60vw] overflow-hidden">

      <video
        ref={userVideo}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
      <button onClick={handleEndViewing} className="absolute top-0 right-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        End Viewing
      </button>

    </section>

  );
}

export default ViewLiveModel
