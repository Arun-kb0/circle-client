import React from 'react'
import { motion } from 'framer-motion'

type Props = React.PropsWithChildren<{}>;


const SpringButton: React.FC<Props> = ({ children }) => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.95 }} // Refined press effect for a subtle "button click" feel
      whileHover={{ scale: 1.1 }} // Amplified hover effect for better emphasis
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400, // Smooth motion
        damping: 20, // Fluid stop
        mass: 0.8, // Balanced weight
      }}
    >
      {children}
    </motion.div>

  )
}

export default SpringButton