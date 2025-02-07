import { AppDispatch, RootState } from "../../app/store";
import { addMessage, setCallRoomId, setRoomId, showMsgNotification } from "./chatSlice";
import { ChatUserType, MessageType, UserType } from "../../constants/types";
import { v4 as uuid } from "uuid";
import socketEvents from "../../constants/socketEvents";
import SocketIoClient from "../../config/SocketIoClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import errorHandler from "../../errorHandler/errorHandler";
import { axiosPrivate } from "../../config/axiosInstance";
import configureAxios from "../../config/configureAxios";
import PeerServer from "../../config/PeerServer";
import { toast } from "react-toastify";

const socket = SocketIoClient.getInstance()
const peerServer = PeerServer.getInstance()

// * api calls
export const getRoomMessages = createAsyncThunk('/chat/getMessages', async (page: number = 1, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const { accessToken } = state.auth
    const { roomId } = state.chat
    if (!roomId) return
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const params = { roomId, page }
    const res = await axiosPrivate.get(`/chat/room-messages`, { params })
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const deleteMessage = createAsyncThunk('/chat/delete-message', async (messageId: string, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const { accessToken } = state.auth
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.delete(`/chat/message/${messageId}`)
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const clearChat = createAsyncThunk('/chat/clear-chat', async (_, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const { accessToken } = state.auth
    const { roomId } = state.chat
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.delete(`/chat/chat-clear/${roomId}`)
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})


// * socket io calls
type JoinRoomArgsType = { senderId: string, receiverId: string, chatUser: ChatUserType }
export const joinRoom = ({ senderId, receiverId, chatUser }: JoinRoomArgsType) => (dispatch: AppDispatch) => {
  try {
    if (!socket.connected) socket.connect()
    const roomId = senderId < receiverId
      ? `${senderId}-${receiverId}`
      : `${receiverId}-${senderId}`

    const chatRoom = {
      roomId: roomId,
      userId: senderId,
      targetId: receiverId,
    }
    socket.emit(socketEvents.joinRoom, chatRoom)
    dispatch(setRoomId({ roomId, user: chatUser }))
  } catch (error) {
    console.error(error)
  }
}

type SendMessageArgs = { currentMessage: string, user: UserType, roomId: string }
export const sendMessage = ({ currentMessage, user, roomId }: SendMessageArgs) => (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const chatUser = getState().chat.chatUser
    if (!chatUser) return
    if (!socket.connected) socket.connect()
    const messageData = {
      id: uuid(),
      roomId,
      authorId: user?._id,
      authorName: user?.name,
      authorImage: user?.image?.url,
      receiverId: chatUser.userId,
      mediaType: "text" as MessageType['mediaType'],
      message: currentMessage,
      status: 'sent' as MessageType['status'],
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    socket.emit(socketEvents.sendMessage, messageData)
    console.log('chatApi')
    console.log(messageData)

    const { createdAt, updatedAt, ...msgRest } = messageData
    const chatMsg: MessageType = {
      ...msgRest,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt)
    }
    dispatch(addMessage(chatMsg))
  } catch (error) {
    console.error(error)
  }
}

// * listeners 

export const receiveMessage = (data: any) => (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    // if (!socket.connected) socket.connect()
    // socket.off(socketEvents.receiveMessage)
    // const user = getState().auth.user
    // if (!user) return

    // socket.on(socketEvents.receiveMessage, (data) => {
    //   dispatch(showMsgNotification({ message: data, userId: user._id }))
    //   dispatch(addMessage(data))
    // })

    const user = getState().auth.user
    if (!user) return
    dispatch(showMsgNotification({ message: data, userId: user._id }))
    dispatch(addMessage(data))
  } catch (error) {
    console.error(error)
  }
}


// * call room socket
export const joinCallRoom = ({ senderId, receiverId, chatUser }: JoinRoomArgsType) => (dispatch: AppDispatch) => {
  try {
    if (!socket.connected) socket.connect()
    const roomId = senderId < receiverId
      ? `${senderId}-${receiverId}-call`
      : `${receiverId}-${senderId}-call`
    const chatRoom = {
      roomId,
      userId: senderId,
      targetId: receiverId,
    }
    socket.emit(socketEvents.joinCallRoom, chatRoom)
    dispatch(setCallRoomId({ roomId: roomId, user: chatUser }))
  } catch (error) {
    console.error(error)
  }
}

// * call room 
export const callUserConnection = (data: any) => (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    // console.log('callUserConnection before socket connection check')
    // if (!socket.connected) socket.connect()
    // socket.off(socketEvents.callUserConnected)
    // const user = getState().auth.user
    // if (!user) return
    // console.log('callUserConnection after socket connection check')

    // socket.on(socketEvents.callUserConnected, (data: { roomId: string, userId: string }) => {
    //   console.log('callUserConnection call-user-connected event data = ', data)
    //   dispatch(setCallRoomId({ roomId: data.roomId, user: null }))
    // })

    console.log('callUserConnection call-user-connected event data = ', data)
    dispatch(setCallRoomId({ roomId: data.roomId, user: null }))
  } catch (error) {
    console.error(error)
  }
}
