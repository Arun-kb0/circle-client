import { useDispatch, useSelector } from 'react-redux'
import { selectAuthUser } from '../features/auth/authSlice'
import { roles } from '../constants/enums'
import UserNav from './user/UserNav'
import AdminNav from './AdminNav'
import { logout } from '../features/auth/authApi'
import { AppDispatch } from '../app/store'
import { useNavigate } from 'react-router-dom'
import Sidebar from './user/Sidebar'
import AdminSidebar from './admin/AdminSidebar'


const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const user = useSelector(selectAuthUser)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className='flex justify-center items-center bg-gray-900'>
      {user && user.role === roles.user
        ? <>
          <UserNav handleLogout={handleLogout} />
          <Sidebar />
        </>
        : <>
          <AdminNav handleLogout={handleLogout} />
          <AdminSidebar />
        </>
      }
    </header>
  )
}

export default Navbar