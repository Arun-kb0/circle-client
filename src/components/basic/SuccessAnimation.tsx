import Lottie from 'lottie-react'
import React from 'react'
import success from '../../assets/lottyfiles/success.json'

const SuccessAnimation = () => {
  return (
    <div className='w-20 h-auto p-0'>
      <Lottie
        animationData={success}
        loop={false}
      />
    </div>
  )
}

export default SuccessAnimation