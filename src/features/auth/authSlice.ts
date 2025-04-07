import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  adminLogin, adminSignup, googleOauthLogin, login, logout, refresh, resendOtp,
  resetPassword, resetPwdVerifyOtp, resetResendOtp, signup, verifyEmail
} from "./authApi";
import { AuthenticationResponseType, StateType, UserType } from "../../constants/types";
import { RootState } from "../../app/store";
import { uploadProfileImage } from "../user/userApi";

const showNavRoutes = [
  // '/signup',
  // '/login',
  // '/verify',
  // '/resetPwd',
  // '/payment-success',
  // '/payment-failed',

  // // Admin routes
  // '/admin/login',
  // '/admin/signup',

  // Protected user routes
  '/',
  '/profile',
  '/user-profile',
  '/global-feed',
  '/create-post',
  '/edit-post',
  '/chat',
  '/following',
  '/follow-people',
  '/crop',
  '/go-live',
  '/view-live',
  '/wallet',
  '/saved',
  '/blocked-users',

  // Protected admin routes
  '/admin/',
  '/admin',
  '/admin/user',
  '/admin/post',
  '/admin/report',
  '/admin/subscription',
  '/admin/transaction-wallet',
]


type AuthStateType = {
  otpId: string | undefined
  mailToVerify: string | undefined
  user: UserType | undefined,
  accessToken: string | undefined,
  resetPwd: string | undefined,
  resetPwdEmail: string | undefined
  resetPwdOtpId: string | undefined
  resetPwdStatus: StateType
  status: StateType,
  error: string | undefined
  friendsRoomId: string | null
  showNavbar: boolean
  lastVisitedRoute: string | undefined
  authStatus: 'bootstrapping' | 'authenticated' | 'unauthenticated' 
}

const getInitialState = (): AuthStateType => ({
  otpId: undefined,
  mailToVerify: undefined,
  user: undefined,
  accessToken: undefined,
  status: 'idle',
  error: undefined,

  resetPwd: undefined,
  resetPwdEmail: undefined,
  resetPwdOtpId: undefined,
  resetPwdStatus: 'idle',
  friendsRoomId: null,
  showNavbar: false,
  lastVisitedRoute: localStorage.getItem('lastVisitedRoute') || undefined,
  authStatus: 'bootstrapping'
})

const initialState = getInitialState()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<{ user: UserType }>) => {
      state.user = action.payload.user
    },

    setAuthAccessToken: (state, action: PayloadAction<string>) => {
      if (!action.payload) return
      state.accessToken = action.payload
    },

    setShowNavbar: (state, action: PayloadAction<string>) => {
      if (showNavRoutes.includes(action.payload)) {
        state.showNavbar = true
        state.lastVisitedRoute = action.payload
        localStorage.setItem('lastVisitedRoute', action.payload)
      } else {
        state.showNavbar = false
      }
    },

    setAuthStatus: (state, action: PayloadAction<typeof initialState.authStatus>) => {
      state.authStatus = action.payload
    }

  },

  extraReducers: (builder) => {
    builder

      .addCase(googleOauthLogin.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(googleOauthLogin.fulfilled, (state, action) => {
        state.status = 'success'
        const { user, accessToken } = action.payload
        state.accessToken = accessToken
        state.user = user
        state.authStatus = "authenticated"
      })
      .addCase(googleOauthLogin.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        state.authStatus = "unauthenticated"
      })

      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthenticationResponseType>) => {
        state.status = 'success'
        const { user, accessToken, friendsRoomId } = action.payload
        state.accessToken = accessToken
        state.user = user
        state.friendsRoomId = friendsRoomId
        state.authStatus = "authenticated"
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        state.authStatus = "unauthenticated"
      })

      .addCase(signup.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<{ email: string, otpId: string }>) => {
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
        state.authStatus = "authenticated"
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        state.authStatus = "unauthenticated"
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

      .addCase(resetPassword.pending, (state) => {
        state.resetPwdStatus = 'loading'
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<{ email: string, otpId: string }>) => {
        state.resetPwdStatus = 'success'
        state.resetPwdEmail = action.payload.email
        state.resetPwdOtpId = action.payload.otpId

      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPwdStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(resetPwdVerifyOtp.pending, (state) => {
        state.resetPwdStatus = 'loading'
      })
      .addCase(resetPwdVerifyOtp.fulfilled, (state) => {
        state.resetPwdStatus = 'success'
      })
      .addCase(resetPwdVerifyOtp.rejected, (state, action) => {
        state.resetPwdStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(resetResendOtp.pending, (state) => {
        state.resetPwdStatus = 'loading'
      })
      .addCase(resetResendOtp.fulfilled, (state, action: PayloadAction<{ email: string, otpId: string }>) => {
        state.resetPwdStatus = 'success'
        state.resetPwdEmail = action.payload.email
        state.resetPwdOtpId = action.payload.otpId
      })
      .addCase(resetResendOtp.rejected, (state, action) => {
        state.resetPwdStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(refresh.pending, (state) => {
        state.status = 'loading'
        state.authStatus = "bootstrapping"
      })
      .addCase(refresh.fulfilled, (state, action: PayloadAction<AuthenticationResponseType>) => {
        state.status = 'success'
        state.authStatus = "bootstrapping"
        const { user, accessToken, friendsRoomId } = action.payload
        state.accessToken = accessToken
        state.user = user
        state.friendsRoomId = friendsRoomId
        state.authStatus = "authenticated"
      })
      .addCase(refresh.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        state.authStatus = "unauthenticated"
      })

      .addCase(logout.fulfilled, () => {
        const state = getInitialState()
        state.authStatus = 'unauthenticated'
        return state
      })

      .addCase(uploadProfileImage.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(uploadProfileImage.fulfilled, (state) => {
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
        state.authStatus = "authenticated"
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        state.authStatus = "unauthenticated"
      })

      .addCase(adminSignup.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(adminSignup.fulfilled, (state, action) => {
        state.status = 'success'
        const { user, accessToken } = action.payload
        state.accessToken = accessToken
        state.user = user
        state.authStatus = "authenticated"
      })
      .addCase(adminSignup.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        state.authStatus = "unauthenticated"
      })
  }
})

export const selectAuthUser = (state: RootState) => state.auth.user
export const selectAuthAccessToken = (state: RootState) => state.auth.accessToken
export const selectAuthStatus = (state: RootState) => state.auth.status
export const selectAuthError = (state: RootState) => state.auth.error

export const selectAuthResetStatus = (state: RootState) => state.auth.resetPwdStatus
export const selectAuthFriendsRoomId = (state: RootState) => state.auth.friendsRoomId

export const selectAuthShowNavbar = (state: RootState) => state.auth.showNavbar

export const selectAuthLastVisitedRoute = (state: RootState) => state.auth.lastVisitedRoute
export const selectAuthAuthStatus = (state: RootState) => state.auth.authStatus

export const {
  setAuthUser,
  setAuthAccessToken,
  setShowNavbar,
  setAuthStatus
} = authSlice.actions

export default authSlice.reducer