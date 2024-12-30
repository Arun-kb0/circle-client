import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  onClick: React.MouseEventHandler<HTMLDivElement>
}

const BackdropVerifyOtp: React.FunctionComponent<React.PropsWithChildren<Props>> = ({ children, onClick }) => {
  console.log(children)
  return (
    <motion.div
      className='backdrop z-0'
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