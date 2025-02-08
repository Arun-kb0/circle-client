import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NotificationType,CallStatusType } from "../../constants/types"
import { RootState } from "../../app/store"

type NotificationState = {
  notifications: NotificationType[]
  msgNotifications: NotificationType[]
  error: null | string

  callNotification: CallStatusType
}

const initialState: NotificationState = {
  notifications: [],
  msgNotifications: [],
  error: null,
  callNotification: "idle"
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {

    addNotification: (state, action: PayloadAction<{ notification: NotificationType }>) => {
      const { notification } = action.payload
      const isExits = state.notifications.find(item => item.id === notification.id)
      if (!isExits) state.notifications.push(notification)
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

    setCallNotificationState: (state, action: PayloadAction<CallStatusType>) => {
      state.callNotification = action.payload
    }

  }
})

export const {
  addNotification,
  clearNotification,
  setCallNotificationState
} = notificationSlice.actions

export const selectCallNotification = (state: RootState) => state.notification.callNotification

export default notificationSlice.reducer