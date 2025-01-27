import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  onClick: React.MouseEventHandler<HTMLDivElement>
}

const BackdropVerifyOtp: React.FunctionComponent<React.PropsWithChildren<Props>> = ({ children, onClick }) => {
  return (
    <motion.div
      className='backdrop z-50 h-[100vh] fixed'
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default BackdropVerifyOtp