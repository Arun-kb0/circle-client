import React from 'react'
import LoginFrom from '../components/auth/LoginFrom'
import { roles } from '../constants/enums'


const AdminLogin = () => {
  return (
    <main className='main-section items-center'>
      <LoginFrom
        role={roles.admin}
        name={'Admin Login'}
        homePath='/admin'
        signupPath='/admin/signup'
        loginMsg='Login as user'
        loginPath='/login'
      />
    </main>
  )
}

export default AdminLogin