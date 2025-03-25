import  { useEffect, useState } from 'react'
import UserListCard from '../../basic/UserListCard'
import BackdropVerifyOtp from '../../backdrop/BackdropVerifyOtp'
import { motion } from 'framer-motion'
import { dropIn } from '../../../constants/animationDropins'
import { useSelector } from 'react-redux'
import { selectPostLikes, selectPostSelectedPost } from '../../../features/post/postSlice'

type Props = {
  handleClose: () => void
}


const LikedUsersModel = ({ handleClose }: Props) => {
  const post = useSelector(selectPostSelectedPost)
  const likes = useSelector(selectPostLikes)
  const [users] = useState(() => {
    if (!post) return []
    const users = likes.filter(like => post._id === like.contentId);
    const seenIds = new Set<string>();
    const uniqueUsers = users.filter(user => {
      if (seenIds.has(user._id)) return false;
      seenIds.add(user._id);
      return true;
    });
    return uniqueUsers;
  })

  useEffect(() => {
    console.log('LikedUsersModel')
    console.log(users)
    console.log(likes)
    console.log(post)
  }, [users])


  return (
    <BackdropVerifyOtp onClick={handleClose}>

      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className='flex  rounded-lg scrollbar-hide bg-white dark:bg-gray-900 py-8 lg:py-16 px-10 antialiased h-[80vh] w-[50vh] overflow-y-auto'>
          <div className='space-y-5 w-full'>
            <h5 className='font-semibold text-lg text-center'>Liked users</h5>
            {users.map(user => (
              <UserListCard
                name={user.authorName || ''}
                image={user.authorImage || ''}
                time={user.createdAt}
              />
            ))}
          </div>
        </div>

      </motion.div>
    </BackdropVerifyOtp>
  )
}

export default LikedUsersModel