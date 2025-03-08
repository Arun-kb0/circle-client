import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../app/store'
import { createOrder } from '../features/payment/paymentApi'

type Props = {}

const Payment = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const handlePayment = () => {
    const data = {
      name: "Doe",
      mobileNumber: 1231231231,
      amount: 100
    }
    dispatch(createOrder({ data }))
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <button onClick={handlePayment} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Pay Now
      </button>
    </div>
  )
}

export default Payment