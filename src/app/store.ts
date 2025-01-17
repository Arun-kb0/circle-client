import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import postReducer from '../features/post/postSlice'
import chatReducer from '../features/chat/chatSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    chat: chatReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

