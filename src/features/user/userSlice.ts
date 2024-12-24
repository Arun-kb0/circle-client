import { ActionCreator, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StateType, UserType } from "../../constants/types"
import { getAllUsers } from "./userApi"
import { RootState } from "../../app/store"


type UserStateType = {
  users: UserType[] | []
  status: StateType
  error: string | undefined
}

const initialState: UserStateType = {
  users: [],
  status: 'idle',
  error: undefined
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllUsers.fulfilled, (state,action: PayloadAction<UserType[]>) => {
        state.status = 'success'
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state,action) => {
        state.status = 'loading'
        state.error = action.error.message
      })
  }
})


export const selectUserUsers = (state: RootState) => state.user.users
export const selectUserStatus = (state: RootState) => state.user.status
export const selectUserError = (state: RootState) => state.user.status



export const {

} = userSlice.actions

export default userSlice.reducer