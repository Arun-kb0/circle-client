import Lottie from 'lottie-react'
import notFound from '../../assets/lottyfiles/notFound.json'

const NotFoundAnimation = () => {
  return (
    <div className='w-92 h-auto p-0'>
      <Lottie
        animationData={notFound}
        loop={true}
      />
    </div>
  )
}

export default NotFoundAnimation