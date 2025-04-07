import { useEffect } from 'react'
import PaymentSuccess from '../../components/basic/PaymentSuccess'
import { useNavigate } from 'react-router-dom'


const PaymentSuccessPage = () => {
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
    <div className='main-section flex justify-center items-center'>
      <PaymentSuccess />
    </div>
  )
}

export default PaymentSuccessPage