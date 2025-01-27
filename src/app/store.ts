import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import postReducer from '../features/post/postSlice'
import chatReducer from '../features/chat/chatSlice'
import notificationReducer from '../features/notification/notificationSlice'

export const store = configureStore({

  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    chat: chatReducer,
    notification: notificationReducer
  },

})

export const resetStore = () => ({ type: 'resetStore' });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

