import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

type Props = {
  name: string
  image: string | undefined
  messageCount: number
}

const ChatUser = ({ name, image, messageCount }: Props) => {
  return (
    <section className="flex items-center">
      <div className="flex-shrink-0">
        <button type="button" className="relative inline-flex items-center">
          {image
            ? <img className="w-8 h-8 rounded-full" src={image} alt="Neil image" />
            : <FaUserCircle size={35} />
          }
          <span className="sr-only">Notifications</span>
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{messageCount}</div>
        </button>
      </div>
      <div className="flex-1 min-w-0 ms-4">
        <p className="text-sm font-medium text-gray-900 truncate dark:text-white"> {name} </p>
      </div>
    </section>
  )
}

export default ChatUser