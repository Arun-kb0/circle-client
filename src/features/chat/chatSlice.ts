import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ChatUserType, NotificationType, PaginationMessages, StateType, UserType } from "../../constants/types"
import { RootState } from "../../app/store"
import { MessageType } from '../../constants/types'
import { v4 as uuid } from "uuid"
import { clearChat, deleteMessage, getRoomMessages } from "./chatApi"

type ChatStateType = {
  roomId: string | null
  chatUser: ChatUserType | null
  messages: Record<string, MessageType[]> | null
  messagesCurrentPage: number
  messagesNumberOfPages: number
  messageStatus: StateType
  status: StateType
  isInChat: boolean,
  messageNotification: NotificationType[]
  unreadNotificationCount: number
  error: string | undefined

  callRoomId: string | null
  callUser: ChatUserType | null
  callStatus: StateType
}


const initialState: ChatStateType = {
  roomId: null,
  chatUser: null,
  status: "idle",
  isInChat: false,
  messageNotification: [],
  unreadNotificationCount: 0,
  error: undefined,

  messages: null,
  messagesCurrentPage: 0,
  messagesNumberOfPages: 0,
  messageStatus: "idle",

  callRoomId: null,
  callUser: null,
  callStatus: "idle"
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {

    setRoomId: (state, action: PayloadAction<{ roomId: string, user: ChatUserType }>) => {
      const { roomId, user } = action.payload
      state.messagesCurrentPage = 0
      state.messagesNumberOfPages = 0
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

    setIsInChat: (state, action: PayloadAction<boolean>) => {
      state.isInChat = action.payload
      console.warn('isInChat = ', state.isInChat)
    },

    showMsgNotification: (state, action: PayloadAction<{ userId: string, message: MessageType }>) => {
      const { userId, message } = action.payload
      if (!state.roomId || !state.messages || state.isInChat) return
      if (userId === message.authorId) return
      const isExits = state.messages[message.roomId].find(msg => msg.id === message.id)
      // if (!isExits) toast.info(`new message from ${message.authorName}`)
      const newNotification: NotificationType = {
        id: uuid(),
        authorName: message.authorName,
        message: message.message,
        time: message.createdAt,
        status: 'unread'
      }
      if (!isExits) state.messageNotification.push(newNotification)
      let count = 0
      state.messageNotification.map(item => {
        if (item.status === 'unread') count++
      })
      state.unreadNotificationCount = count
    },

    setAllAsReadMsgNotification: (state) => {
      state.unreadNotificationCount = 0
      state.messageNotification.forEach(item => item.status === 'read')
    },

    setCallRoomId: (state, action: PayloadAction<{ roomId: string, user: ChatUserType | null }>) => {
      const { roomId, user } = action.payload
      state.callStatus = 'idle'
      state.callRoomId = roomId
      state.callUser = user
      state.chatUser = user
    },

    setAllChatRooms: (state, action) => {

    }


  },

  // * extra reducers
  extraReducers: (builder) => {
    builder

      .addCase(getRoomMessages.pending, (state) => {
        state.messageStatus = 'loading'
      })
      .addCase(getRoomMessages.fulfilled, (state, action: PayloadAction<PaginationMessages>) => {
        state.messageStatus = 'success'
        if (!action.payload) return
        const { messages, numberOfPages, currentPage } = action.payload
        if (messages.length === 0) return
        if (!state.messages) state.messages = {}
        if (!state.messages[messages[0].roomId]) state.messages[messages[0].roomId] = messages
        else {
          const messageIds = new Set(state.messages[messages[0].roomId].map(msg => msg.id))
          const filteredMsgs = messages.filter(msg => messageIds.has(msg.id))
          state.messages[messages[0].roomId].push(...filteredMsgs)
          state.messages[messages[0].roomId].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        }
        state.messagesNumberOfPages = numberOfPages
        state.messagesCurrentPage = currentPage
      })
      .addCase(getRoomMessages.rejected, (state, action) => {
        state.messageStatus = 'failed'
        state.error = action.error.message
      })


      .addCase(clearChat.fulfilled, (state, action: PayloadAction<{ isDeleted: boolean }>) => {
        state.status = 'success'
        if (state.roomId && state.messages) {
          state.messages[state.roomId] = []
          localStorage.setItem("messages", JSON.stringify(state.messages))
        }
      })
      .addCase(clearChat.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(deleteMessage.fulfilled, (state, action: PayloadAction<{ message: MessageType }>) => {
        state.status = 'success'
        if (state.roomId && state.messages) {
          const { message } = action.payload
          const updatedMessages = state.messages[state.roomId].filter(msg => msg.id !== message.id)
          state.messages[state.roomId] = updatedMessages
          localStorage.removeItem("messages")
          localStorage.setItem("messages", JSON.stringify(state.messages))
        }
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })



  }

})

export const selectChatRoomId = (state: RootState) => state.chat.roomId
export const selectChatStatus = (state: RootState) => state.chat.status
export const selectChatUser = (state: RootState) => state.chat.chatUser
export const selectChatMsgNotification = (state: RootState) => state.chat.messageNotification
export const selectChatUnreadMsgNotification = (state: RootState) => state.chat.unreadNotificationCount

export const selectChatMessages = (state: RootState) => state.chat.messages
export const selectChatMessageNumberOfPages = (state: RootState) => state.chat.messagesNumberOfPages
export const selectChatMessageCurrentPage = (state: RootState) => state.chat.messagesCurrentPage
export const selectChatMessageStatus = (state: RootState) => state.chat.messageStatus

export const selectChatCallRoomId = (state: RootState) => state.chat.callRoomId
export const selectChatCallUser = (state: RootState) => state.chat.callUser
export const selectChatCallStatus = (state: RootState) => state.chat.callStatus


export const {
  setRoomId,
  addMessage,
  setIsInChat,
  showMsgNotification,
  setAllAsReadMsgNotification,
  setCallRoomId,
  setAllChatRooms
} = chatSlice.actions

export default chatSlice.reducer