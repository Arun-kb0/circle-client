import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  PaginationSubscriptionFiltered,
  StateType, SubscriptionPagination, SubscriptionsType,
  SubscriptionWithUserType,
  TransactionPagination, TransactionType, WalletType
} from "../../constants/types"
import {
  createOrder, getFilteredSubscriptions, getSubscriptions, getTransactions,
  getUserWallet, subscribeWithWallet
} from "./paymentApi"
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
  paymentStatus: StateType
  error: undefined | string
  subscriptionsFiltered: SubscriptionWithUserType[]
  subscriptionsFilteredNumberOfPages: number
  subscriptionsFilteredCurrentPge: number
  subscriptionsFilteredStatus: StateType
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
  paymentStatus: 'idle',
  error: undefined,
  subscriptionsFiltered: [],
  subscriptionsFilteredNumberOfPages: 0,
  subscriptionsFilteredCurrentPge: 0,
  subscriptionsFilteredStatus: "loading"
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {

    resetPaymentStatus: (state) => {
      state.paymentStatus = 'idle'
    }

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

      .addCase(subscribeWithWallet.pending, (state) => {
        state.paymentStatus = 'loading'
      })
      .addCase(subscribeWithWallet.fulfilled, (state, action) => {
        state.paymentStatus = 'success'
      })
      .addCase(subscribeWithWallet.rejected, (state, action) => {
        state.paymentStatus = 'failed'
        state.error = action.error.message
      })

      // .addCase(createOrder.pending, (state) => {
      //   state.paymentStatus = 'loading'
      // })
      // .addCase(createOrder.fulfilled, (state, action) => {
      //   state.paymentStatus = 'success'
      // })
      // .addCase(createOrder.rejected, (state, action) => {
      //   state.paymentStatus = 'failed'
      //   state.error = action.error.message
      // })

      .addCase(getFilteredSubscriptions.pending, (state) => {
        state.subscriptionsFilteredStatus = 'loading'
      })
      .addCase(getFilteredSubscriptions.fulfilled, (state, action: PayloadAction<PaginationSubscriptionFiltered>) => {
        if (!action.payload) return
        state.subscriptionsFilteredStatus = 'success'
        const { subscriptions, numberOfPages, currentPage } = action.payload
        // const existingPostIds = new Set(state.posts.map(post => post._id));
        // const newPosts = posts.filter(post => !existingPostIds.has(post._id));
        state.subscriptionsFiltered = subscriptions
        state.subscriptionsFilteredCurrentPge = currentPage
        state.subscriptionsNumberOfPage = numberOfPages
      })
      .addCase(getFilteredSubscriptions.rejected, (state, action) => {
        state.subscriptionsFilteredStatus = 'failed'
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
export const selectPaymentStatus = (state: RootState) => state.payment.paymentStatus

export const selectPaymentFilteredSubscriptions = (state: RootState) => state.payment.subscriptionsFiltered
export const selectPaymentFilteredSubscriptionsNumberOfPages = (state: RootState) => state.payment.subscriptionsFilteredNumberOfPages
export const selectPaymentFilteredSubscriptionsCurrentPage = (state: RootState) => state.payment.subscriptionsFilteredCurrentPge
export const selectPaymentFilteredSubscriptionsStatus = (state: RootState) => state.payment.subscriptionsFilteredStatus

export const {
  resetPaymentStatus
} = paymentSlice.actions


export default paymentSlice.reducer
