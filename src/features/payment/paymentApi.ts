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

