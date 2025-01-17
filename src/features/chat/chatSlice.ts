import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StateType } from "../../constants/types"
import { RootState } from "../../app/store"


type ChatStateType = {
  roomId: string | null,
  messages: string[]
  status: StateType
  error: string | null
}

const initialState: ChatStateType = {
  roomId: null,
  messages: [],
  status: "idle",
  error: null
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId=action.payload
    }
  }
})

export const selectChatRoomId = (state:RootState)=> state.chat.roomId
export const selectChatStatus = (state:RootState)=> state.chat.status


export const {
  setRoomId,
} = chatSlice.actions

export default chatSlice.reducer