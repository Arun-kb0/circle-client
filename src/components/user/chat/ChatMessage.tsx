import moment from 'moment';
import React, { useState } from 'react'
import { IoMdMore } from "react-icons/io";
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import DropDown from '../../basic/DropDown';
import { DropDownElementsType, MessageType } from '../../../constants/types';
import { deleteMessage } from '../../../features/chat/chatApi';
import SocketIoClient from '../../../config/SocketIoClient';
import socketEvents from '../../../constants/socketEvents';
import { edit } from '@cloudinary/url-gen/actions/animated';


type Props = {
  message: MessageType
  isUserSendMessage: boolean
}

const ChatMessage = ({ message, isUserSendMessage }: Props) => {
  const socket = SocketIoClient.getInstance()
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editValue, setEditValue] = useState(message.message)

  const senderDropDownElements: DropDownElementsType[] = [
    {
      handler: () => {
        navigator.clipboard.writeText(message.message)
        setOpen(false)
      },
      name: 'Copy'
    },
    {
      handler: () => {
        socket?.emit(socketEvents.messageDeleted, message)
        dispatch(deleteMessage(message.id))
        setOpen(false)
      },
      name: 'Delete'
    },
    {
      handler: () => {
        setIsEdit(prev => !prev)
        setOpen(false)
      },
      name: 'Edit'
    }
  ]
  const receiverDropDownElements: DropDownElementsType[] = [
    {
      handler: () => {
        navigator.clipboard.writeText(message.message)
        setOpen(false)
      },
      name: 'Copy'
    }
  ]

  const handleEdit = (type: 'text' | 'audio' | 'gif' | 'cancel') => {
    console.log('handle editedMessage')
    if (type === 'text') {
      if (editValue === '') return
      const editedMessage = {
        ...message,
        message: editValue,
        updatedAt: new Date().toISOString(),
      }
      socket?.emit(socketEvents.editMessage, editedMessage)
      setIsEdit(false)
    } else if (type === 'cancel') {
      setEditValue(message.message)
      setIsEdit(false)
    }
  }

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEdit('text')
    }
  }

  return (

    <article className={`flex items-start ${isUserSendMessage ? 'justify-end' : 'justify-start'} gap-2.5 relative`}>

      {!isUserSendMessage &&
        <div>
          {message.authorImage
            ? <img className="w-8 h-8 rounded-full object-cover" src={message.authorImage} alt={message.authorName} />
            : <FaUserCircle />
          }
        </div>
      }

      <div className={`${isUserSendMessage ? 'rounded-xl rounded-tr-none bg-gray-800' : 'rounded-e-xl rounded-es-xl bg-gray-600'} flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200`}>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{message.authorName}</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{moment(message.createdAt).fromNow()}</span>
        </div>
        {isEdit
          ? (
            <div>
              <input
                onChange={e => setEditValue(e.target.value)}
                onKeyDown={handleEditKeyDown}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                value={editValue}
                required
              />
              <div className='flex gap-1 py-1'>
                <button onClick={() => handleEdit('text')} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">save</button>
                <button onClick={() => handleEdit('cancel')} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">cancel</button>
              </div>
            </div>
          ) : <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{editValue}</p>
        }
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{message.status}</span>
      </div>

      {isUserSendMessage &&
        <div>
          {message.authorImage
            ? <img className="lg:w-8 lg:h-8 h-5 w-5 rounded-full object-cover " src={message.authorImage} alt={message.authorName} />
            : <FaUserCircle />
          }
        </div>
      }

      <button onClick={() => setOpen(prev => !prev)} className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" >
        <IoMdMore size={25} />
      </button>
      <DropDown
        open={open}
        elements={isUserSendMessage ? senderDropDownElements : receiverDropDownElements}
        position='top-20 left-72'
      />

    </article>

  )
}

export default ChatMessage