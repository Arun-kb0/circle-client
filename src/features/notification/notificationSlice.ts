import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NotificationType } from "../../constants/types"

type NotificationState = {
  notifications: NotificationType[]
  msgNotifications: NotificationType[]
  error: null | string
}

const initialState: NotificationState = {
  notifications: [],
  msgNotifications: [],
  error: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {

    addNotification: (state, action: PayloadAction<{ notification: NotificationType }>) => {
      const { notification } = action.payload
      const isExits = state.notifications.find(item => item.id === notification.id)
      if(!isExits) state.notifications.push(notification)
    },

    clearNotification: (state) => {
      state.notifications = []
    },

    addMsgNotification: (state, action: PayloadAction<{ msgNotification: NotificationType }>) => {
      const { msgNotification } = action.payload
      const isExits = state.msgNotifications.find(item => item.id === msgNotification.id)
      if (!isExits) state.msgNotifications.push(msgNotification)
    },

    clearMsgNotification: (state) => {
      state.msgNotifications = []
    },

  }
})

export const {
  addNotification,
  clearNotification
} = notificationSlice.actions

export default notificationSlice.reducer