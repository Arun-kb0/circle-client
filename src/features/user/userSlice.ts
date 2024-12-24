import { ActionCreator, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StateType, UserType } from "../../constants/types"
import { blockUser, getAllUsers, unblockUser } from "./userApi"
import { RootState } from "../../app/store"


type UserStateType = {
  users: UserType[] | []
  usersStatus: StateType
  blockStatus: StateType
  error: string | undefined
}

const initialState: UserStateType = {
  users: [],
  usersStatus: 'idle',
  blockStatus: 'idle',
  error: undefined
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.usersStatus = 'loading'
      })
      .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<UserType[]>) => {
        state.usersStatus = 'success'
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.usersStatus = 'loading'
        state.error = action.error.message
      })

      .addCase(blockUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.blockStatus = 'success'
        const userId = action.payload
        const updatedUsers = state.users.map((user) => {
          if (user._id === userId) {
            user.status = 'blocked'
          }
          return user
        })
        state.users = updatedUsers
      })

      .addCase(unblockUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.blockStatus = 'success'
        const userId = action.payload
        const updatedUsers = state.users.map((user) => {
          if (user._id === userId) {
            user.status = 'active'
          }
          return user
        })
        state.users = updatedUsers
      })
  }
})


export const selectUserUsers = (state: RootState) => state.user.users
export const selectUserStatus = (state: RootState) => state.user.usersStatus
export const selectUserError = (state: RootState) => state.user.error



export const {

} = userSlice.actions

export default userSlice.reducer