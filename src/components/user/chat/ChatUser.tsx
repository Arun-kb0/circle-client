import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthUser } from '../../../features/auth/authSlice'
import { AppDispatch } from '../../../app/store'
import { joinRoom } from '../../../features/chat/chatApi'
import { selectUserOnlineUsers, setOnlineUsers } from '../../../features/user/userSlice'
import Avatar from '../../basic/Avatar'

type Props = {
  userId: string,
  name: string
  image: string | undefined
  messageCount: number,
}

const ChatUser = ({ name, image, userId, messageCount }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectAuthUser)
  const onlineUsers = useSelector(selectUserOnlineUsers)
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return Boolean(onlineUsers.find(id => id === userId))
  })

  useEffect(() => {
    setIsOnline(Boolean(onlineUsers.find(id => id === userId)))
  }, [onlineUsers])

  const handleJoinRoom = () => {
    if (user) {
      dispatch(joinRoom({
        senderId: user._id,
        receiverId: userId,
        chatUser: { name, image, userId, }
      }))
    }
  }

  return (
    <section className="flex flex-wrap sm:text-sm text-xs items-center justify-center">
      <div className="flex-shrink-0 justify-center">
        <button onClick={handleJoinRoom}  className="relative inline-flex items-center">
          <Avatar
            image={image}
            alt={name}
            userId={userId}
            disableNavigation={true}
          />
          <span className={`top-0 left-7 absolute w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></span>
        </button>
      </div>
      <div className="flex-1 justify-center min-w-0 ms-4">
        <p className="capitalize font-medium text-gray-900 truncate dark:text-white"> {name} </p>
      </div>
    </section>
  )
}

export default ChatUser