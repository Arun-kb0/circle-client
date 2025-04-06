import Spinner from '../components/Spinner'

const LoadingScreen = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gray-900'>
      <div>
        <Spinner size={16} />
      </div>
    </div>
  )
}

export default LoadingScreen