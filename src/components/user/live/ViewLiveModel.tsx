import { useEffect, useState, useRef, useCallback } from 'react';
import SocketIoClient from '../../../config/SocketIoClient';
import socketEvents from '../../../constants/socketEvents';
import BackdropVerifyOtp from '../../backdrop/BackdropVerifyOtp';
import { motion } from 'framer-motion'
import { dropIn } from '../../../constants/animationDropins';
import { IoClose } from 'react-icons/io5';
import LiveStreamChat from './LiveStreamChat';
import { toast } from 'react-toastify';

type Props = {
  streamerId: string,
  handleClose: () => void
}


const ViewLiveModel = ({ handleClose, streamerId }: Props) => {
  const socket = SocketIoClient.getInstance();

  const [remoteStream, setRemoteStream] = useState<MediaStream>(new MediaStream());
  const [caller, setCaller] = useState(""); // Broadcaster's socket id
  const [_, setName] = useState("");
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
          to: caller,
          streamerUserId: streamerId
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
      toast("Live stream ended !")
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
    socket?.emit(socketEvents.joinRoomLive, { streamerId })

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
    cleanupRemoteStream()
    // socket?.emit(socketEvents.liveStreamEnded)
    socket?.emit(socketEvents.liveUserDisconnect, { streamerId })
    if (connectionRef.current) {
      connectionRef.current.close();
      connectionRef.current = null;
    }
    handleClose();
  }

  return (
    <BackdropVerifyOtp onClick={handleEndViewing}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >


        <section className="relative rounded-lg bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased h-[80vh] md:w-[60vw] w-[90vw] overflow-hidden">
          <video
            ref={userVideo}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <button onClick={handleEndViewing} className="absolute top-0 right-0 m-3 text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
            <IoClose size={20} />
          </button>

          <LiveStreamChat
            socket={socket}
            streamerId={streamerId}
          />
        </section>

      </motion.div>
    </BackdropVerifyOtp>

  );
}

export default ViewLiveModel
