import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  handleLogout: () => void
}

const UserNav = ({ handleLogout }: Props) => {

  return (
    <nav className='flex gap-4 capitalize text-green-500 text-lg font-semibold'>
      <h1 className='text-red-600 text-x'></h1>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={handleLogout}> Logout</button>
    </nav>
  )
}

export default UserNav