import { useState, useEffect, useCallback } from 'react';
import socketEvents from '../constants/socketEvents';
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket | null,
}

const usePeerConnection = ({ socket }: Props) => {
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream>(new MediaStream())
  const [stream, setStream] = useState<MediaStream>(new MediaStream())
  const [caller, setCaller] = useState<string>()
  const [idToCall, setIdToCall] = useState<string>()

  const createPeerConnection = useCallback(() => {
    const pc = new RTCPeerConnection();

    // Add local tracks to the connection if available
    if (stream) {
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
    }

    // Listen for remote tracks and update the remote stream state
    pc.ontrack = (event) => {
      console.log("Remote track received:", event.track);
      setRemoteStream((prevStream) => {
        // Combine existing tracks with the new one
        const newTracks = [...prevStream.getTracks(), event.track];
        return new MediaStream(newTracks);
      });
    };

    // Send ICE candidates to the remote peer via socket
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit(socketEvents.iceCandidate, {
          candidate: event.candidate,
          to: caller || idToCall,
        });
      }
    };

    // Log connection state changes
    pc.onconnectionstatechange = () => {
      console.log("Connection state:", pc.connectionState);
    };

    setPeerConnection(pc);
    return pc;
  }, [stream, socket, caller, idToCall]);

  useEffect(() => {
    // Re-create the peer connection whenever the local stream changes
    if (stream) {
      const pc = createPeerConnection();
      return () => {
        // Cleanup: close the peer connection on unmount or if stream changes
        pc.close();
        setPeerConnection(null);
      };
    }
  }, [stream, createPeerConnection]);

  return {
    peerConnection,
    remoteStream,
    createPeerConnection,
    setPeerStream: setStream,
    setPeerCaller: setCaller,
    setPeerIdToCall: setIdToCall
  }
}

export default usePeerConnection;
