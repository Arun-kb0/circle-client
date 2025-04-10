import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthUser } from '../../../features/auth/authSlice'
import { AppDispatch } from '../../../app/store'
import { createChatRoomId, joinRoom } from '../../../features/chat/chatApi'
import { selectUserBlockedAccounts, selectUserOnlineUsers } from '../../../features/user/userSlice'
import Avatar from '../../basic/Avatar'
import { selectChatLastMessages } from '../../../features/chat/chatSlice'
import moment from 'moment'
import { MessageType } from '../../../constants/types'

type Props = {
  userId: string,
  name: string
  image: string | undefined
  messageCount: number,
}

const ChatUser = ({ name, image, userId }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectAuthUser)
  const onlineUsers = useSelector(selectUserOnlineUsers)
  const lastMessages = useSelector(selectChatLastMessages)
  const userBlockedAccounts = useSelector(selectUserBlockedAccounts)

  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return Boolean(onlineUsers.find(id => id === userId))
  })
  const [isBlockedAccountUser] = useState<boolean>(() => {
    return Boolean(userBlockedAccounts.find(item => item.blockedUserId === userId))
  })
  const [userLastMessage, setUserLastMessage] = useState<MessageType | null>(null)

  useEffect(() => {
    setIsOnline(Boolean(onlineUsers.find(id => id === userId)))
  }, [onlineUsers])

  useEffect(() => {
    if (lastMessages.length === 0 || !user) return
    const roomId = createChatRoomId(userId, user?._id)
    const foundMessage = lastMessages.find(item => item.roomId === roomId)
    if (!foundMessage) return
    const messageString = foundMessage.mediaType === 'text' ? foundMessage.message : foundMessage.mediaType.toUpperCase()
    setUserLastMessage({ ...foundMessage, message: messageString })
  }, [lastMessages])

  const handleJoinRoom = () => {
    if (user) {
      dispatch(joinRoom({
        senderId: user._id,
        receiverId: userId,
        chatUser: { name, image, userId, }
      }))
    }
  }

  if (isBlockedAccountUser) return (<></>)
  
  return (
    <section className="flex flex-wrap sm:text-sm text-xs items-center justify-center">
      <div className="flex-shrink-0 justify-center">
        <button onClick={handleJoinRoom} className="relative inline-flex items-center">
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
        {userLastMessage &&
          <div className='flex gap-1 flex-wrap justify-between'>
            <p className="font-medium text-xs truncate dark:text-gray-400"> {`${userLastMessage.authorId === user?._id ? "You" : userLastMessage.authorName}  ${userLastMessage.message}`} </p>
            <p className="text-xs truncate text-green-600"> {moment(userLastMessage.createdAt).fromNow()} </p>
          </div>
        }
      </div>
    </section>
  )
}

export default ChatUser