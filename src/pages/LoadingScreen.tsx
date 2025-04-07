import { useEffect } from 'react'
import Spinner from '../components/Spinner'
import { useDispatch } from 'react-redux'
import { setAuthStatus } from '../features/auth/authSlice'

const LoadingScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const timeout = setTimeout(() => {
    dispatch(setAuthStatus('unauthenticated'))    
    }, 10000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gray-900'>
      <div>
        <Spinner size={16} />
      </div>
    </div>
  )
}

export default LoadingScreen