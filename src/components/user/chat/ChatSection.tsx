import React, { useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import SendMessage from './SendMessage';
import SocketIoClient from '../../../config/SocketIoClient';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearChat, selectChatMessages,
  selectChatRoomId, selectChatUser,
  setAllAsReadMsgNotification,
} from '../../../features/chat/chatSlice';
import { AppDispatch } from '../../../app/store';
import { selectAuthUser } from '../../../features/auth/authSlice';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoMdMore } from 'react-icons/io';
import { receiveMessage } from '../../../features/chat/chatApi';
import DropDown from '../../basic/DropDown';
import { DropDownElementsType } from '../../../constants/types';


type Props = {}

const ChatSection = (props: Props) => {
  const socket = SocketIoClient.getInstance()
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectAuthUser)
  const messageObj = useSelector(selectChatMessages)
  const roomId = useSelector(selectChatRoomId)
  const chatUser = useSelector(selectChatUser)
  const messages = (messageObj && roomId && messageObj[roomId]) ? messageObj[roomId] : []

  const ref = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  const handleScrollToMessage = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', })
    }
  }

  useEffect(() => {
    dispatch(setAllAsReadMsgNotification())
    dispatch(receiveMessage())
    handleScrollToMessage()
  }, [socket])

  const dropDownElements: DropDownElementsType[] = [
    {
      handler: () => {
        dispatch(clearChat())
        setOpen(false)
      },
      name: 'clear Chat'
    }
  ]

  return (
    <section>
      <div className='relative flex justify-start bg-gray-800 px-3 gap-4 items-center py-3 rounded-lg shadow-lg'>
        <Link to='/user-profile'>
          {chatUser?.image
            ? <img className="w-8 h-8 rounded-full" src={chatUser?.image} alt="Neil image" />
            : <FaUserCircle size={35} />
          }
        </Link>
        <h5 className='font-bold '>{chatUser?.name}</h5>
        <div className='w-full flex justify-end item-center'>
          <button onClick={() => setOpen(prev => !prev)} className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" >
            <IoMdMore size={25} />
          </button>
          <DropDown
            open={open}
            elements={dropDownElements}
            position='top-20 '
          />
        </div>
      </div>

      <div className='w-full h-[70vh] space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-200 py-4'>
        {!chatUser &&
          <div className='w-full h-full flex justify-center items-center'>
            <h5 className='font-semibold text-lg'>select a user to chat</h5>
          </div>
        }
        {messages.map((message) => (
          user?._id === message.authorId
            ? <SendMessage
              key={message.authorId}
              id={message.id}
              name={message.authorName}
              userImage={message.authorImage}
              time={message.time}
              status={message.status}
              message={message.message}
            />
            : <ChatMessage
              key={message.authorId}
              id={message.id}
              name={message.authorName}
              userImage={message.authorImage}
              time={message.time}
              status={message.status}
              message={message.message}
            />
        ))}
        <div ref={ref} className='w-full h-24'></div>
      </div>

      <ChatInput
        handleScrollToMessage={handleScrollToMessage}
      />
    </section>
  )
}

export default ChatSection