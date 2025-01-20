import { Socket } from "socket.io-client";
import { AppDispatch } from "../../app/store";
import { addMessage, setRoomId } from "./chatSlice";
import { ChatUserType, MessageType, UserType } from "../../constants/types";
import { v4 as uuid } from "uuid";

type JoinRoomArgsType = { socket: Socket, senderId: string, receiverId: string, chatUser: ChatUserType }
export const joinRoom = ({ socket, senderId, receiverId, chatUser }: JoinRoomArgsType) => (dispatch: AppDispatch) => {
  try {
    if (!socket.connected) socket.connect()
    const roomId = senderId < receiverId
      ? `${senderId}-${receiverId}`
      : `${receiverId}-${senderId}`
    socket.emit("join-room", roomId)
    dispatch(setRoomId({ roomId, user: chatUser }))
    console.log("joinRoom", roomId)
  } catch (error) {
    console.error(error)
  }
}

type SendMessageArgs = { socket: Socket, currentMessage: string, user: UserType, roomId: string }
export const sendMessage = ({ socket, currentMessage, user, roomId }: SendMessageArgs) => (dispatch: AppDispatch) => {
  try {
    if (!socket.connected) socket.connect()
    const messageData: MessageType = {
      id: uuid(),
      roomId,
      authorId: user?._id,
      authorName: user?.name,
      authorImage: user?.image?.url,
      message: currentMessage,
      time: new Date(),
      status: 'sent'
    }
    socket.emit('send-message', messageData)
    dispatch(addMessage(messageData))
    console.log("sendMessage", roomId)
  } catch (error) {
    console.error(error)
  }
}

export const receiveMessage = (socket: Socket) => (dispatch: AppDispatch) => {
  try {
    if (!socket.connected) socket.connect()
    socket.on("receive-message", (data) => {
      dispatch(addMessage(data))
    })
  } catch (error) {
    console.error(error)
  }
}
