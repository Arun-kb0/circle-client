import React, { useEffect, useState } from 'react'
import ChatUsers from '../../components/user/chat/ChatUsers'
import ChatSection from '../../components/user/chat/ChatSection'
import { AnimatePresence } from 'framer-motion'
import CallModel from '../../components/user/chat/CallModel'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { joinCallRoom } from '../../features/chat/chatApi'
import { selectChatCallModelType, selectChatIsIncomingCall, selectChatUser, setCallRoomId } from '../../features/chat/chatSlice'
import { selectAuthUser } from '../../features/auth/authSlice'
import SocketIoClient from '../../config/SocketIoClient'
import socketEvents from '../../constants/socketEvents'
import { generateCallRoomId } from '../../util/generator'
import { selectCallNotification } from '../../features/notification/notificationSlice'
import PageTitle from '../../components/basic/PageTitle'
import { selectUserNavOpen } from '../../features/user/userSlice'

type Props = {}

const ChatPage = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [callModelOpen, setCallModelOpen] = useState(false)
  const [callModelType, setCallModelType] = useState<'video' | 'audio'>('audio')
  const chatUser = useSelector(selectChatUser)
  const user = useSelector(selectAuthUser)
  const socket = SocketIoClient.getInstance()
  // const callNotification = useSelector(selectCallNotification)
  const isIncomingCall = useSelector(selectChatIsIncomingCall)
  const incomingCallModelType = useSelector(selectChatCallModelType)
  const userNavOpen = useSelector(selectUserNavOpen)

  const handleCallModelOpen = (type: 'video' | 'audio') => {
    console.log('handleCallModelOpen')
    if (!chatUser || !user) return
    console.log('handleCallModelOpen', chatUser)
    setCallModelOpen(true)
    setCallModelType(type)

    const senderId = user?._id
    const receiverId = chatUser?.userId
    if (!senderId || !receiverId) return
    const roomId = generateCallRoomId(senderId, receiverId)
    const chatRoom = {
      roomId: `${roomId}`,
      userId: senderId,
      targetId: receiverId,
    }
    socket?.emit(socketEvents.joinCallRoom, chatRoom)
    dispatch(setCallRoomId({ roomId, user: chatUser }))
  }

  useEffect(() => {
    if (isIncomingCall) {
      handleCallModelOpen(incomingCallModelType as "video" | "audio")
    }
  }, [isIncomingCall])

  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className={`p-4 ${userNavOpen ? 'sm:ml-64 ' : ''}`}>
        <div className="p-4 mt-14">

          <PageTitle firstWord='' secondWord='Chat' />

          <div className='lg:p-4 sm:p-1  flex justify-between gap-8 lg:w-[160vh] md:w-[100vh] sm:w-[80vh]'>
            <AnimatePresence
              initial={false}
              mode='wait'
              onExitComplete={() => null}
            >
              {callModelOpen &&
                <CallModel
                  handleClose={() => setCallModelOpen(false)}
                  callModelType={callModelType}
                />
              }
            </AnimatePresence>

            <div className='rounded-lg bg-gray-900 p-3  w-8/12 '>
              <ChatSection
                handleCallModelOpen={handleCallModelOpen}
              />
            </div>
            <div className='w-3/12'>
              <ChatUsers />
            </div>
          </div>


        </div>
      </div>
    </main>
  )
}

export default ChatPage