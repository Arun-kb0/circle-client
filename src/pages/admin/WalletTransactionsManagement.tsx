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



const transactions: TransactionWithUsersType[] = [
  {
    _id: "txn1",
    userId: "user1",
    senderId: "user1",
    receiverId: "user2",
    type: "credit",
    amount: 150.00,
    currency: "USD",
    status: "completed",
    createdAt: "2025-03-01T09:00:00Z",
    updatedAt: "2025-03-01T09:05:00Z",
    senderName: "Alice Johnson",
    senderImage: "http://example.com/images/alice.jpg",
    receiverName: "Bob Smith",
    receiverImage: "http://example.com/images/bob.jpg"
  },
  {
    _id: "txn2",
    userId: "user2",
    senderId: "user3",
    receiverId: "user2",
    type: "debit",
    amount: 75.50,
    currency: "USD",
    status: "pending",
    createdAt: "2025-03-02T10:30:00Z",
    updatedAt: "2025-03-02T10:35:00Z",
    senderName: "Charlie Brown",
    senderImage: "http://example.com/images/charlie.jpg",
    receiverName: "Bob Smith",
    receiverImage: "http://example.com/images/bob.jpg"
  },
  {
    _id: "txn3",
    userId: "user3",
    senderId: "user3",
    receiverId: "user4",
    type: "credit",
    amount: 200.00,
    currency: "USD",
    status: "failed",
    createdAt: "2025-03-03T11:00:00Z",
    updatedAt: "2025-03-03T11:10:00Z",
    senderName: "Charlie Brown",
    senderImage: "http://example.com/images/charlie.jpg",
    receiverName: "Diana Prince",
    receiverImage: "http://example.com/images/diana.jpg"
  },
  {
    _id: "txn4",
    userId: "user4",
    senderId: "user4",
    receiverId: "user5",
    type: "debit",
    amount: 50.75,
    currency: "USD",
    status: "completed",
    createdAt: "2025-03-04T12:00:00Z",
    updatedAt: "2025-03-04T12:05:00Z",
    senderName: "Diana Prince",
    senderImage: "http://example.com/images/diana.jpg",
    receiverName: "Evan Lee",
    receiverImage: "http://example.com/images/evan.jpg"
  },
  {
    _id: "txn5",
    userId: "user5",
    senderId: "user6",
    receiverId: "user5",
    type: "credit",
    amount: 300.00,
    currency: "USD",
    status: "completed",
    createdAt: "2025-03-05T13:30:00Z",
    updatedAt: "2025-03-05T13:35:00Z",
    senderName: "Fiona Gallagher",
    senderImage: "http://example.com/images/fiona.jpg",
    receiverName: "Evan Lee",
    receiverImage: "http://example.com/images/evan.jpg"
  }
];




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

  const users = useSelector(selectUserUsers)
  const status = useSelector(selectUserStatus)
  const currentPage = useSelector(selectUserCurrentPage)
  const numberOfPages = useSelector(selectUserNumberOfPages)


  useEffect(() => {
    dispatch(getAllUsers({
      page: page,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      searchText: searchText,
      isAdmin: true
    }))
  }, [page])


  const handleBlock = (userId: string) => {
    dispatch(blockUser(userId))
  }

  const handleUnblock = (userId: string) => {
    dispatch(unblockUser(userId))
  }

  const handleFilter = (data: FieldValues | undefined) => {
    dispatch(getAllUsers({
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