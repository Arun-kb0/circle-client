import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { selectUserNavOpen} from '../../features/user/userSlice';
import {
  selectPostReportFiltered,
  selectPostReportFilteredCurrentPage,
  selectPostReportFilteredNumberOfPages,
} from '../../features/post/postSlice';
import { FieldValues } from 'react-hook-form';
import DatePicker from '../../components/DatePicker';
import Search from '../../components/Search';
import { getFilteredReports } from '../../features/post/postApi';
import Pagination from '../../components/basic/Pagination';
import AdminReportTable from '../../components/admin/AdminReportTable';
// import CsvDownload from '../../components/admin/CsvDownload';
// import PdfDownload from '../../components/admin/PdfDownload';
// import { ReportAdminType } from '../../constants/types';



// const csvHeaders = [
//   { label: 'Media', key: 'media' },
//   { label: 'Author', key: 'authorName' },
//   { label: 'Tags', key: 'tags' },
//   { label: 'Description', key: 'desc' },
//   { label: 'Likes', key: 'likesCount' },
//   { label: 'Comments', key: 'commentCount' },
//   { label: 'Reports', key: 'reportsCount' },
//   { label: 'Created at', key: 'updatedAt' },
//   { label: 'Status', key: 'status' },
// ]

// const pdfHeaders = [[
//   'media', 'authorName', 'tags',
//   'desc', 'likesCount', 'commentCount',
//   'reportsCount', 'updatedAt', 'status'
// ]]


const ReportManagement = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userNavOpen = useSelector(selectUserNavOpen)

  const [startDate, setStartDate] = useState<Date>(() => {
    const newStartDate = new Date()
    newStartDate.setFullYear(1970)
    return newStartDate
  })
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [searchText] = useState('')
  const [page, setPage] = useState(1)

  const reports = useSelector(selectPostReportFiltered)
  // const status = useSelector(selectPostReportFilteredStatus)
  const currentPage = useSelector(selectPostReportFilteredCurrentPage)
  const numberOfPages = useSelector(selectPostReportFilteredNumberOfPages)


  useEffect(() => {
    dispatch(getFilteredReports({
      page,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      searchText: searchText,
    }))
  }, [page])


  const handleFilter = (data: FieldValues | undefined) => {
    dispatch(getFilteredReports({
      page: page,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      searchText: data?.searchText ? data?.searchText : '',
    }))
  }

  useEffect(() => {
    console.log('start date')
    console.log(startDate.toDateString())
  }, [startDate])

  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className={`p-4 ${userNavOpen ? 'sm:ml-64 ' : ''}`} >
        <div className="lg:p-4 sm:p-1 mt-14 flex justify-between gap-8 lg:w-[160vh] md:w-[100vh] sm:w-[80vh]">


          <div className='mt-10'>

            <h5 className='text-2xl font-semibold text-center capitalize tracking-wider'>Report Management</h5>

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

              {/* <CsvDownload
                headers={csvHeaders}
                data={reports}
              /> */}
              {/* <PdfDownload
                headers={pdfHeaders}
                data={reports}
              /> */}

            </div>

            <AdminReportTable
              reportData={reports}
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

export default ReportManagement