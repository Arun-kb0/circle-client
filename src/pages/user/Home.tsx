import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../../features/auth/authSlice'


const Home = () => {
  const user = useSelector(selectAuthUser)
  return (
    <main className='main-section items-center' >
      <h1 className='text-xl font-semibold text-gray-50'> welcome 
        <span className='font-bold text-orange-300 capitalize'>  {user?.name}  </span>
      </h1>
    </main>
  )
}

export default Home