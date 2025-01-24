import React from 'react'
import Profile from '../../components/user/profile/Profile'

type Props = {}

const ProfilePage = (props: Props) => {
  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14 lg:w-[140vh] md:w-[125vh] sm:w-[80vh]">
          
          <Profile/>

        </div>
      </div>
    </main>
  )
}

export default ProfilePage