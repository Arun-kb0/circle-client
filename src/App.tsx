import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AppDispatch } from './app/store'
import Navbar from './components/Navbar'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from 'react'
import { refresh } from './features/auth/authApi'
import {
  setCallRoomId,
  setIncomingCallAndSignal, setIsInChat, setRoomId
} from './features/chat/chatSlice'
import { receiveMessage } from './features/chat/chatApi'
import { selectAuthFriendsRoomId, selectAuthShowNavbar, selectAuthUser, setShowNavbar } from './features/auth/authSlice'
import socketEvents from './constants/socketEvents'
import SocketIoClient from './config/SocketIoClient'
import { UserRoomNotificationType } from './constants/types'
import { setCallNotificationState } from './features/notification/notificationSlice'
import { getFollowers, getUserToUserBlockedAccounts } from './features/user/userApi'
import { Socket } from 'socket.io-client'
import {
  setNotificationSocketId, setOnlineUsers, setSingleNotification,
  setUserSocketId, sortFollowingUser
} from './features/user/userSlice'
import { getSubscriptions } from './features/payment/paymentApi'
import UserRoutes from './routes/UserRoutes'
import AdminRoutes from './routes/AdminRoutes'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectAuthUser)
  const friendsRoomId = useSelector(selectAuthFriendsRoomId)
  const showNavbar = useSelector(selectAuthShowNavbar)

  const [socket, setSocket] = useState<Socket | null>(null)
  const [notificationSocket, setNotificationSocket] = useState<Socket | null>(null)

  useEffect(() => {
    dispatch(setShowNavbar(location.pathname))
  }, [location.pathname])

  useEffect(() => {
    dispatch(refresh())
  }, [])

  useEffect(() => {
    if (!user) return
    dispatch(getSubscriptions(1))
    dispatch(getUserToUserBlockedAccounts(1))
    const newSocket = SocketIoClient.getInstance(user._id)
    setSocket(newSocket)
    const newNotificationSocket = SocketIoClient.getNotificationInstance(user._id)
    setNotificationSocket(newNotificationSocket)
  }, [user])

  useEffect(() => {
    if (!user) return
    socket?.on(socketEvents.getOnlineUsers, (data) => {
      console.log('online users')
      console.log(data.onlineUsers)
      dispatch(setOnlineUsers(data.onlineUsers))
    })
    socket?.on(socketEvents.me, (data) => {
      console.log('userSocketId = ', data.userSocketId)
      dispatch(setUserSocketId(data.userSocketId))
    })
    notificationSocket?.on(socketEvents.getNotificationSocketId, (data) => {
      console.log('notification socket')
      dispatch(setNotificationSocketId(data.notificationSocketId))
    })


    return () => {
      socket?.off(socketEvents.getOnlineUsers)
      socket?.off(socketEvents.me)
      notificationSocket?.off(socketEvents.getNotificationSocketId)
    }
  }, [user, socket])

  // ! check this route and remove if not using
  useEffect(() => {
    console.log(socketEvents.joinUserRoom, 'roomId', friendsRoomId)
    if (!friendsRoomId) return
    socket?.emit(socketEvents.joinUserRoom, friendsRoomId)
    console.log(socketEvents.joinUserRoom, 'emitted roomId', friendsRoomId)
  }, [friendsRoomId])


  useEffect(() => {
    if (!user) return
    socket?.on(socketEvents.userRoomNotification, async (data: UserRoomNotificationType) => {
      console.log(socketEvents.userRoomNotification)
      console.log(data)
      switch (data.type) {
        case 'incoming-call': {
          toast('Incoming call')
          if (!data.chatUser) throw new Error('chat user not found in incoming call')
          console.log(data.chatUser)
          // if (chatUser && chatUser.userId === data.chatUser.userId) return
          const chatRoomId = data.roomId.endsWith('-call')
            ? data.roomId.slice(0, -5)
            : data.roomId
          // console.log("incoming-call chatRoomId = ", data.roomId)
          // console.log("incoming-call callRoomId = ", chatRoomId, data.roomId)

          dispatch(setRoomId({ roomId: chatRoomId, user: data.chatUser }))
          dispatch(setCallRoomId({ roomId: data.roomId, user: data.chatUser }))
          dispatch(setCallNotificationState(data.type))
          await dispatch(getFollowers({ userId: user._id, page: 1 }))
          navigate('/chat')
          break
        }
        default:
          console.log('no matched notification type')
          break
      }
    })

    socket?.on(socketEvents.receiveMessage, (data) => {
      // toast('new message')
      dispatch(receiveMessage(data))
      dispatch(sortFollowingUser({ userId: data.authorId }))
      console.log(data)
    })

    // ! check this method and implemnt call notification
    // socket?.on(socketEvents.callUserConnected, (data) => {
    //   toast('new call')
    //   dispatch(callUserConnection(data))
    //   console.log(data)
    // })

    return () => {
      socket?.off(socketEvents.receiveMessage)
      socket?.off(socketEvents.callUserConnected)
    }
  }, [dispatch, socket, friendsRoomId])

  useEffect(() => {
    location.pathname === '/chat'
      ? dispatch(setIsInChat(true))
      : dispatch(setIsInChat(false))
  }, [location.pathname])

  // * notification useEffect
  useEffect(() => {
    const handleNotificationSocketId = (data: any) => {
      console.log(socketEvents.getNotificationSocketId)
      console.log(data)
      dispatch(setNotificationSocketId(data.notificationSocketId))
    }
    const handleNewNotification = async (data: any) => {
      console.log(socketEvents.newNotification)
      console.log(data)
      if (data.type === 'call') {
        console.log('call notification handling')
        const { data: extraData } = data
        if (!extraData.chatUser) throw new Error('chat user not found in incoming call')
        if (!user) throw new Error('auth user not found')
        const chatRoomId = extraData.roomId.endsWith('-call')
          ? extraData.roomId.slice(0, -5)
          : extraData.roomId
        dispatch(setRoomId({ roomId: chatRoomId, user: extraData.chatUser }))
        dispatch(setCallRoomId({ roomId: extraData.roomId, user: extraData.chatUser }))
        dispatch(setCallNotificationState(extraData.type))
        dispatch(setIncomingCallAndSignal({
          isIncomingCall: true,
          signal: extraData.signal,
          callModelType: extraData.callModelType
        }))
        await dispatch(getFollowers({ userId: user._id, page: 1 }))
        return
      }
      dispatch(setSingleNotification(data))
    }

    notificationSocket?.on(socketEvents.getNotificationSocketId, handleNotificationSocketId)
    notificationSocket?.on(socketEvents.newNotification, handleNewNotification)

    return () => {
      notificationSocket?.off(socketEvents.getNotificationSocketId, handleNotificationSocketId)
      notificationSocket?.off(socketEvents.newNotification, handleNewNotification)
    }
  }, [notificationSocket])

  // * live stream started notification
  useEffect(() => {
    const handleLiveNotification = (data: any) => {
      toast(`${data.name} started live stream`)
    }
    socket?.on(socketEvents.prepareLiveStream, handleLiveNotification)
    return () => {
      socket?.off(socketEvents.prepareLiveStream, handleLiveNotification)
    }
  }, [socket])


  return (
    <>
      {showNavbar && <Navbar />}
      <ToastContainer theme='dark' />

      <Routes>
        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='/*' element={<UserRoutes user={user} />} />
      </Routes>
    </>
  )
}

export default App