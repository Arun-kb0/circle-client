import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../../app/store"
import configureAxios from "../../config/configureAxios"
import { axiosPrivate } from "../../config/axiosInstance"
import errorHandler from "../../errorHandler/errorHandler"


type CreateOrderArgs = { data: any }
export const createOrder = createAsyncThunk('/payment/create-order', async ({ data }: CreateOrderArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.post('/payment/create-order', data)
    removeInterceptors()
    window.location.href = res.data.url
    return res.data
  } catch (error) {
    console.log(error)
    throw errorHandler(error)
  }
})

export const subscribeWithWallet = createAsyncThunk('/payment/subscribe-wallet', async ({ data }: CreateOrderArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.post('/payment/subscribe-wallet', data)
    removeInterceptors()
    if (res.status !== 200) {
      throw new Error(res.data.message)
    }
    console.log('subscribe with wallet', res.status)
    return res.data
  } catch (error) {
    throw errorHandler(error)
  }
})

export const getTransactions = createAsyncThunk('/payment/transactions', async (page: number, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const params = { page }
    const res = await axiosPrivate.get('/payment/transactions', { params })
    removeInterceptors()
    console.log("get transactions ")
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const getSubscriptions = createAsyncThunk('/payment/subscriptions', async (page: number, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const params = { page }
    const res = await axiosPrivate.get('/payment/subscriptions', { params })
    removeInterceptors()
    console.log("get subscriptions ", res.data.subscriptions.length)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const getUserWallet = createAsyncThunk('/payment/get-wallet', async (_, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get('/payment/wallet')
    removeInterceptors()
    console.log("get wallet ")
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

// * user subscription plan functions
type SetUserSubscriptionPlanArgs = { monthly: number, yearly: number, lifetime: number }
export const setUserSubscriptionPlan = createAsyncThunk('/payment/set-user-plan', async (data: SetUserSubscriptionPlanArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.post('/payment/user-plan', data)
    removeInterceptors()
    console.log("set plans ")
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

type GetUserSubscriptionPlanArgs = { userId: string }
export const getUserSubscriptionPlan = createAsyncThunk('/payment/get-user-plan', async ({ userId }: GetUserSubscriptionPlanArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error('No accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const params = { userId }
    const res = await axiosPrivate.get('/payment/user-plan', { params })
    removeInterceptors()
    console.log("get plans ")
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})



// * admin
type GetFilteredSubsArgs = { page: number, startDate?: string, endDate?: string, searchText?: string }
export const getFilteredSubscriptions = createAsyncThunk('/admin/subscriptions/filtered', async ({ page, searchText, startDate, endDate }: GetFilteredSubsArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)

    const params = {
      page,
      searchText,
      startDate,
      endDate,
    }
    const res = await axiosPrivate.get('/admin/subscriptions/filtered', { params })
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const getFilteredTransactions = createAsyncThunk('/admin/transactions/filtered', async ({ page, searchText, startDate, endDate }: GetFilteredSubsArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const params = {
      page,
      searchText,
      startDate,
      endDate,
    }
    const res = await axiosPrivate.get('/admin/transactions/filtered', { params })
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})
