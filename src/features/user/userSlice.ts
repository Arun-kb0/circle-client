import { ActionCreator, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PaginationUsers, StateType, UsersCountTypes, UserType } from "../../constants/types"
import {
  blockUser, followUser, getAllUsers, getFollowers,
  getFollowing,
  getLiveUsers,
  getSuggestedPeople, getUser, getUsersCount, unblockUser, unFollow
} from "./userApi"
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

  followingPeople: UserType[]
  followingPeopleStatus: StateType
  followingNumberOfPages: number
  followingCurrentPage: number

  otherUser?: UserType

  error: string | undefined
  onlineUsers: string[]
  socketId: string | undefined
  liveUsers: UserType[],

  totalUsers: number
  totalFemaleUsers: number
  totalMaleUsers: number
  totalOtherUsers: number
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

  followingPeople: [],
  followingPeopleStatus: "loading",
  followingNumberOfPages: 0,
  followingCurrentPage: 0,
  onlineUsers: [],
  socketId: undefined,
  liveUsers: [],

  totalUsers: 0,
  totalFemaleUsers: 0,
  totalMaleUsers: 0,
  totalOtherUsers: 0
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    clearFollowers: (state) => {
      state.followCurrentPage = 0
      state.usersNumberOfPages = 0
      state.followers = []
    },
    clearFollowing: (state) => {
      state.followingCurrentPage = 0
      state.followingNumberOfPages = 0
      state.followingPeople = []
    },

    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      console.log('online users = ', action.payload.toString())
      state.onlineUsers = action.payload
    },
    setUserSocketId: (state, action: PayloadAction<string>) => {
      state.socketId = action.payload
    }

  },

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
        state.followingPeople.unshift(user)
      })
      .addCase(followUser.rejected, (state, action) => {
        state.error = action.error.message
      })

      .addCase(unFollow.fulfilled, (state, action: PayloadAction<{ user: UserType }>) => {
        const { user } = action.payload
        const updatedUsers = state.followingPeople.filter(item => item._id !== user._id)
        state.followingPeople = updatedUsers
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

      .addCase(getFollowing.pending, (state) => {
        state.followingPeopleStatus = 'loading'
      })
      .addCase(getFollowing.fulfilled, (state, action: PayloadAction<PaginationUsers>) => {
        state.followingPeopleStatus = 'success'
        const { users, numberOfPages, currentPage } = action.payload
        const existingUserIds = new Set(state.followingPeople.map(user => user._id));
        const newUsers = users.filter(user => !existingUserIds.has(user._id));
        state.followingPeople = [...state.followingPeople, ...newUsers]
        state.followingNumberOfPages = numberOfPages
        state.followingCurrentPage = currentPage
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.followingPeopleStatus = 'failed'
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

      .addCase(getUser.fulfilled, (state, action) => {
        state.otherUser = action.payload.user
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message
      })

      .addCase(getLiveUsers.fulfilled, (state, action: PayloadAction<UserType[]>) => {
        state.liveUsers = action.payload
      })
      .addCase(getLiveUsers.rejected, (state, action) => {
        state.error = action.error.message
      })

      .addCase(getUsersCount.fulfilled, (state, action: PayloadAction<UsersCountTypes>) => {
        const { usersCount, femaleUsersCount, maleUsersCount, otherUsersCount } = action.payload
        state.totalUsers = usersCount
        state.totalFemaleUsers = femaleUsersCount
        state.totalMaleUsers = maleUsersCount
        state.totalOtherUsers = otherUsersCount
      })
      .addCase(getUsersCount.rejected, (state, action) => {
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

export const selectUserFollowing = (state: RootState) => state.user.followingPeople
export const selectUserFollowingCurrentPage = (state: RootState) => state.user.followingCurrentPage
export const selectUserFollowingNumberOfPages = (state: RootState) => state.user.followingNumberOfPages
export const selectUserFollowingStatus = (state: RootState) => state.user.followingPeopleStatus

export const selectUserSuggested = (state: RootState) => state.user.suggestedPeople
export const selectUserSuggestedCurrentPage = (state: RootState) => state.user.suggestedCurrentPage
export const selectUserSuggestedNumberOfPages = (state: RootState) => state.user.suggestedNumberOfPages
export const selectUserSuggestedStatus = (state: RootState) => state.user.suggestedPeopleStatus

export const selectUserOtherUser = (state: RootState) => state.user.otherUser
export const selectUserOnlineUsers = (state: RootState) => state.user.onlineUsers
export const selectUserSocketId = (state: RootState) => state.user.socketId

export const selectUserLiveUsers = (state: RootState) => state.user.liveUsers

export const selectUserTotalUsers = (state: RootState) => state.user.totalUsers
export const selectUserTotalFemaleUsers = (state: RootState) => state.user.totalFemaleUsers
export const selectUserTotalMaleUsers = (state: RootState) => state.user.totalMaleUsers
export const selectUserTotalOtherUsers = (state: RootState) => state.user.totalOtherUsers

export const {
  clearFollowers,
  clearFollowing,
  setOnlineUsers,
  setUserSocketId
} = userSlice.actions

export default userSlice.reducer