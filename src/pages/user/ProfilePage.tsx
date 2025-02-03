import React, { useEffect, useState } from 'react'
import Profile from '../../components/user/profile/Profile'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../../features/auth/authSlice'
import {  useNavigate } from 'react-router-dom'
import { UserType } from '../../constants/types'


const ProfilePage = () => {
  const navigator = useNavigate()
  const user = useSelector(selectAuthUser)

  useEffect(() => {
    if (!user) navigator('/login')
  }, [])

  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14 lg:w-[140vh] md:w-[125vh] sm:w-[80vh]">

          <Profile user={user as UserType} />

        </div>
      </div>
    </main>
  )
}

export default ProfilePage