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
import Home from './pages/Home'
import AdminHome from './pages/admin/AdminHome'


function App() {
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const hideNavbarPaths = ['/login', '/signup']

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <ToastContainer theme='dark' />

      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        {/* * protected user routes */}
        <Route element={<RequireAuth role={roles.user} />} >
          <Route path='/' element={<Home />} />
        
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
