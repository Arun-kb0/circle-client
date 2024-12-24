import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  message :string,
  desc:string
}
const Unauthorized = ({message,desc}:Props) => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <main className='main-section items-center'>
      <div className='space-y-5'>
        <p className='capitalize text-2xl font-semibold text-center text-orange-300'>{message}</p>
        <p className='text-lg text-center '>{desc}</p>
        <div className='flex justify-center '>
        <button
          onClick={goBack}
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
          go back
        </button>
        </div>
      </div>
    </main>
  )
}

export default Unauthorized