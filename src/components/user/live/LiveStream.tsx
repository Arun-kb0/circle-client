import { useEffect, useState, useRef, useCallback } from 'react';
import SocketIoClient from '../../../config/SocketIoClient';
import socketEvents from '../../../constants/socketEvents';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../../features/auth/authSlice';
import { TransportParamsType } from '../../../constants/types';
import LiveStreamChat from './LiveStreamChat';
import * as mediasoupClient from 'mediasoup-client'


type Props = {

}

const LiveStream = ({ }: Props) => {
  const socket = SocketIoClient.getInstance();
  const user = useSelector(selectAuthUser);
  const myVideo = useRef<HTMLVideoElement>(null);
  const [prepareLiveStream, setPrepareLiveStream] = useState<boolean>(false)

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [device, setDevice] = useState<mediasoupClient.Device | null>(null);
  const [sendTransport, setSendTransport] = useState<mediasoupClient.types.Transport | null>(null);
  const [producer, setProducer] = useState<mediasoupClient.types.Producer | null>(null);
  const [transportConnectionState, setTransportConnectionState] = useState<Map<string, boolean>>(new Map())
  const params = {
    encoding: [
      {
        rid: 'r0',
        maxBitrate: 100000,
        scalabilityMode: 'S1T3'
      },
      {
        rid: 'r1',
        maxBitrate: 300000,
        scalabilityMode: 'S1T3'
      },
      {
        rid: 'r2',
        maxBitrate: 900000,
        scalabilityMode: 'S1T3'
      }
    ],
    codecOptions: {
      videoGoogleStartBitrate: 1000
    }
  }

  // Get local media stream on component mount.
  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
          // Ensure the video element is playing.
          myVideo.current.play().catch(console.error);
        }
      } catch (err) {
        console.error('Error getting user media:', err);
      }
    };

    getMedia();

    // Cleanup: stop tracks when component unmounts.
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Start the live stream using mediasoup-client.
  const liveStart = useCallback(async () => {
    if (!localStream || !socket) {
      console.error('Local stream or socket not available for liveStart.');
      return;
    }

    try {
      // 1. Request router RTP capabilities from the server.
      const routerRtpCapabilities: mediasoupClient.types.RtpCapabilities =
        await new Promise((resolve, reject) => {
          socket.emit(socketEvents.mediaSoupGetRouterRtpCapabilities, {}, (data: any) => {
            if (data.error) {
              reject(data.error);
            } else {
              resolve(data);
              console.log('get route capabilities success .');
              console.log(data)
            }
          });
        });


      // 2. Create and load the mediasoup-client Device.
      const newDevice = new mediasoupClient.Device();
      await newDevice.load({ routerRtpCapabilities });
      setDevice(newDevice);
      console.log('Mediasoup client Device loaded.');

      // 3. Request the server to create a WebRTC transport.
      const transportParams: TransportParamsType = await new Promise((resolve, reject) => {
        socket.emit(socketEvents.mediaSoupCreateWebRtcTransport, {}, (params: any) => {
          if (params.error) {
            reject(params.error);
          } else {
            resolve(params);
            console.log('create producer transport success .')
            console.log(params)
          }
        });
      });

      // 4. Create a Send Transport from the Device.
      const transport = newDevice.createSendTransport(transportParams);
      setSendTransport(transport);

      transport.on('connectionstatechange', state => {
        if (state === 'closed') {
          transport.close();
        }
      });

      // 5. Handle transport 'connect' event.
      transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
        try {
          if (transportConnectionState.get(transport.id)) {
            console.warn('Transport already connected.');
            return;
          }

          socket.emit(
            socketEvents.mediaSoupConnectWebRtcTransport,
            { dtlsParameters, transportId: transportParams.id },
            (response: any) => {
              if (response.error) {
                errback(response.error);
              } else {
                setTransportConnectionState(prev => prev.set(transport.id, true))
                console.warn('Transport connected.');
                callback();
              }
            }
          );
        } catch (error) {
          errback(error as Error);
        }
      });

      // 6. Handle transport 'produce' event.
      transport.on('produce', async ({ kind, rtpParameters }, callback, errback) => {
        socket.emit(
          socketEvents.mediaSoupProduce,
          { kind, rtpParameters, transportId: transportParams.id },
          (response: any) => {
            if (response.error) {
              errback(response.error);
            } else {
              callback({ id: response.id });
            }
          }
        );
      });


      // 7. Produce a video track from the local stream.
      const videoTrack = localStream.getVideoTracks()[0];
      if (!videoTrack) {
        console.error('No video track found in the local stream.');
        return;
      }
      const newProducer = await transport.produce({ track: videoTrack, ...params });
      setProducer(newProducer);

      newProducer.on('trackended', () => {
        console.log('track ended')
      })

      console.log('Producer created with id', newProducer.id);
    } catch (error) {
      console.error('Error during liveStart:', error);
    }
  }, [localStream, socket]);

  // End the live stream: close transports, stop tracks, and notify the server.
  const liveEnd = useCallback(() => {
    // Close producer if it exists.
    if (producer) {
      producer.close();
      setProducer(null);
    }
    // Close the send transport if it exists.
    if (sendTransport) {
      sendTransport.close();
      setSendTransport(null);
    }
    // Optionally, clear the Device.
    if (device) {
      setDevice(null);
    }
    // Stop all local stream tracks.
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    setPrepareLiveStream(false);

    // Notify the server that the live stream has ended.
    socket?.emit(socketEvents.liveStreamEnded, { userId: user?._id });
    console.log('Live stream ended.');
  }, [localStream, socket]);

  // Handler to prepare and start the live stream.
  const handlePrepareLive = () => {
    socket?.emit(socketEvents.prepareLiveStream, { userId: user?._id, name: user?.name });
    setPrepareLiveStream(true);
    liveStart();
  };

  useEffect(() => {
    console.log("transportConnectionState ")
    console.log(transportConnectionState)
  }, [transportConnectionState])

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
