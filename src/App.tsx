import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AppDispatch } from './app/store'
import Navbar from './components/Navbar'
import { toast, ToastContainer } from 'react-toastify'
import Signup from './pages/Signup'
import Login from './pages/Login'
import RequireAuth from './components/RequireAuth'
import { roles } from './constants/enums'
import Unauthorized from './components/Unauthorized'
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import Home from './pages/user/Home'
import UserManagement from './pages/admin/UserManagement'
import { useEffect, useState } from 'react'
import { refresh } from './features/auth/authApi'
import AdminLogin from './pages/AdminLogin'
import AdminSignup from './pages/AdminSignup'
import OtpModel from './pages/OtpModel'
import ResetPassword from './pages/ResetPassword'
import GlobalFeed from './pages/user/GlobalFeed'
import CreatePost from './pages/user/CreatePost'
import ChatPage from './pages/user/ChatPage'
import FollowPeople from './pages/user/FollowPeople'
import { selectChatUser, setAllChatRooms, setCallRoomId, setIncomingCallAndSignal, setIsInChat, setRoomId } from './features/chat/chatSlice'
import { callUserConnection, receiveMessage } from './features/chat/chatApi'
import ProfilePage from './pages/user/ProfilePage'
import EditPostPage from './pages/user/EditPostPage'
import CropperPage from './pages/user/CropperPage'
import FollowersPage from './pages/user/FollowingPage'
import { selectAuthFriendsRoomId, selectAuthUser } from './features/auth/authSlice'
import OtherUserProfilePage from './pages/user/OtherUserProfilePage'
import socketEvents from './constants/socketEvents'
import SocketIoClient from './config/SocketIoClient'
import { UserRoomNotificationType } from './constants/types'
import { setCallNotificationState } from './features/notification/notificationSlice'
import { getFollowers } from './features/user/userApi'
import PostManagement from './pages/admin/PostManagement'
import { Socket } from 'socket.io-client'
import { setNotificationSocketId, setOnlineUsers, setSingleNotification, setUserSocketId } from './features/user/userSlice'
import ReportManagement from './pages/admin/ReportManagement'
import GoLivePage from './pages/user/GoLivePage'
import ViewLivePage from './pages/user/ViewLivePage'
import AdminHome from './pages/admin/AdminHome'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const hideNavbarPaths = ['/login', '/signup', '/resetPwd', '/admin/signup', '/admin/login']
  const user = useSelector(selectAuthUser)
  const chatUser = useSelector(selectChatUser)
  const friendsRoomId = useSelector(selectAuthFriendsRoomId)
  const [socket, setSocket] = useState<Socket | null>(null)
  const [notificationSocket, setNotificationSocket] = useState<Socket | null>(null)

  useEffect(() => {
    dispatch(refresh())
  }, [])

  useEffect(() => {
    if (!user) return
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
        toast('Incoming call')
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


  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <ToastContainer theme='dark' />

      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify' element={<OtpModel />} />
        <Route path='/resetPwd' element={<ResetPassword />} />


        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/signup' element={<AdminSignup />} />


        {/* * protected user routes */}
        <Route element={<RequireAuth role={roles.user} />} >
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/user-profile' element={<OtherUserProfilePage />} />
          <Route path='/global-feed' element={<GlobalFeed />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/edit-post' element={<EditPostPage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/following' element={<FollowersPage userId={user?._id || ''} />} />
          <Route path='/follow-people' element={<FollowPeople />} />
          <Route path='/crop' element={<CropperPage />} />
          <Route path='/go-live' element={<GoLivePage />} />
          <Route path='/view-live' element={<ViewLivePage />} />

        </Route>

        {/* * protected admin routes */}
        <Route element={<RequireAuth role={roles.admin} />} >
          <Route path='/admin'>
            <Route index element={<AdminHome />} />
            <Route path='user' element={<UserManagement />} />
            <Route path='post' element={<PostManagement />} />
            <Route path='report' element={<ReportManagement />} />
          </Route>
        </Route>

        <Route path="*" element={<Unauthorized message='not found' desc="this route doesn't exists" />} />

      </Routes>
    </>
  )
}

export default App