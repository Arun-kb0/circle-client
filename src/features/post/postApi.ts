import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../config/axiosInstance";
import { AppDispatch, RootState } from "../../app/store";
import configureAxios from "../../config/configureAxios";
import errorHandler from "../../errorHandler/errorHandler";
import { PostType } from "../../constants/FeedTypes";


export const getPosts = createAsyncThunk('/post/user', async (page: number = 1, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get(`/feed/global-posts?page=${page}`)
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const createPost = createAsyncThunk('/post/user', async (post: Partial<PostType>, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.post(`/post/`, { body: post })
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const updatePost = createAsyncThunk('/post/user', async (post: Partial<PostType>, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.patch(`/post/`, { body: post })
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const deletePost = createAsyncThunk('/post/user', async (postId: string, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.delete(`/post/${postId}`)
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})