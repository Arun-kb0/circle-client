import React, { useEffect } from 'react'
import UserListCard from '../../basic/UserListCard'
import BackdropVerifyOtp from '../../backdrop/BackdropVerifyOtp'
import { motion } from 'framer-motion'
import { dropIn } from '../../../constants/animationDropins'

type Props = {
  postId: string
  handleClose: () => void
}

const users = [
  {
    name: "test1",
    image: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    time: new Date()
  },
  {
    name: "test2",
    image: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    time: new Date()
  }
]

const LikedUsersModel = ({ postId, handleClose }: Props) => {

  return (
    <BackdropVerifyOtp onClick={handleClose}>

      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className='flex justify-center rounded-lg scrollbar-hide bg-white dark:bg-gray-900 py-8 lg:py-16 px-10 antialiased h-[80vh] w-[50vh] overflow-y-auto'>
          <div className='space-y-5'>
            <h5 className='font-semibold text-lg text-center'>Liked users</h5>
            {users.map(user => (
              <UserListCard
                name={user.name}
                image={user.image}
                time={user.time}
              />
            ))}
          </div>
        </div>

      </motion.div>
    </BackdropVerifyOtp>
  )
}

export default LikedUsersModel