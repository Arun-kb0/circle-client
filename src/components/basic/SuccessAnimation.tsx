import Lottie from 'lottie-react'
import React from 'react'
import success from '../../assets/lottyfiles/success.json'

const SuccessAnimation = () => {
  return (
    <div className='w-32 h-auto p-0'>
      <Lottie animationData={success} />
    </div>
  )
}

export default SuccessAnimation