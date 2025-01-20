import moment from 'moment';
import React, { useState } from 'react'
import { IoMdMore } from "react-icons/io";
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { deleteMessage } from '../../../features/chat/chatSlice';


type Props = {
  id: string
  name: string
  userImage: string | undefined
  time: Date
  status: string
  message: string
}

const ChatMessage = ({ id, name, time, status, message, userImage }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(message)
    setOpen(false)
  }
  const handleDelete = () => {
    dispatch(deleteMessage({ messageId: id }))
    setOpen(false)
  }
  const handleForward = () => { }
  const handleReplay = () => { }
  const handleReport = () => { }

  return (

    <article className="flex items-start gap-2.5 justify-start">
      {userImage
        ? <img className="w-8 h-8 rounded-full" src={userImage} alt={name} />
        : <FaUserCircle />
      }

      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{moment(time).format("hh:mm:ss")}</span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message}</p>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{status}</span>
      </div>
      <button onClick={() => setOpen(prev => !prev)} className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" >
        <IoMdMore size={25} />
      </button>
      {open && <div className="z-10 absolute top-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
        <ul className="py-2 w-full text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
          <li> <button onClick={handleReplay} className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</button> </li>
          <li> <button onClick={handleForward} className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</button> </li>
          <li> <button onClick={handleCopy} className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</button> </li>
          <li> <button onClick={handleReport} className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</button></li>
          <li>  <button onClick={handleDelete} className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</button></li>
        </ul>
      </div>}

    </article>

  )
}

export default ChatMessage