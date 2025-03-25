import Profile from '../../components/user/profile/Profile'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../../features/auth/authSlice'
import { UserType } from '../../constants/types'


const UserProfilePage = () => {
  const user = useSelector(selectAuthUser)
  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14 lg:w-[140vh] md:w-[125vh] sm:w-[80vh]">

          <Profile
            user={user as UserType}
          />

        </div>
      </div>
    </main>
  )
}

export default UserProfilePage