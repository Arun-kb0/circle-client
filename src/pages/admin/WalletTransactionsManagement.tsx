import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserCurrentPage, selectUserNumberOfPages, selectUserStatus, selectUserUsers } from '../../features/user/userSlice';
import { blockUser, getAllUsers, unblockUser } from '../../features/user/userApi';
import { AppDispatch } from '../../app/store';
import UserTable from '../../components/UserTable';
import DatePicker from '../../components/DatePicker';
import Pagination from '../../components/basic/Pagination';
import Search from '../../components/Search';
import { FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import { TransactionWithUsersType } from '../../constants/types';
import TransactionsTable from '../../components/admin/TransactionsTable';
import { getFilteredTransactions } from '../../features/payment/paymentApi';
import { selectPaymentFilteredTransactions, selectPaymentFilteredTransactionsCurrentPage, selectPaymentFilteredTransactionsNumberOfPages, selectPaymentFilteredTransactionsStatus } from '../../features/payment/paymentSlice';

type Props = {}

const WalletTransactionsManagement = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const [startDate, setStartDate] = useState<Date>(() => {
    const newStartDate = new Date()
    newStartDate.setFullYear(1970)
    return newStartDate
  })
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)

  const transactions = useSelector(selectPaymentFilteredTransactions)
  const status = useSelector(selectPaymentFilteredTransactionsStatus)
  const currentPage = useSelector(selectPaymentFilteredTransactionsCurrentPage)
  const numberOfPages = useSelector(selectPaymentFilteredTransactionsNumberOfPages)


  useEffect(() => {
    dispatch(getFilteredTransactions({
      page: page,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      searchText: searchText,
    }))
  }, [page])

  const handleFilter = (data: FieldValues | undefined) => {
    dispatch(getFilteredTransactions({
      page: page,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      searchText: data?.searchText ? data?.searchText : ''
    }))
  }


  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="lg:p-4 sm:p-1 mt-14 flex justify-between gap-8 lg:w-[160vh] md:w-[100vh] sm:w-[80vh]">

          <div className='mt-10'>

            <h5 className='text-2xl font-semibold text-center capitalize tracking-wider'>Wallet Transaction Management</h5>

            <div className='flex space-x-5 items-end'>
              <DatePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
              <button onClick={handleFilter} className="text-white  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> find </button>
              <Search
                handleSearch={handleFilter}
              />
            </div>

            <TransactionsTable
              transactions={transactions}
            />

            <Pagination
              numberOfPages={numberOfPages ? numberOfPages : 0}
              currentPage={currentPage ? currentPage : 0}
              page={page}
              setPage={setPage}
            />
          </div>

        </div>
      </div>
    </main>
  )
}

export default WalletTransactionsManagement