import React, { useState } from 'react'
import { BsSendFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { selectChatRoomId } from '../../../features/chat/chatSlice';
import { selectAuthUser } from '../../../features/auth/authSlice';
import { time } from 'framer-motion';
import { MessageType } from '../../../constants/types';
import SocketIoClient from '../../../config/SocketIoClient';

type Props = {

}

const ChatInput = (props: Props) => {
  const socket = SocketIoClient.getInstance()
  const roomId = useSelector(selectChatRoomId)
  const user = useSelector(selectAuthUser)
  const [currentMessage, setCurrentMessage] = useState('')

  const handleSendMessage = async () => {
    console.log("handleSendMessage")
    if (user && roomId && currentMessage !== "") {
      const messageData: MessageType = {
        roomId,
        authorId: user?._id,
        authorName: user?.name,
        authorImage: user?.image?.url,
        message: currentMessage,
        time: new Date(),
        status: 'sent'
      }
      console.log(messageData)
      await socket.emit('send-message',messageData)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="mb-6">
      <div className='flex gap-7 items-center'>
        <input
          onChange={e => setCurrentMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          id="large-input"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button onClick={handleSendMessage}  className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          <BsSendFill size={22} />
        </button>
      </div>

    </div>
  )
}

export default ChatInput