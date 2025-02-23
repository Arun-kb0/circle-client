import Lottie from 'lottie-react'
import React, { useEffect, useRef } from 'react'
import callEnd from '../../assets/lottyfiles/callEnd.json'

const CallEndAnimation = () => {
  return (
    <div className='w-12 h-auto p-0'>
      <Lottie animationData={callEnd} />
    </div>
  )
}

export default CallEndAnimation