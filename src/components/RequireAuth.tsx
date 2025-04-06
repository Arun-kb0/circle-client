import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectAuthAuthStatus,
  selectAuthLastVisitedRoute, 
  selectAuthUser
} from '../features/auth/authSlice'
import { useEffect } from 'react'

type Props = {
  role: 'admin' | 'user'
}

const RequireAuth = ({ role }: Props) => {
  // * chcek user and role and allow access
  const user = useSelector(selectAuthUser)
  const authStatus = useSelector(selectAuthAuthStatus)
  const lastVisitedRoute = useSelector(selectAuthLastVisitedRoute)
  const location = useLocation()
  const navigate = useNavigate()

  if (authStatus === 'bootstrapping') return null

  useEffect(() => {
    if (!user) return
    const targetRoute = lastVisitedRoute || (user.role === 'user' ? '/' : '/admin/')
    if (location.pathname !== targetRoute) {
      navigate(targetRoute, { replace: true })
    }
  }, [user])

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

