import { createAsyncThunk } from "@reduxjs/toolkit";
import errorHandler from "../../errorHandler/errorHandler";
import axiosInstance from "../../constants/axiosInstance";

export const uploadProfileImage = createAsyncThunk('/user/image', async (file: File, { dispatch, getState }) => {
  try {
    console.log(dispatch, getState)
  } catch (error) {
    return errorHandler(error)
  }
})


// * admin 
export const getAllUsers = createAsyncThunk('/user/all', async () => {
  try {
    const res = await axiosInstance.get('/user/all')
    const { users } = res.data
    return users
  } catch (error) {
    return errorHandler(error)
  }
})

export const getUser = createAsyncThunk('/user/all', async (userId: string) => {
  try {
    const res = await axiosInstance.get(`/user/${userId}`)
    const user = res.data()
    return user
  } catch (error) {
    return errorHandler(error)
  }
})

