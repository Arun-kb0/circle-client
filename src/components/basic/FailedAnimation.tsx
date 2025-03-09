import Lottie from 'lottie-react'
import React from 'react'
import failed from '../../assets/lottyfiles/failed.json'

const FailedAnimation = () => {
  return (
    <div className='w-20 h-auto p-0'>
      <Lottie
        animationData={failed}
        loop={false}
      />
    </div>
  )
}

export default FailedAnimation