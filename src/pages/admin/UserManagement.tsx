import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserStatus, selectUserUsers } from '../../features/user/userSlice';
import { blockUser, getAllUsers, unblockUser } from '../../features/user/userApi';
import { AppDispatch } from '../../app/store';
import UserTable from '../../components/UserTable';
import DatePicker from '../../components/DatePicker';

type Props = {}

const AdminHome = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const users = useSelector(selectUserUsers)
  const status = useSelector(selectUserStatus)

  useEffect(() => {
    dispatch(getAllUsers(1))
  }, [])

  const handleBlock = (userId: string) => {
    dispatch(blockUser(userId))
  }

  const handleUnblock = (userId: string) => {
    dispatch(unblockUser(userId))
  }

  const handleFilterByDate = () => {
    console.log(startDate)
    console.log(endDate)
  }


  return (
    <main className='main-section '>

      <div className='mt-10'>
        <div className='flex space-x-5 items-end'>
          <DatePicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <button onClick={handleFilterByDate}  className="text-white  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> find </button>
        </div>

        <UserTable
          users={users}
          status={status}
          handleBlock={handleBlock}
          handleUnblock={handleUnblock}
          currentPage={1}
          numberOfPages={1}
        />
      </div>

    </main>
  )
}

export default AdminHome