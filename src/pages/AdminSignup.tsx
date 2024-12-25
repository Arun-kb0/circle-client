import React from 'react'
import SignupForm from '../components/auth/SignupForm'
import { roles } from '../constants/enums'


const AdminSignup = () => {
  return (
    <main>
      <SignupForm
        role={roles.admin}
        name={'Admin Signup'}
      />
    </main>
  )
}

export default AdminSignup