import { createAsyncThunk } from "@reduxjs/toolkit";
import errorHandler from "../../errorHandler/errorHandler";
import { axiosPrivate } from "../../config/axiosInstance";
import { AppDispatch, RootState } from "../../app/store";
import configureAxios from "../../config/configureAxios";
import { UserType } from "../../constants/types";
import { setAuthUser } from "../auth/authSlice";
import { toast } from "react-toastify";

// ! check and remove 
export const uploadProfileImage = createAsyncThunk('/user/image', async (file: File, { dispatch, getState }) => {
  try {
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
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error('no accessToken found ')
    if (!userId) throw new Error('no userId found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get(`/user/following`, { params: { page, userId } })
    removeInterceptors()
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


