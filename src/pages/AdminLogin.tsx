import React from 'react'
import LoginFrom from '../components/auth/LoginFrom'
import { roles } from '../constants/enums'


const AdminLogin = () => {
  return (
    <main>
      <LoginFrom
        role={roles.admin}
        name={'Admin Login'}
      />
    </main>
  )
}

export default AdminLogin