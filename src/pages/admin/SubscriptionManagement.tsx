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
import SubscriptionTable from '../../components/admin/SubscriptionTable';
import { SubscriptionWithUserType } from '../../constants/types';

type Props = {}

const subscriptions: SubscriptionWithUserType[] = [
  {
    _id: 'sub1',
    merchantTransactionId: 'txn1001',
    subscriberUserId: 'userA',
    subscriberToUserId: 'userB',
    plan: 'monthly',
    status: 'active',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    subscriberUserName: 'AliceWonder',
    subscriberUserImage: 'http://example.com/images/alice.png',
    subscriberToUserName: 'BobBuilder',
    subscriberToUserImage: 'http://example.com/images/bob.png'
  },
  {
    _id: 'sub2',
    merchantTransactionId: 'txn1002',
    subscriberUserId: 'userC',
    subscriberToUserId: 'userD',
    plan: 'yearly',
    status: 'active',
    createdAt: '2025-02-20T14:30:00Z',
    updatedAt: '2025-02-20T14:30:00Z',
    subscriberUserName: 'CharlieChaplin',
    subscriberUserImage: 'http://example.com/images/charlie.png',
    subscriberToUserName: 'DaisyDuck',
    subscriberToUserImage: 'http://example.com/images/daisy.png'
  },
  {
    _id: 'sub3',
    merchantTransactionId: 'txn1003',
    subscriberUserId: 'userE',
    subscriberToUserId: 'userF',
    plan: 'lifetime',
    status: 'cancelled',
    createdAt: '2025-03-05T08:15:00Z',
    updatedAt: '2025-03-10T09:00:00Z',
    subscriberUserName: 'EveOnline',
    subscriberUserImage: 'http://example.com/images/eve.png',
    subscriberToUserName: 'FrankSinatra',
    subscriberToUserImage: 'http://example.com/images/frank.png'
  },
  {
    _id: 'sub4',
    merchantTransactionId: 'txn1004',
    subscriberUserId: 'userG',
    subscriberToUserId: 'userH',
    plan: 'monthly',
    status: 'inactive',
    createdAt: '2025-04-12T12:45:00Z',
    updatedAt: '2025-04-12T12:45:00Z',
    subscriberUserName: 'GraceHopper',
    subscriberUserImage: 'http://example.com/images/grace.png',
    subscriberToUserName: 'HeidiKlum',
    subscriberToUserImage: 'http://example.com/images/heidi.png'
  },
  {
    _id: 'sub5',
    merchantTransactionId: 'txn1005',
    subscriberUserId: 'userI',
    subscriberToUserId: 'userJ',
    plan: 'yearly',
    status: 'active',
    createdAt: '2025-05-22T16:20:00Z',
    updatedAt: '2025-05-22T16:20:00Z',
    subscriberUserName: 'IvanIvanov',
    subscriberUserImage: 'http://example.com/images/ivan.png',
    subscriberToUserName: 'JuliaRoberts',
    subscriberToUserImage: 'http://example.com/images/julia.png'
  }
];


const SubscriptionManagement = (props: Props) => {
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
            
            <h5 className='text-2xl font-semibold text-center capitalize tracking-wider'>Subscription Management</h5>

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

            <SubscriptionTable
              subscriptions={subscriptions}
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

export default SubscriptionManagement