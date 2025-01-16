import { ActionCreator, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PaginationUsers, StateType, UserType } from "../../constants/types"
import { blockUser, followUser, getAllUsers, getFollowers, getSuggestedPeople, unblockUser, unFollow } from "./userApi"
import { RootState } from "../../app/store"


type UserStateType = {
  users: UserType[] | []
  usersCurrentPage: number | undefined
  usersNumberOfPages: number | undefined
  usersStatus: StateType
  blockStatus: StateType

  followers: UserType[]
  followStatus: StateType
  followNumberOfPages: number
  followCurrentPage: number

  suggestedPeople: UserType[]
  suggestedPeopleStatus: StateType
  suggestedNumberOfPages: number
  suggestedCurrentPage: number

  error: string | undefined
}

const initialState: UserStateType = {
  users: [],
  usersCurrentPage: undefined,
  usersNumberOfPages: undefined,
  usersStatus: 'idle',
  blockStatus: 'idle',
  followers: [],
  followStatus: "idle",
  suggestedPeople: [],
  suggestedPeopleStatus: "idle",
  followNumberOfPages: 0,
  followCurrentPage: 0,
  suggestedNumberOfPages: 0,
  suggestedCurrentPage: 0,
  error: undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // * admin
      .addCase(getAllUsers.pending, (state) => {
        state.usersStatus = 'loading'
      })
      .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<{ users: UserType[], numberOfPages: number, currentPage: number }>) => {
        state.usersStatus = 'success'
        state.users = action.payload.users
        state.usersCurrentPage = action.payload.currentPage
        state.usersNumberOfPages = action.payload.numberOfPages
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.usersStatus = 'failed'
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

      // * follow 
      .addCase(followUser.fulfilled, (state, action: PayloadAction<{ user: UserType }>) => {
        const { user } = action.payload
        const updatedUsers = state.suggestedPeople.filter(item => item._id !== user._id)
        state.suggestedPeople = updatedUsers
        state.followers.unshift(user)
      })
      .addCase(followUser.rejected, (state, action) => {
        state.error = action.error.message
      })

      .addCase(unFollow.fulfilled, (state, action: PayloadAction<{ user: UserType }>) => {
        const { user } = action.payload
        const updatedUsers = state.followers.filter(item => item._id !== user._id)
        state.followers = updatedUsers
        state.suggestedPeople.unshift(user)
      })
      .addCase(unFollow.rejected, (state, action) => {
        state.error = action.error.message
      })

      .addCase(getFollowers.pending, (state) => {
        state.followStatus = 'loading'
      })
      .addCase(getFollowers.fulfilled, (state, action: PayloadAction<PaginationUsers>) => {
        state.followStatus = 'success'
        const { users, numberOfPages, currentPage } = action.payload
        const existingUserIds = new Set(state.followers.map(user => user._id));
        const newUsers = users.filter(user => !existingUserIds.has(user._id));
        state.followers = [...state.followers, ...newUsers]
        state.followNumberOfPages = numberOfPages
        state.followCurrentPage = currentPage
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.followStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(getSuggestedPeople.pending, (state) => {
        state.suggestedPeopleStatus = 'loading'
      })
      .addCase(getSuggestedPeople.fulfilled, (state, action: PayloadAction<PaginationUsers & { currentUser: UserType }>) => {
        state.suggestedPeopleStatus = 'success'
        const { users, numberOfPages, currentPage, currentUser } = action.payload
        const existingUserIds = new Set(state.suggestedPeople.map(user => user._id));
        existingUserIds.add(currentUser._id)
        state.followers.map(user => existingUserIds.add(user._id))
        const newUsers = users.filter(user => !existingUserIds.has(user._id));
        state.suggestedPeople.push(...newUsers)
        state.suggestedNumberOfPages = numberOfPages
        state.suggestedCurrentPage = currentPage
      })
      .addCase(getSuggestedPeople.rejected, (state, action) => {
        state.suggestedPeopleStatus = 'failed'
        state.error = action.error.message
      })

  }
})


export const selectUserUsers = (state: RootState) => state.user.users
export const selectUserStatus = (state: RootState) => state.user.usersStatus
export const selectUserError = (state: RootState) => state.user.error

export const selectUserCurrentPage = (state: RootState) => state.user.usersCurrentPage
export const selectUserNumberOfPages = (state: RootState) => state.user.usersNumberOfPages

export const selectUserFollowers = (state: RootState) => state.user.followers
export const selectUserFollowCurrentPage = (state: RootState) => state.user.followCurrentPage
export const selectUserFollowNumberOfPages = (state: RootState) => state.user.followNumberOfPages
export const selectUserFollowStatus = (state: RootState) => state.user.followStatus

export const selectUserSuggested = (state: RootState) => state.user.suggestedPeople
export const selectUserSuggestedCurrentPage = (state: RootState) => state.user.suggestedCurrentPage
export const selectUserSuggestedNumberOfPages = (state: RootState) => state.user.suggestedNumberOfPages
export const selectUserSuggestedStatus = (state: RootState) => state.user.suggestedPeopleStatus



export const {

} = userSlice.actions

export default userSlice.reducer