import React, { useEffect } from 'react'
import Profile from '../../components/user/profile/Profile'
import { selectUserNavOpen, selectUserOtherUser } from '../../features/user/userSlice'
import { useSelector } from 'react-redux'

type Props = {}
const OtherUserProfilePage = (props: Props) => {
  const user = useSelector(selectUserOtherUser)
  const userNavOpen = useSelector(selectUserNavOpen)
  
  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className={`p-4 ${userNavOpen ? 'sm:ml-64 ' : ''}`}  >
        <div className="p-4 mt-14 lg:w-[140vh] md:w-[125vh] sm:w-[80vh]">

          {user && <Profile user={user} />}

        </div>
      </div>
    </main>
  )
}

export default OtherUserProfilePage