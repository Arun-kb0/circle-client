import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ChatUserType, StateType } from "../../constants/types"
import { RootState } from "../../app/store"
import { MessageType } from '../../constants/types'
import { GiRooster } from "react-icons/gi"
import { toast } from "react-toastify"
import ChatUser from "../../components/user/chat/ChatUser"

type ChatStateType = {
  roomId: string | null
  chatUser: ChatUserType | null
  messages: Record<string, MessageType[]> | null
  status: StateType
  error: string | null
}

const getMessagesFromStorage = (): Record<string, MessageType[]> => {
  try {
    const msgJson = localStorage.getItem("messages")
    if (!msgJson) return {}
    console.log(JSON.parse(msgJson))
    return JSON.parse(msgJson)
  } catch (error) {
    console.log(error)
    return {}
  }
}

const initialState: ChatStateType = {
  roomId: null,
  chatUser: null,
  messages: getMessagesFromStorage(),
  // messages: {},
  status: "idle",
  error: null
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {

    setRoomId: (state, action: PayloadAction<{ roomId: string, user: ChatUserType }>) => {
      const { roomId, user } = action.payload
      state.roomId = roomId
      state.chatUser = user
    },

    addMessage: (state, action: PayloadAction<MessageType>) => {
      console.log("addMessage action")
      console.log(action.payload)
      if (!state.roomId) return
      const message = action.payload
      if (!state.messages) state.messages = {}
      if (!state.messages[message.roomId]) state.messages[state.roomId] = [message]
      else {
        const isExits = state.messages[message.roomId].find(msg => msg.id === message.id)
        if (!isExits) state.messages[message.roomId].push(message)
      }

      localStorage.removeItem("messages")
      localStorage.setItem("messages", JSON.stringify(state.messages))
    },

    deleteMessage: (state, action: PayloadAction<{ messageId: string }>) => {
      if (state.roomId && state.messages) {
        const { messageId } = action.payload
        const updatedMessages = state.messages[state.roomId].filter(msg => msg.id !== messageId)
        state.messages[state.roomId] = updatedMessages
        localStorage.removeItem("messages")
        localStorage.setItem("messages", JSON.stringify(state.messages))
      }
    },

    clearChat: (state) => {
      if (state.roomId && state.messages) {
        state.messages[state.roomId] = []
        localStorage.setItem("messages", JSON.stringify(state.messages))
      }
    },

    showMsgNotification: (state, action: PayloadAction<{ userId: string, message: MessageType }>) => {
      if (!state.roomId || !state.messages) return
      const { userId, message } = action.payload
      if (userId === message.authorId) return
      const isExits = state.messages[message.roomId].find(msg => msg.id === message.id)
      console.log("showMsgNotification" , isExits)
      if (!isExits) toast.info(`new message from ${message.authorName}`)
    }

  }
})

export const selectChatRoomId = (state: RootState) => state.chat.roomId
export const selectChatStatus = (state: RootState) => state.chat.status
export const selectChatMessages = (state: RootState) => state.chat.messages
export const selectChatUser = (state: RootState) => state.chat.chatUser


export const {
  setRoomId,
  addMessage,
  deleteMessage,
  clearChat,
  showMsgNotification
} = chatSlice.actions

export default chatSlice.reducer