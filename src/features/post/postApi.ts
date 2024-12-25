import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../config/axiosInstance";
import { AppDispatch, RootState } from "../../app/store";
import configureAxios from "../../config/configureAxios";
import errorHandler from "../../errorHandler/errorHandler";


export const getPosts = createAsyncThunk('/post/user', async (_, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get('/post/all')
    removeInterceptors()

    const { posts } = res.data
    return posts
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})