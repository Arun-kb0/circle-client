import { AnyAction } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import postReducer from '../features/post/postSlice'
import chatReducer from '../features/chat/chatSlice'
import notificationReducer from '../features/notification/notificationSlice'

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  chat: chatReducer,
  notification: notificationReducer
})


const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
  if (action.type === 'resetStore') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer