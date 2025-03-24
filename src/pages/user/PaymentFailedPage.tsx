import React, { useEffect } from 'react'
import PaymentSuccess from '../../components/basic/PaymentSuccess'
import { useNavigate } from 'react-router-dom'
import PaymentFailed from '../../components/basic/PaymentFailed'

type Props = {}

const PaymentFailedPage = (props: Props) => {
  const navigator = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigator('/')
    }, 1500)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <main className='main-section justify-center relative overflow-hidden ' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14 flex justify-center items-center">

          <PaymentFailed />

        </div>
      </div>
    </main>
  )
}

export default PaymentFailedPage