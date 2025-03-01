import { createAsyncThunk } from "@reduxjs/toolkit"
import errorHandler from "../../errorHandler/errorHandler"
import axiosInstance from "../../config/axiosInstance"
import { toast } from "react-toastify"
import { UserType } from "../../constants/types"
import { resetStore, RootState } from "../../app/store"
import SocketIoClient from "../../config/SocketIoClient"

export const googleOauthLogin = createAsyncThunk('/google-oauth-login', async (token: string) => {
  try {
    const res = await axiosInstance.post('/auth/google-oauth-login', { token })
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})


type SignupArgs = Pick<UserType, 'name' | 'email' | 'password'>
export const signup = createAsyncThunk('/signup', async (user: SignupArgs, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/auth/signup', user)
    if (!res || (typeof res.status === 'string' && res.status !== 'success')) throw new Error('signup failed')
    return res.data
  } catch (error) {
    return rejectWithValue(errorHandler(error))
  }
})

export const verifyEmail = createAsyncThunk('/verify-email', async (otp: number, { getState }) => {
  try {
    const state = getState() as RootState
    const { otpId, mailToVerify } = state.auth
    const otpData = { otp, otpId, email: mailToVerify }
    console.log("otpData = ")
    console.log(otpData)
    const res = await axiosInstance.post('auth/verify-email', otpData)
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const resendOtp = createAsyncThunk('/resend-otp', async (_, { getState }) => {
  try {
    const state = getState() as RootState
    const { otpId, mailToVerify } = state.auth
    const otpData = { otpId, email: mailToVerify }
    const res = await axiosInstance.post('auth/resend-otp', otpData)
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

type LoginArgs = { email: string, password: string }
export const login = createAsyncThunk('/login', async ({ email, password }: LoginArgs) => {
  try {
    const user = await axiosInstance.post(
      '/auth/login',
      { email, password },
      { withCredentials: true }
    )
    toast('login success')
    console.log(user.data)
    return user.data
  } catch (error) {
    return errorHandler(error)
  }
})

type ResetPasswordArgs = { email: string, password: string }
export const resetPassword = createAsyncThunk('/auth/resetPwd', async ({ email, password }: ResetPasswordArgs) => {
  try {
    const res = await axiosInstance.post('/auth/reset-password', { email, password })
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const resetPwdVerifyOtp = createAsyncThunk('/auth/resetPwdVerify', async (otp: number, { getState }) => {
  try {
    const state = getState() as RootState
    const { resetPwdEmail: email, resetPwdOtpId: otpId } = state.auth
    const res = await axiosInstance.post('/auth/reset-pwd-verify-otp', {
      email, otp, otpId
    })
    if (res.data?.status === 'success') toast("password reset success")
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const resetResendOtp = createAsyncThunk('/auth/resetPwdResend', async (_, { getState }) => {
  try {
    const state = getState() as RootState
    const { resetPwdEmail: email, resetPwdOtpId: otpId } = state.auth
    const res = await axiosInstance.post('/auth/reset-resend-otp', { email, otpId })
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const refresh = createAsyncThunk('/auth/refresh', async () => {
  try {
    const res = await axiosInstance.get('/auth/refresh', {
      withCredentials: true
    })
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const logout = createAsyncThunk('/auth/logout', async (_, { dispatch }) => {
  try {

    SocketIoClient.disconnect()
    SocketIoClient.disconnectNotification()
    const res = await axiosInstance.get('/auth/logout', {
      withCredentials: true
    })
    // dispatch(resetStore())
    sessionStorage.clear()
    localStorage.clear()
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})


// * admin
export const adminSignup = createAsyncThunk('/admin/signup', async (user: SignupArgs) => {
  try {
    const res = await axiosInstance.post('/auth/admin-signup', user,
      { withCredentials: true }
    )
    toast('signup success')
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})


export const adminLogin = createAsyncThunk('/admin/login', async ({ email, password }: LoginArgs) => {
  try {
    const user = await axiosInstance.post(
      '/auth/admin-login',
      { email, password },
      { withCredentials: true }
    )
    toast('login success')
    console.log(user.data)
    return user.data
  } catch (error) {
    return errorHandler(error)
  }
})