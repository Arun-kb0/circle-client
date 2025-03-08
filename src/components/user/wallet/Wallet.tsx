import React, { useEffect, useState } from 'react'
import { IoWalletOutline } from 'react-icons/io5'
import Transaction from './Transaction'
import { TransactionType } from '../../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPaymentTransactions, selectPaymentTransactionsCurrentPage,
  selectPaymentTransactionsNumberOfPages, selectPaymentTransactionsStatus, selectPaymentWallet
} from '../../../features/payment/paymentSlice';
import { AppDispatch } from '../../../app/store';
import { getTransactions, getUserWallet } from '../../../features/payment/paymentApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../Spinner';



const Wallet = () => {
  const dispatch = useDispatch<AppDispatch>()
  const wallet = useSelector(selectPaymentWallet)
  const transactions = useSelector(selectPaymentTransactions)
  const page = useSelector(selectPaymentTransactionsCurrentPage)
  const numberOfPages = useSelector(selectPaymentTransactionsNumberOfPages)
  const status = useSelector(selectPaymentTransactionsStatus)

  const [hasMore, setHasMore] = useState<boolean>(() => page <= numberOfPages)

  useEffect(() => {
    dispatch(getUserWallet())
    if (transactions.length !== 0) return
    dispatch(getTransactions(1))
  }, [dispatch, transactions?.length])

  useEffect(() => {
    setHasMore(page <= numberOfPages)
  }, [page, numberOfPages])

  const loadMorePosts = () => {
    if (status === 'loading' || page > numberOfPages) return
    dispatch(getTransactions(page + 1))
  }

  return (
    <article className='space-y-6'>

      <section className="space-y-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <IoWalletOutline size={32} />
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Balance : {wallet?.balance}</h5>
      </section>
     
      <InfiniteScroll
        className='space-y-4 h-64 overflow-y-auto'
        scrollableTarget='home'
        dataLength={transactions.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={
          <Spinner />
        }
        height={window.innerHeight - 240}
      >
        {status === 'success' && transactions.map((transaction) => (
          <Transaction
            key={transaction._id}
            transaction={transaction}
          />
        ))}
      </InfiniteScroll>

    </article>
  )
}

export default Wallet