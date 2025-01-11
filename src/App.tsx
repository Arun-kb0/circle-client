import { useDispatch } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AppDispatch } from './app/store'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import Signup from './pages/Signup'
import Login from './pages/Login'
import RequireAuth from './components/RequireAuth'
import { roles } from './constants/enums'
import Unauthorized from './components/Unauthorized'
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import Home from './pages/user/Home'
import AdminHome from './pages/admin/UserManagement'
import { useEffect } from 'react'
import { refresh } from './features/auth/authApi'
import AdminLogin from './pages/AdminLogin'
import AdminSignup from './pages/AdminSignup'
import OtpModel from './pages/OtpModel'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/user/Profile'
import GlobalFeed from './pages/user/GlobalFeed'
import CreatePost from './pages/user/CreatePost'


function App() {
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const hideNavbarPaths = ['/login', '/signup', '/resetPwd', '/admin/signup', '/admin/login']

  useEffect(() => {
    dispatch(refresh())
  }, [])

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <ToastContainer theme='dark' />

      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify' element={<OtpModel />} />
        <Route path='/resetPwd' element={<ResetPassword />} />


        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/signup' element={<AdminSignup />} />


        {/* * protected user routes */}
        <Route element={<RequireAuth role={roles.user} />} >
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/global-feed' element={<GlobalFeed />} />
          <Route path='/create-post' element={<CreatePost />} />
    
        </Route>

        {/* * protected admin routes */}
        <Route element={<RequireAuth role={roles.admin} />} >
          <Route path='/admin'>
            <Route index element={<AdminHome />} />

          </Route>
        </Route>

        <Route path="*" element={<Unauthorized message='not found' desc="this route doesn't exists" />} />

      </Routes>
    </>
  )
}

export default App
