import { createAsyncThunk } from "@reduxjs/toolkit";
import errorHandler from "../../errorHandler/errorHandler";
import { axiosPrivate } from "../../config/axiosInstance";
import { AppDispatch, RootState } from "../../app/store";
import configureAxios from "../../config/configureAxios";
import { UserType } from "../../constants/types";
import { setAuthUser } from "../auth/authSlice";
import { toast } from "react-toastify";
import { setCurrentUserFollowingIds } from "./userSlice";

// ! check and remove 
export const uploadProfileImage = createAsyncThunk('/user/image', async (file: File, { dispatch, getState }) => {
  try {
    console.log(file)
    console.log(dispatch, getState)
  } catch (error) {
    return errorHandler(error)
  }
})


// * admin 
type GetAllUsersArg = { page: number, startDate?: string, endDate?: string, searchText?: string, isAdmin?: boolean }
export const getAllUsers = createAsyncThunk('/user/all', async ({ page, startDate, endDate, searchText, isAdmin = false }: GetAllUsersArg, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')

    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const path = isAdmin ? '/admin/user/all' : '/user/all'
    const res = await axiosPrivate.get(path, {
      params: {
        page,
        startDate,
        endDate,
        searchText
      }
    })
    removeInterceptors()
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const getUser = createAsyncThunk('/user/single-user', async (userId: string, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')

    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get(`/user/${userId}`)
    removeInterceptors()
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})


export const blockUser = createAsyncThunk('/user/block', async (userId: string, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.post(`/admin/user/block?userId=${userId}`)
    removeInterceptors()
    toast('User blocked')
    const { userId: blockedId } = res.data
    return blockedId
  } catch (error) {
    return errorHandler(error)
  }
})

export const unblockUser = createAsyncThunk('/user/unblock', async (userId: string, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')

    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.post(`/admin/user/unblock?userId=${userId}`)
    removeInterceptors()
    toast('User unblocked')
    const { userId: unblockedId } = res.data
    return unblockedId
  } catch (error) {
    return errorHandler(error)
  }
})


export const followUser = createAsyncThunk('/user/follow', async (targetId: string, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.post(`/user/follow`, { targetId })
    removeInterceptors()
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const unFollow = createAsyncThunk('/user/unfollow', async (targetId: string, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.post(`/user/unfollow`, { targetId })
    removeInterceptors()
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

type GetFollowersArgs = { userId: string, page: number }
export const getFollowers = createAsyncThunk('/user/get-followers', async ({ userId, page = 1 }: GetFollowersArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error('no accessToken found ')
    if (!userId) throw new Error('no userId found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get(`/user/followers`, { params: { page, userId } })
    removeInterceptors()
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const getFollowing = createAsyncThunk('/user/get-following', async ({ userId, page = 1 }: GetFollowersArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const {accessToken, user} = state.auth
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error('no accessToken found ')
    if (!userId) throw new Error('no userId found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get(`/user/following`, { params: { page, userId } })
    removeInterceptors()
    if (user?._id === userId) {
      dispatch(setCurrentUserFollowingIds(res.data))
    }
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const getSuggestedPeople = createAsyncThunk('/user/get-suggested-people', async (page: number = 1, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const currentUser = state.auth.user
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get(`/user/suggested-people`, { params: { page } })
    removeInterceptors()
    return { ...res.data, currentUser }
  } catch (error) {
    return errorHandler(error)
  }
})

export const updatedUser = createAsyncThunk('/user/update', async (user: Partial<UserType>, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.patch(`/user/`, { user })
    dispatch(setAuthUser({ user: res.data.user }))
    removeInterceptors()
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const getLiveUsers = createAsyncThunk('/user/live-users', async (_, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get(`/user/live-users`,)
    removeInterceptors()
    console.log(res.data)
    return res.data.users
  } catch (error) {
    return errorHandler(error)
  }
})

type GetUserCountArgs = { startDate?: string, endDate?: string }
export const getUsersCount = createAsyncThunk('/user/count', async ({ startDate, endDate }: GetUserCountArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const params = { startDate, endDate }
    const res = await axiosPrivate.get(`/admin/user/count`, { params })
    removeInterceptors()
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})


type GetUsersCountByDateDetails = { startDate: string, endDate: string }
export const getUsersCountByDateDetails = createAsyncThunk('/admin/user/count-by-date', async ({ startDate, endDate }: GetUsersCountByDateDetails, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const params = { startDate, endDate }
    const res = await axiosPrivate.get('/admin/user/line-chart', { params })
    removeInterceptors()
    console.log("get user count by date")
    console.log(res.data)
    return res.data.userCountArray
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

// * notifications routes
type GetNotificationsArgs = { page: number, receiverId: string }
export const getNotifications = createAsyncThunk('/user/notifications/get', async ({ page, receiverId }: GetNotificationsArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const params = { page, receiverId }
    const res = await axiosPrivate.get('/notification', { params })
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const readNotifications = createAsyncThunk('/user/read-notifications', async (_, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const notifications = state.user.notifications
    const notificationIds = notifications.filter(item => !item.read).map(item => item._id)
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const body = notificationIds
    const res = await axiosPrivate.patch('/notification/read', { body })
    removeInterceptors()
    console.log("readNotifications")
    console.log(res.data)
    return res.data.notificationIds
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const userToUserBlock = createAsyncThunk('/user/user-to-user-block', async (userId: string, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const currentUser = state.auth.user
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const body = { blockerUserId: currentUser?._id, blockedUserId: userId }
    const res = await axiosPrivate.post('/user/user-blocked-create', body)
    removeInterceptors()
    console.log("user to user block")
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const userToUserUnblock = createAsyncThunk('/user/user-to-user-unblock', async (userId: string, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const currentUser = state.auth.user
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const params = { blockerUserId: currentUser?._id, blockedUserId: userId }
    const res = await axiosPrivate.delete('/user/user-blocked-delete', { params })
    removeInterceptors()
    console.log("user to user unblock")
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const getUserToUserBlockedAccounts = createAsyncThunk('/user/get-user-blocked-users', async (page: number, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const currentUser = state.auth.user
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error('no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const params = { blockerUserId: currentUser?._id, page }
    const res = await axiosPrivate.get('/user/user-blocked-users', { params })
    removeInterceptors()
    console.log("user to user unblock")
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})





