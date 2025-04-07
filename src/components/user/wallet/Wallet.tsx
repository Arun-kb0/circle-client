import { useEffect, useState } from 'react'
import { IoWalletOutline } from 'react-icons/io5'
import Transaction from './Transaction'
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPaymentTransactions, selectPaymentTransactionsCurrentPage,
  selectPaymentTransactionsNumberOfPages, selectPaymentTransactionsStatus, selectPaymentWallet
} from '../../../features/payment/paymentSlice';
import { AppDispatch } from '../../../app/store';
import { getTransactions, getUserWallet } from '../../../features/payment/paymentApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../Spinner';
import CountUp from 'react-countup'
import walletBgImage from '../../../assets/walletBgImage.jpg'

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
  }, [])

  useEffect(() => {
    setHasMore(page <= numberOfPages)
  }, [page, numberOfPages])

  const loadMorePosts = () => {
    if (status === 'loading' || page > numberOfPages) return
    dispatch(getTransactions(page + 1))
  }

  return (
    <article className='sm:w-[50vw] w-[90vw] space-y-6' >

      <section
        style={{ backgroundImage: `url(${walletBgImage})` }}
        className={`group relative overflow-hidden bg-cover bg-center bg-no-repeat space-y-4 p-6 border border-gray-200 rounded-lg shadow-sm  transition-all duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:scale-105  dark:border-gray-700`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

        <div className="relative z-10 flex justify-center items-center">
          <div className='flex gap-2'>
            <div className="flex justify-center">
              <IoWalletOutline
                size={32}
                className="text-gray-100 transition-transform duration-500 ease-in-out group-hover:animate-bounce"
              />
            </div>
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 transition-colors duration-500 group-hover:text-white dark:text-white">
              Balance : {' '}
              <CountUp
                end={wallet?.balance || 0}
                duration={2}
                separator=","
              />
              {" " + wallet?.currency || ''}
            </h5>
          </div>
        </div>
      </section>

      <InfiniteScroll
        className='space-y-4 h-64 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500'
        scrollableTarget='home'
        dataLength={transactions.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={
          <Spinner />
        }
        height={window.innerHeight - 240}
      >
        {transactions.length === 0 && <h5 className='text-center text-lg font-semibold capitalize'>No transactions to show</h5>}
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