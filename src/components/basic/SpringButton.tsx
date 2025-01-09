import React from 'react'
import { motion } from 'framer-motion'

type Props = React.PropsWithChildren<{}>;


const SpringButton: React.FC<Props> = ({ children }) => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileTap={{ scale: 1.2 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10,
      }}
    >
      {children}
    </motion.div>
  )
}

export default SpringButton