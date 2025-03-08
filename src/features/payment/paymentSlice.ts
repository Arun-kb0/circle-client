import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  StateType, SubscriptionPagination, SubscriptionsType,
  TransactionPagination, TransactionType, WalletType
} from "../../constants/types"
import { getSubscriptions, getTransactions, getUserWallet } from "./paymentApi"
import { RootState } from "../../app/store"


type PaymentState = {
  subscriptions: SubscriptionsType[]
  subscriptionsNumberOfPage: number
  subscriptionsCurrentPage: number
  subscriptionsStatus: StateType
  transactions: TransactionType[]
  transactionsNumberOfPages: number
  transactionsCurrentPage: number
  transactionsStatus: StateType
  wallet: WalletType | null
  walletStatus: StateType
  error: undefined | string
}

const initialState: PaymentState = {
  subscriptions: [],
  subscriptionsNumberOfPage: 0,
  subscriptionsCurrentPage: 0,
  subscriptionsStatus: "idle",
  transactions: [],
  transactionsNumberOfPages: 0,
  transactionsCurrentPage: 0,
  transactionsStatus: "idle",
  wallet: null,
  walletStatus: 'idle',
  error: undefined
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder

      .addCase(getTransactions.pending, (state) => {
        state.transactionsStatus = 'loading'
      })
      .addCase(getTransactions.fulfilled, (state, action: PayloadAction<TransactionPagination>) => {
        state.transactionsStatus = 'success'
        const { numberOfPages, currentPage, transactions } = action.payload
        state.transactions = transactions
        state.transactionsCurrentPage = currentPage
        state.transactionsNumberOfPages = numberOfPages
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.transactionsStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(getSubscriptions.pending, (state) => {
        state.subscriptionsStatus = 'loading'
      })
      .addCase(getSubscriptions.fulfilled, (state, action: PayloadAction<SubscriptionPagination>) => {
        state.subscriptionsStatus = 'success'
        const { numberOfPages, currentPage, subscriptions } = action.payload
        state.subscriptions = subscriptions
        state.subscriptionsCurrentPage = currentPage
        state.subscriptionsNumberOfPage = numberOfPages
      })
      .addCase(getSubscriptions.rejected, (state, action) => {
        state.subscriptionsStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(getUserWallet.pending, (state) => {
        state.walletStatus = 'loading'
      })
      .addCase(getUserWallet.fulfilled, (state, action: PayloadAction<{ wallet: WalletType }>) => {
        state.walletStatus = 'success'
        const { wallet } = action.payload
        state.wallet = wallet
      })
      .addCase(getUserWallet.rejected, (state, action) => {
        state.walletStatus = 'failed'
        state.error = action.error.message
      })


  }

})

export const selectPaymentTransactions = (state: RootState) => state.payment.transactions
export const selectPaymentSubscriptions = (state: RootState) => state.payment.subscriptions
export const selectPaymentWallet = (state: RootState) => state.payment.wallet
export const selectPaymentTransactionsStatus = (state: RootState) => state.payment.transactionsStatus
export const selectPaymentSubscriptionsStatus = (state: RootState) => state.payment.subscriptionsStatus
export const selectPaymentWalletStatus = (state: RootState) => state.payment.walletStatus
export const selectPaymentTransactionsCurrentPage = (state: RootState) => state.payment.transactionsCurrentPage
export const selectPaymentSubscriptionsCurrentPage = (state: RootState) => state.payment.subscriptionsCurrentPage
export const selectPaymentTransactionsNumberOfPages = (state: RootState) => state.payment.transactionsNumberOfPages
export const selectPaymentSubscriptionsNumberOfPage = (state: RootState) => state.payment.subscriptionsNumberOfPage


export const {

} = paymentSlice.actions


export default paymentSlice.reducer
