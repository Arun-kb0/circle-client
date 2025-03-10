import { FaUserCircle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../features/user/userApi'
import { AppDispatch } from '../../app/store'
import { clearUserCreatedPosts } from '../../features/post/postSlice'
import { clearFollowers, clearFollowing } from '../../features/user/userSlice'
import SpringButton from './SpringButton'

type Props = {
  userId: string
  image?: string
  alt?: string
  size?: number
}

const Avatar = ({ image, alt, userId, size = 6 }: Props) => {
  const navigator = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleClearProfile = async () => {
    dispatch(clearUserCreatedPosts())
    dispatch(clearFollowers())
    dispatch(clearFollowing())
  }

  const handleProfileNav = async () => {
    await handleClearProfile()
    await dispatch(getUser(userId))
    navigator('/user-profile')
  }

  return (
    <SpringButton>
      <button onClick={handleProfileNav} className='px-2 py-1'>
        {image
          ? <img className={`w-${size} h-${size} rounded-full object-cover mx-2`} src={image} alt={alt} />
          : <FaUserCircle size={size} className={`w-${size} h-${size}`} />
        }
      </button>
    </SpringButton>
  )
}

export default Avatar