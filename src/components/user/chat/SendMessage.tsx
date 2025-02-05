import React, { useState } from 'react'
import { IoMdMore } from 'react-icons/io'
import { FaUserCircle } from 'react-icons/fa'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import DropDown from '../../basic/DropDown'
import { DropDownElementsType } from '../../../constants/types'
import { deleteMessage } from '../../../features/chat/chatApi'


type Props = {
  id: string
  name: string
  userImage: string | undefined
  time: Date
  status: string
  message: string
}

const SendMessage = ({ id, name, time, status, message, userImage }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = useState(false)

  const dropDownElements: DropDownElementsType[] = [
    {
      handler: () => {
        navigator.clipboard.writeText(message)
        setOpen(false)
      },
      name: 'Copy'
    },
    {
      handler: () => {
        dispatch(deleteMessage(id))
        setOpen(false)
      },
      name: 'Delete'
    },
    {
      handler: () => { },
      name: 'Replay'
    },
    {
      handler: () => { },
      name: 'Forward'
    },
    {
      handler: () => { },
      name: 'Report'
    },
  ]


  return (
    <article className="flex items-start gap-2.5 justify-end relative">
      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-ss-xl rounded-t-xl dark:bg-gray-800">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{moment(time).format("hh:mm:ss")}</span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message}</p>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{status}</span>
      </div>
      {userImage
        ? <img className="lg:w-8 lg:h-8 h-5 w-5 rounded-full object-cover " src={userImage} alt={name} />
        : <FaUserCircle />
      }

      <button onClick={() => setOpen(prev => !prev)} className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" >
        <IoMdMore size={25} />
      </button>
      <DropDown
        open={open}
        elements={dropDownElements}
        position='top-20 right-3'
      />

    </article>
  )
}

export default SendMessage