import moment from 'moment'
import React from 'react'

type Props = {
  title: string
  count: number
  diff: number
}

const AdminCard = ({ title, count,diff }: Props) => {
  return (
    <div className="relative text-white font-sans">
      <div className="absolute top-[30%] right-[7%] w-24 h-24 rounded-full bg-[#fab5704c]" />
      <div className="absolute top-[8%] right-[5%] h-12 border border-white" />

      <div className="relative w-[11.875em] h-[11.875em] p-4 bg-[rgba(255,255,255,0.074)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] rounded-[0.7rem] transition-all ease duration-300 flex flex-col justify-between hover:shadow-[0_0_20px_1px_#ffbb763f] hover:border-[rgba(255,255,255,0.454)]">
        <span className="capitalize text-lg font-medium tracking-[0.1em]">{title}</span>
        <span className="text-4xl font-bold tracking-[0.1em]">{count}</span>
        <div className='flex gap-2 text-sm'>
          <span className="block mb-2 text-semibold">{diff>0 ?  `+${diff}` : `${diff}`}</span>
          <span className='text-gray-600'>than last month</span>
        </div>
      </div>
    </div>

  )
}

export default AdminCard