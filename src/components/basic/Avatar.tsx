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
  disableNavigation?: boolean
}

const Avatar = ({ image, alt, userId, size = 34, disableNavigation = false }: Props) => {
  const navigator = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleClearProfile = async () => {
    dispatch(clearUserCreatedPosts())
    dispatch(clearFollowers())
    dispatch(clearFollowing())
  }

  const handleProfileNav = async () => {
    if (disableNavigation) return
    await handleClearProfile()
    await dispatch(getUser(userId))
    navigator('/user-profile')
  }

  return (
    <SpringButton>
      <button onClick={handleProfileNav} className='p-1'>
        {image
          ? <img
            className={`rounded-full object-cover`}
            src={image}
            alt={alt}
            style={{ width: size, height: size, borderRadius: '50%' }}
          />
          : <FaUserCircle size={size} className={`w-${size} h-${size}`} />
        }
      </button>
    </SpringButton>
  )
}

export default Avatar