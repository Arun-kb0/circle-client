import { useEffect, useState } from 'react'
import LineChart from './LineChart'
import { LineChartDataType } from '../../../constants/types'
import PieChart from './PieChart'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserLineChartData, selectUserPieChartData } from '../../../features/user/userSlice'
import { AppDispatch } from '../../../app/store'
import { getPostsCountByDate } from '../../../features/post/postApi'
import { selectPostLineChartData } from '../../../features/post/postSlice'
import { getUsersCountByDateDetails } from '../../../features/user/userApi'


const AdminHomeCharts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const pieChartData = useSelector(selectUserPieChartData)
  const postLineChartData = useSelector(selectPostLineChartData)
  const userLineChartData = useSelector(selectUserLineChartData)
  const [lineChartData, setLineChartData] = useState<LineChartDataType[]>([])
  const [addedLineChartIds, setAddedLineChartIds] = useState<Set<string>>(new Set)

  useEffect(() => {
    const endDate = new Date().toISOString()
    const startDate = new Date(new Date().setFullYear(new Date().getMonth() - 1)).toISOString()
    dispatch(getPostsCountByDate({ startDate, endDate }))
    dispatch(getUsersCountByDateDetails({ startDate, endDate }))
  }, [])

  useEffect(() => {
    if (postLineChartData && !addedLineChartIds.has(postLineChartData.id)) {
      setAddedLineChartIds(prev => new Set(prev.add(postLineChartData.id)))
      setLineChartData(prev => {
        const filteredData = prev.filter(data => data.id !== postLineChartData.id)
        return [...filteredData, postLineChartData]
      })
    }
    if (userLineChartData && !addedLineChartIds.has(userLineChartData.id)) {
      setAddedLineChartIds(prev => new Set(prev.add(userLineChartData.id)))
      setLineChartData(prev => {
        const filteredData = prev.filter(data => data.id !== userLineChartData.id)
        return [...filteredData, userLineChartData]
      })
    }
  }, [postLineChartData, userLineChartData])

  // useEffect(() => {
  //   console.log('lineChartData')
  //   console.log(addedLineChartIds)
  //   console.log(lineChartData)
  // }, [lineChartData])


  return (
    <section className='flex gap-1 justify-between w-full h-[70vh] '>

      <div className="card-with-shadow w-[60%] h-[70vh]">
        <h5 className='text-lg capitalize text-center font-semibold py-1'>User and post chart</h5>
        <div className='h-[63vh]'>
          {postLineChartData && userLineChartData &&
            <LineChart data={lineChartData} />
          }
        </div>
      </div>

      <div className="card-with-shadow w-[38%] h-[60vh]">
        <h5 className='text-lg capitalize text-center font-semibold py-1'>user chart</h5>
        <div className='h-[50vh]  p-1'>
          <PieChart data={pieChartData} />
        </div>
      </div>

    </section>
  )
}

export default AdminHomeCharts