import React from 'react'
import LineChart from './LineChart'
import { LineChartDataType } from '../../../constants/types'
import PieChart from './PieChart'
import { useSelector } from 'react-redux'
import { selectUserPieChartData } from '../../../features/user/userSlice'

const testLineChartData: LineChartDataType[] = [
  {
    id: 'posts',
    color: 'hsl(65, 70%, 50%)',
    data: [
      { x: '2020-01-01', y: 244 },
      { x: '2020-02-01', y: 275 },
      { x: '2020-03-01', y: 160 },
      { x: '2020-04-01', y: 251 },
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
  const pieChartData = useSelector(selectUserPieChartData)

  return (
    <section className='flex gap-1 justify-between w-full h-[70vh] '>

      <div className="card-with-shadow w-[60%] h-[70vh]">
        <h5 className='text-lg capitalize text-center font-semibold py-1'>User and post chart</h5>
        <div className='h-[63vh]'>
          <LineChart data={testLineChartData} />
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