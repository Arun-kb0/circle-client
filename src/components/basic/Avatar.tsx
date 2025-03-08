import { FaUserCircle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../features/user/userApi'
import { AppDispatch } from '../../app/store'
import { clearUserCreatedPosts } from '../../features/post/postSlice'
import { clearFollowers, clearFollowing } from '../../features/user/userSlice'

type Props = {
  userId: string
  image?: string
  alt?: string
}

const Avatar = ({ image, alt, userId }: Props) => {
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
    <button onClick={handleProfileNav}>
      {image
        ? <img className="w-8 h-8 rounded-full object-cover" src={image} alt={alt} />
        : <FaUserCircle size={25}/>
      }
    </button>
  )
}

export default Avatar