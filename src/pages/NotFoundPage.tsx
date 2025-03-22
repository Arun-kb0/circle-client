import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAuthUser } from '../features/auth/authSlice'
import NotFoundAnimation from '../components/basic/NotFoundAnimation'
import { roles } from '../constants/enums'

const NotFoundPage = () => {
  const user = useSelector(selectAuthUser)

  return (
    <main className='bg-gray-900 h-screen w-screen flex justify-center items-center'>
      <div className='space-y-8'>

        <NotFoundAnimation />
        <h1 className='text-4xl text-white font-bold capitalize text-center tracking-widest'>page not found</h1>

        <div className='flex justify-center item-center'>
          {user
            ? <Link to={user.role === 'user' ? '/' : '/admin/' } className='capitalize text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Go to Home</Link>
            : <Link to='/login' className='capitalize text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Got to Login</Link>
          }
        </div>

      </div>
    </main>

  )
}

export default NotFoundPage