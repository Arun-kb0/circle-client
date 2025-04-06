import { useState } from 'react'
import { MdMoreHoriz } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { followUser, unFollow, userToUserUnblock } from '../../../features/user/userApi';
import { useLocation } from 'react-router-dom';
import { selectUserBlockedAccounts, selectUserFollowing } from '../../../features/user/userSlice';
import Avatar from '../../basic/Avatar';
import { selectAuthUser } from '../../../features/auth/authSlice';

type Props = {
  userId: string
  name: string
  image: string | undefined
  componentType?: 'blocked-user'
}

const UserCard = ({ userId, name, image, componentType }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const followingUsers = useSelector(selectUserFollowing)
  const userBlockedAccounts = useSelector(selectUserBlockedAccounts)
  const currentUser = useSelector(selectAuthUser)

  const [isFollowing] = useState<boolean>(() => {
    if (location.pathname === '/follow-people') return false
    if (location.pathname === '/following') return true
    return Boolean(followingUsers.findIndex(following => following._id === userId))
  })

  const handleFollow = () => { dispatch(followUser(userId)) }
  const handleUnFollow = () => { dispatch(unFollow(userId)) }
  const handleMessage = () => { }

  const [isBlockedAccountUser] = useState<boolean>(() => {
    if (componentType === 'blocked-user') return false
    return Boolean(userBlockedAccounts.find(item => item.blockedUserId === userId))
  })

  const handleUnblock = () => {
    dispatch(userToUserUnblock(userId))
  }

  if (isBlockedAccountUser || currentUser?._id === userId) return (<></>)
  return (
  <article className="max-w-sm w-52 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl dark:bg-gray-900 dark:border-gray-800 transition-shadow duration-500 ease-in-out animate-fadeIn card-3d" >
    <div className="flex flex-col items-center py-6 animate-scaleUp">
      <div className="mb-3">
        <Avatar
          image={image}
          alt={name}
          userId={userId}
          size={75}
        />
      </div>

      <h5 className="mb-1 text-xl font-medium text-gray-100">{name}</h5>

      {isFollowing && !componentType && (
        <div className="mt-4 md:mt-6 space-y-2 flex flex-col items-center text-center">
            <button onClick={handleUnFollow} className="capitalize items-center px-14 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 duration-300">
            unfollow
          </button>
            <button onClick={handleMessage} className="capitalize py-2 px-14 text-sm font-medium text-gray-200 focus:outline-none bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700 hover:text-gray-100 focus:z-10 transform hover:scale-105 duration-300">
            message
          </button>
        </div>
      )}

      {!isFollowing && !componentType && (
        <div className="mt-4 md:mt-6 space-y-2">
          <button onClick={handleFollow} className="capitalize items-center px-14 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 duration-300">
            follow
          </button>
        </div>
      )}

      {componentType === 'blocked-user' && (
        <div className="mt-4 md:mt-6 space-y-2">
          <button onClick={handleUnblock} className="capitalize items-center px-14 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 duration-300">
            Unblock
          </button>
        </div>
      )}
    </div>
  </article>

    
  )
}

export default UserCard