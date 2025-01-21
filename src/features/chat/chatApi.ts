import { AppDispatch, RootState } from "../../app/store";
import { addMessage, setRoomId, showMsgNotification } from "./chatSlice";
import { ChatUserType, MessageType, UserType } from "../../constants/types";
import { v4 as uuid } from "uuid";
import socketEvents from "../../constants/socketEvents";
import SocketIoClient from "../../config/SocketIoClient";

const socket = SocketIoClient.getInstance()

type JoinRoomArgsType = { senderId: string, receiverId: string, chatUser: ChatUserType }
export const joinRoom = ({ senderId, receiverId, chatUser }: JoinRoomArgsType) => (dispatch: AppDispatch) => {
  try {
    if (!socket.connected) socket.connect()
    const roomId = senderId < receiverId
      ? `${senderId}-${receiverId}`
      : `${receiverId}-${senderId}`
    socket.emit(socketEvents.joinRoom, roomId)
    dispatch(setRoomId({ roomId, user: chatUser }))
  } catch (error) {
    console.error(error)
  }
}

type SendMessageArgs = { currentMessage: string, user: UserType, roomId: string }
export const sendMessage = ({ currentMessage, user, roomId }: SendMessageArgs) => (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const chatUser = getState().chat.chatUser
    if(!chatUser) return
    if (!socket.connected) socket.connect()
    const messageData: MessageType = {
      id: uuid(),
      roomId,
      receiverId: chatUser.userId,
      authorId: user?._id,
      authorName: user?.name,
      authorImage: user?.image?.url,
      message: currentMessage,
      createdAt: new Date(),
      status: 'sent',
      mediaType: "text",
      updatedAt: new Date()
    }
    socket.emit(socketEvents.sendMessage, messageData)
    dispatch(addMessage(messageData))
  } catch (error) {
    console.error(error)
  }
}

export const receiveMessage = () => (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    if (!socket.connected) socket.connect()
    socket.off(socketEvents.receiveMessage)
    const user = getState().auth.user
    if (!user) return

    socket.on(socketEvents.receiveMessage, (data) => {
      dispatch(showMsgNotification({ message: data, userId: user._id }))
      dispatch(addMessage(data))
    })
  } catch (error) {
    console.error(error)
  }
}
