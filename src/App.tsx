import { useState } from 'react'
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

function App() {
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const hideNavbarPaths = ['/login', '/signup']

  return (
    <>
      {hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <ToastContainer theme='dark' />

      <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login />} />
        
        <Route element={<RequireAuth role={roles.user} />} >
          {/* * protected user routes */}
        </Route> 

        <Route element={<RequireAuth role={roles.admin} />} >
          {/* * protected admin routes */}
        </Route> 

        <Route path="*" element={<Unauthorized message='not found' desc="this route doesn't exists" />} />

      </Routes>
    </>
  )
}

export default App
