import React, { useEffect, useState } from 'react'
import LineChart from './LineChart'
import { LineChartDataType } from '../../../constants/types'
import PieChart from './PieChart'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserLineChartData, selectUserPieChartData } from '../../../features/user/userSlice'
import { AppDispatch } from '../../../app/store'
import { getPostsCountByDate } from '../../../features/post/postApi'
import { selectPostLineChartData } from '../../../features/post/postSlice'
import { getUsersCountByDateDetails } from '../../../features/user/userApi'

const testLineChartData: LineChartDataType[] = [
  {
    id: 'posts',
    color: 'hsl(65, 70%, 50%)',
    data: [
      { x: '2020-01', y: 244 },
      { x: '2020-02', y: 275 },
      { x: '2020-03-03', y: 160 },
      { x: '2020-04-04', y: 251 },
      { x: '2020-05-01', y: 107 },
      { x: '2020-06-01', y: 56 },
      { x: '2020-07-01', y: 156 },
      { x: '2020-08-01', y: 44 },
      { x: '2020-09-01', y: 225 },
      { x: '2020-10-01', y: 99 },
      { x: '2020-11-01', y: 256 },
      { x: '2020-12-01', y: 230 },
    ],
  },
  {
    id: 'users',
    color: 'hsl(133, 70%, 50%)',
    data: [
      { x: '2020-01-01', y: 80 },
      { x: '2020-02-01', y: 4 },
      { x: '2020-03-01', y: 118 },
      { x: '2020-04-01', y: 169 },
      { x: '2020-05-01', y: 248 },
      { x: '2020-06-01', y: 299 },
      { x: '2020-07-01', y: 204 },
      { x: '2020-08-01', y: 251 },
      { x: '2020-09-01', y: 145 },
      { x: '2020-10-01', y: 151 },
      { x: '2020-11-01', y: 179 },
      { x: '2020-12-01', y: 80 },
    ],
  },
]

const testPieChartData = [
  {
    "id": "Male",
    "label": "Male",
    "value": 437,
    "color": "hsl(295, 70%, 50%)"
  },
  {
    "id": "Female",
    "label": "Female",
    "value": 512,
    "color": "hsl(182, 70%, 50%)"
  },
  {
    "id": "Not specified",
    "label": "Not specified",
    "value": 20,
    "color": "hsl(268, 70%, 50%)"
  },
]

type Props = {}

const AdminHomeCharts = (props: Props) => {
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