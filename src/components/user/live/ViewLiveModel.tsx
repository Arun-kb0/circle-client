import { useEffect, useState, useRef } from 'react';
import SocketIoClient from '../../../config/SocketIoClient';
import socketEvents from '../../../constants/socketEvents';
import BackdropVerifyOtp from '../../backdrop/BackdropVerifyOtp';
import { motion } from 'framer-motion'
import { dropIn } from '../../../constants/animationDropins';
import { IoClose, IoEyeOutline } from 'react-icons/io5';
import LiveStreamChat from './LiveStreamChat';
import * as mediasoupClient from 'mediasoup-client';
import { ExtendedTransport } from '../../../constants/mediasoupTyes';
import { ChatUserType } from '../../../constants/types';
import LiveRoomUsers from './LiveRoomUsers';

type Props = {
  streamerId: string,
  handleClose: () => void
}


const ViewLiveModel = ({ handleClose, streamerId }: Props) => {
  const socket = SocketIoClient.getInstance();
  const userVideo = useRef<HTMLVideoElement>(null);
  const [, setDevice] = useState<mediasoupClient.Device | null>(null);
  const [consumerTransport, setConsumerTransport] = useState<mediasoupClient.types.Transport | null>(null);
  const [, setTransportParams] = useState<mediasoupClient.types.TransportOptions | null>(null);
  const [consumer, setConsumer] = useState<mediasoupClient.types.Consumer | null>(null);
  const [isStreamEnded, setIsStreamEnded] = useState(false)
  const [liveRoomUsers, setLiveRoomUsers] = useState<ChatUserType[]>([])
  const [isLiveRoomUsersOpen, setIsLiveRoomUsersOpen] = useState(false)
  const hasStartedViewing = useRef(false);


  // End viewing session cleanly
  const handleEndViewing = () => {
    if (consumer) {
      consumer.close();
      setConsumer(null);
    }
    if (consumerTransport) {
      consumerTransport.close();
      setConsumerTransport(null);
    }
    if (userVideo.current) {
      userVideo.current.srcObject = null;
    }
    socket?.emit(socketEvents.userLiveStreamEnded, { streamerUserId: streamerId });
    console.log('Viewing session ended.');
    setIsStreamEnded(true)
    handleClose()
  };


  useEffect(() => {

    const startViewing = async (): Promise<void> => {
      // Validate conditions
      if (!streamerId || !socket) return;
      if (hasStartedViewing.current) return;
      hasStartedViewing.current = true
      console.log('startViewing called !!! ')

      try {
        socket.emit(socketEvents.joinRoomLive, { streamerId }, (data: any) => {
          setLiveRoomUsers(data.usersInStream)
        })
        // STEP 1: Get Router RTP Capabilities from the server.
        const capabilities: any = await new Promise((resolve, reject) => {
          socket.emit(socketEvents.mediaSoupGetRouterRtpCapabilities, {}, (data: any) => {
            if (data.error) {
              reject(new Error(data.error));
            } else {
              console.log("get route capabilities success.");
              resolve(data);
            }
          });
        });
        console.log("Router RTP Capabilities:", capabilities);

        // STEP 2: Create and load the mediasoup-client Device.
        const newDevice = new mediasoupClient.Device();
        await newDevice.load({ routerRtpCapabilities: capabilities });
        setDevice(newDevice);
        console.log("Mediasoup client Device loaded.");

        // STEP 3: Request the server to create a Consumer Transport.
        const transportParamsData: any = await new Promise((resolve, reject) => {
          socket.emit(
            socketEvents.mediaSoupCreateWebRtcTransport,
            { consumer: true },
            (data: any) => {
              if (data.error) {
                reject(new Error(data.error));
              } else {
                setTransportParams(data);
                console.log("create consumer transport success.");
                resolve(data);
              }
            }
          );
        });

        // STEP 4: Create and connect the Consumer Transport on the client.
        const transport = newDevice.createRecvTransport(transportParamsData) as ExtendedTransport;
        setConsumerTransport(transport);


        transport.on('connectionstatechange', state => {
          console.log('event - connectionstatechange - ', state)
          if (state === 'closed') {
            transport.close();
          }
        });
       
        // Attach the connect event handler.
        transport.on("connect", async ({ dtlsParameters }, callback, errback) => {
          try {
            if (transport._isConnected) {
              console.warn("Transport already connected.");
              return callback();
            }
            socket.emit(
              socketEvents.mediaSoupConnectWebRtcTransport,
              { dtlsParameters, transportId: transport.id },
              (response: any) => {
                if (response.error) {
                  errback(response.error);
                } else {
                  transport._isConnected = true;
                  console.log("Transport connected.");
                  callback();
                }
              }
            );
          } catch (error) {
            if (error instanceof Error)
              errback(error);
          }
        });

        // STEP 5: Request the server to start consuming media and create a Consumer.
        const newConsumer: mediasoupClient.types.Consumer = await new Promise((resolve, reject) => {
          socket.emit(
            socketEvents.mediaSoupConsume,
            {
              transportId: transport.id,
              rtpCapabilities: newDevice.rtpCapabilities
            },
            async (data: any) => {
              if (data.error) {
                reject(new Error(data.error));
              } else {
                try {
                  const consumerInstance = await transport.consume({
                    id: data.id,
                    producerId: data.producerId,
                    kind: data.kind,
                    rtpParameters: data.rtpParameters
                  });
                  setConsumer(consumerInstance);
                  console.warn("consume media success.");
                  console.log(consumerInstance);
                  resolve(consumerInstance);
                } catch (consumeError) {
                  reject(consumeError);
                }
              }
            }
          );
        });

        // STEP 6: Attach the Consumer's track to the video element.
        const { track } = newConsumer;
        const stream = new MediaStream([track]);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
          socket.emit(socketEvents.mediaSoupConsumerResume);
        }
        console.log("Consumer created and stream attached.");

      } catch (error) {
        console.error("Error starting viewing:", error);
      }
    };

    // Execute the unified method.
    startViewing();

    // Cleanup function when component is unmounted or dependencies change.
    return () => {
      // Close the consumer and transport if they exist.
      consumer?.close();
      consumerTransport?.close();
      if (userVideo.current) {
        userVideo.current.srcObject = null;
      }
      socket?.off(socketEvents.joinRoomLive)
    };
  }, [streamerId]);

  useEffect(() => {
    const handleLiveViewerJoin = (data: { userId: string, usersInStream: ChatUserType[] }) => {
      console.log(data)
      setLiveRoomUsers(data.usersInStream)
    }
    const handleViewerDisconnect = (data: { userId: string, usersInStream: ChatUserType[] }) => {
      console.log(data)
      setLiveRoomUsers(data.usersInStream)
    }
    socket?.on(socketEvents.joinedRoomLive, handleLiveViewerJoin)
    socket?.on(socketEvents.liveUserDisconnected, handleViewerDisconnect)
    return () => {
      socket?.off(socketEvents.joinedRoomLive, handleLiveViewerJoin)
      socket?.off(socketEvents.liveUserDisconnected, handleViewerDisconnect)
    }
  }, [socket])

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
          {/* <button onClick={handleEndViewing} className="absolute top-0 right-0 m-3 text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
            <IoClose size={20} />
          </button> */}

          <div className='absolute top-0 right-0 flex gap-1 z-10'>
            <div className='flex justify-center items-center'>
              <button onClick={() => setIsLiveRoomUsersOpen(prev => !prev)} className="flex justify-center items-center gap-1 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 rounded-lg text-sm px-5 py-2.5 text-center">
                <IoEyeOutline size={20} />
                {liveRoomUsers.length}
              </button>

              <button onClick={handleEndViewing} className="m-3 text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
                <IoClose size={20} />
              </button>
            </div>
          </div>

          {isLiveRoomUsersOpen &&
            <LiveRoomUsers
              liveRoomUsers={liveRoomUsers}
            />
          }

          <LiveStreamChat
            socket={socket}
            streamerId={streamerId}
            isStreamEnded={isStreamEnded}
          />
        </section>

      </motion.div>
    </BackdropVerifyOtp>

  );
}

export default ViewLiveModel
