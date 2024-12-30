import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { adminLogin, adminSignup, login, logout, refresh, resendOtp, signup, verifyEmail } from "./authApi";
import { StateType, UserType } from "../../constants/types";
import { RootState } from "../../app/store";
import { uploadProfileImage } from "../user/userApi";
import { PiStrategyLight } from "react-icons/pi";

type AuthStateType = {
  otpId: string | undefined
  mailToVerify: string | undefined
  user: UserType | undefined,
  accessToken: string | undefined,
  status: StateType,
  error: string | undefined
}

const initialState: AuthStateType = {
  otpId: undefined,
  mailToVerify: undefined,
  user: undefined,
  accessToken: undefined,
  status: 'idle',
  error: undefined
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'success'
        const { user, accessToken } = action.payload
        state.accessToken = accessToken
        state.user = user
      })

      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(signup.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<{ message: string, status: string, email: string, otpId: string }>) => {
        state.status = 'success'
        const { email, otpId } = action.payload
        state.mailToVerify = email
        state.otpId = otpId
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(verifyEmail.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(verifyEmail.fulfilled, (state, action: PayloadAction<{ user: UserType, accessToken: string }>) => {
        state.status = 'success'
        const { accessToken, user } = action.payload
        state.accessToken = accessToken
        state.user = user
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(resendOtp.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(resendOtp.fulfilled, (state, action: PayloadAction<{ email: string, otpId: string }>) => {
        state.status = 'success'
        const { email, otpId } = action.payload
        state.mailToVerify = email
        state.otpId = otpId
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(refresh.fulfilled, (state, action: PayloadAction<{ user: UserType, accessToken: string }>) => {
        state.status = 'success'
        const { user, accessToken } = action.payload
        state.accessToken = accessToken
        state.user = user
      })
      .addCase(refresh.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle'
        state.accessToken = undefined
        state.user = undefined
      })

      .addCase(uploadProfileImage.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.status = 'success'
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // * admin
      .addCase(adminLogin.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.status = 'success'
        const { user, accessToken } = action.payload
        state.accessToken = accessToken
        state.user = user
      })

      .addCase(adminLogin.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(adminSignup.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(adminSignup.fulfilled, (state, action) => {
        state.status = 'success'
        const { user, accessToken } = action.payload
        state.accessToken = accessToken
        state.user = user
      })
      .addCase(adminSignup.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectAuthUser = (state: RootState) => state.auth.user
export const selectAuthAccessToken = (state: RootState) => state.auth.accessToken
export const selectAuthStatus = (state: RootState) => state.auth.status
export const selectAuthError = (state: RootState) => state.auth.error


export const {

} = authSlice.actions

export default authSlice.reducer