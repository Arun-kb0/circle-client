import React, { useState } from 'react'
import CommentCard from './CommentCard'
import BackdropVerifyOtp from '../../backdrop/BackdropVerifyOtp'
import { motion } from 'framer-motion'
import { dropIn } from '../../../constants/animationDropins';




type Props = {
  handleClose: () => void
}

const Comments = ({ handleClose }: Props) => {
  const [page, setPage] = useState(1)

  return (
    <BackdropVerifyOtp onClick={handleClose}>

      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {<CommentCard/>}
      </motion.div>

    </BackdropVerifyOtp>
  )
}

export default Comments