import React, { useEffect, useState } from 'react'
import SocketIoClient from '../../../config/SocketIoClient'
import { LiveMessageType } from '../../../constants/types'
import socketEvents from '../../../constants/socketEvents'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../../../features/auth/authSlice'
import { Socket } from 'socket.io-client'
import LiveMessage from './liveMessage'



const messages = [
  {
    id: uuid(),
    streamerId: "streamer1",
    authorId: "user1",
    authorName: "Alice Johnson",
    message: "Hi everyone! Excited to be here.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuid(),
    streamerId: "streamer2",
    authorId: "user2",
    authorName: "Bob Smith",
    message: "Hey Alice, welcome to the stream!",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuid(),
    streamerId: "streamer3",
    authorId: "user3",
    authorName: "Charlie Lee",
    message: "Can anyone recommend a good beginner's guide for this topic?",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuid(),
    streamerId: "streamer4",
    authorId: "user4",
    authorName: "Diana Prince",
    message: "I really like the way the streamer explains things!",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuid(),
    streamerId: "streamer5",
    authorId: "user5",
    authorName: "Ethan Clark",
    message: "Great session! Looking forward to the next one.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];



type Props = {
  streamerId: string
  socket: Socket | null
}

const LiveStreamChat = ({ streamerId, socket }: Props) => {
  const user = useSelector(selectAuthUser)
  const [messages, setMessages] = useState<LiveMessageType[]>([])

  const {
    register,
    handleSubmit } = useForm({
      defaultValues: {
        messageText: "",
      },
    })

  useEffect(() => {
    socket?.on(socketEvents.liveReceiveMessage, (msg:LiveMessageType) => {
      console.log(socketEvents.liveReceiveMessage)
      console.log(msg)
      setMessages(prev => [...prev, msg])
    })
    return () => {
      socket?.off(socketEvents.liveReceiveMessage)
    }
  }, [socket])

  const onSubmit = (data: { messageText: string }) => {
    if (!user) return
    const msg: LiveMessageType = {
      id: uuid(),
      streamerId: streamerId,
      authorId: user._id,
      authorName: user.name,
      authorImage: user.image?.url,
      message: data.messageText,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    socket?.emit(socketEvents.liveSendMessage, msg)
    setMessages(prev => [...prev, msg])
  }

  useEffect(() => {
    console.log('messages array useEffect')
    console.log(messages)
  }, [messages.length])

  return (
    <section className="absolute top-[40%] w-full max-w-lg mx-auto h-[53%] bg-transparent bg-opacity-70 rounded-lg shadow-md flex flex-col justify-between">
      <div className="flex-1 overflow-y-scroll scrollbar-hide p-4 space-y-3 h-[40%]">
        {messages.map((msg) => (
          <LiveMessage key={msg.id} message={msg} />
        ))}
      </div>

      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center w-full p-2">
          <input
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            id="messageText"
            {...register("messageText", {
              required: "Message text is required",
            })}
            placeholder="Type your message..."
          />
        </form>
      </div>

    </section>


  )
}

export default LiveStreamChat