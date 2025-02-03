import React from 'react'
import spinningOrbs from '../../assets/lottyfiles/spinningOrbs.json'
import Lottie from 'lottie-react'
import BackdropVerifyOtp from '../backdrop/BackdropVerifyOtp'
import { motion } from 'framer-motion'
import { dropIn } from '../../constants/animationDropins'

type Props = {
  message: string
  handleClose: () => void
}

const OrbAnimation = ({ message, handleClose }: Props) => {
  return (
    <BackdropVerifyOtp onClick={handleClose}>
      <motion.div
        className='flex justify-center items-center'
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >

        <div className='w-96 h-96'>
          <Lottie animationData={spinningOrbs} />
          <h5 className='capitalize  tracking-widest text-xl font-semibold text-gray-50 text-center'>{message}</h5>
        </div>

      </motion.div>
    </BackdropVerifyOtp>
  )
}

export default OrbAnimation