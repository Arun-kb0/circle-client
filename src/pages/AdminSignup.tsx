import React from 'react'
import SignupForm from '../components/auth/SignupForm'
import { roles } from '../constants/enums'


const AdminSignup = () => {
  return (
    <main className='main-section items-center'>
      <SignupForm
        role={roles.admin}
        name={'Admin Signup'}
        homePath='/admin'
        loginPath='/admin/login'
      />
    </main>
  )
}

export default AdminSignup