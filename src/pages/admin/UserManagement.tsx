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

type Props = {}

const AdminHome = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const [startDate, setStartDate] = useState<Date>(() => {
    const currentDate = new Date()
    const oneYearBefore = new Date()
    oneYearBefore.setMonth(currentDate.getMonth() - 1)
    return oneYearBefore
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
      searchText: searchText
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
    <main className='main-section '>

      <div className='mt-10'>
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

        <UserTable
          users={users}
          status={status}
          handleBlock={handleBlock}
          handleUnblock={handleUnblock}
          currentPage={1}
          numberOfPages={1}
        />

        <Pagination
          numberOfPages={numberOfPages ? numberOfPages : 0}
          currentPage={currentPage ? currentPage : 0}
          page={page}
          setPage={setPage}
        />
      </div>

    </main>
  )
}

export default AdminHome