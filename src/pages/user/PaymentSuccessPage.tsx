import React, { useEffect } from 'react'
import PaymentSuccess from '../../components/basic/PaymentSuccess'
import { useNavigate } from 'react-router-dom'

type Props = {}

const PaymentSuccessPage = (props: Props) => {
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
    <main className='main-section justify-center relative overflow-hidden bg0' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14 flex justify-center items-center">

          <PaymentSuccess />

        </div>
      </div>
    </main>
  )
}

export default PaymentSuccessPage