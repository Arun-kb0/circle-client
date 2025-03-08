import React, { useEffect } from 'react'
import SuccessAnimation from '../../components/basic/SuccessAnimation'
import { Link, useNavigate } from 'react-router-dom'

type Props = {}

const PaymentSuccess = (props: Props) => {
  const navigate = useNavigate()
  useEffect(() => {
    const timeout = setTimeout(() => {
      // * add this path dinamicaly
      navigate('/view-live')
    }, 1600)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14 lg:w-[140vh] md:w-[125vh] sm:w-[80vh] flex justify-center items-center h-full">

          <div>
            <h1 className='text-3xl font-semibold text-center text-green-400'>Payment Success</h1>
            <div className='flex justify-center items-center'>
              <SuccessAnimation />
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default PaymentSuccess