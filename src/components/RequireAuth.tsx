import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../features/auth/authSlice'

type Props = {
  role: number
}

const RequireAuth = ({ role }: Props) => {
  // * chcek user and role and allow access
  const user = useSelector(selectAuthUser)
  const location = useLocation()
  console.log(user?.email)
  console.log(user?.role)

  return (
    user && user.role === role
      ? <Outlet />
      : user
        ? < Navigate
          to='/unauthorized'
          state={{ from: location }}
          replace />
        : <Navigate
          to='/login'
          state={{ from: location }}
          replace />
  )
}

export default RequireAuth