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
import { MdGif } from 'react-icons/md';
import GifPicker from '../../basic/GifPicker';


type Props = {
  message: MessageType
  isUserSendMessage: boolean
}

const ChatMessage = ({ message, isUserSendMessage }: Props) => {
  const socket = SocketIoClient.getInstance()
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [gifPickerOpen, setGifPickerOpen] = useState<boolean>(false)
  const [currentMessage, setCurrentMessage] = useState(message)
  const [editValue, setEditValue] = useState(() => {
    return currentMessage.mediaType === 'text'
      ? currentMessage.message
      : ''
  })

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

  const handleEdit = (mediaType: 'text' | 'audio' | 'gif', isCancel?: boolean, url?: string) => {
    console.log('handle editedMessage')
    const createEditMessage = (): MessageType | null => {
      let messageValue = ''
      if (mediaType === 'text') {
        if (editValue === '') return null
        messageValue = editValue
      } else if (mediaType === 'gif') {
        if (!url) return null
        messageValue = url
      }
      return {
        ...message,
        mediaType: mediaType,
        message: messageValue,
        updatedAt: new Date().toISOString(),
      }
    }
    if (isCancel) {
      setEditValue(message.message)
      setIsEdit(false)
      return
    }

    const editedMessage = createEditMessage()
    console.log(editedMessage)
    if (!editedMessage) return
    socket?.emit(socketEvents.editMessage, editedMessage)
    setCurrentMessage(editedMessage)
    setIsEdit(false)
  }

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEdit('text')
    }
  }

  const handleGifSelect = (url: string) => {
    handleEdit('gif', false, url)
    setGifPickerOpen(false)
  }

  return (

    <article className={`flex items-start ${isUserSendMessage ? 'justify-end' : 'justify-start'} gap-2.5 relative`}>
      {gifPickerOpen && <GifPicker onGifSelect={handleGifSelect} />}


      {!isUserSendMessage &&
        <div>
          {currentMessage.authorImage
            ? <img className="w-8 h-8 rounded-full object-cover" src={currentMessage.authorImage} alt={currentMessage.authorName} />
            : <FaUserCircle />
          }
        </div>
      }

      <div className={`${isUserSendMessage ? 'rounded-xl rounded-tr-none bg-gray-800' : 'rounded-e-xl rounded-es-xl bg-gray-600'} flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200`}>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{isUserSendMessage ? 'You' : currentMessage.authorName}</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{moment(currentMessage.createdAt).fromNow()}</span>
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
                <button onClick={() => setGifPickerOpen(prev => !prev)} className="mx-1  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <MdGif size={18} />
                </button>
                <button onClick={() => handleEdit('text')} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">save</button>
                <button onClick={() => handleEdit('text', true)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">cancel</button>
              </div>
            </div>
          ) : currentMessage.mediaType === 'gif'
            ? <img className='p-1' src={currentMessage.message} alt="media" />
            : <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{currentMessage.message}</p>
        }
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{currentMessage.status}</span>
      </div>

      {isUserSendMessage &&
        <div>
          {currentMessage.authorImage
            ? <img className="lg:w-8 lg:h-8 h-5 w-5 rounded-full object-cover " src={currentMessage.authorImage} alt={currentMessage.authorName} />
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
        position={isUserSendMessage ? 'top-20 right-5' : 'top-20 md:left-72 right-5'}
      />

    </article>

  )
}

export default ChatMessage