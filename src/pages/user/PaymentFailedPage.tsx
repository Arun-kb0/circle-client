import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PaymentFailed from '../../components/basic/PaymentFailed'


const PaymentFailedPage = () => {
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
      <PaymentFailed />
    </div>
  )
}

export default PaymentFailedPage