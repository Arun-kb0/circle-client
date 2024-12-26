import React from 'react'
import SignupForm from '../components/auth/SignupForm'
import { roles } from '../constants/enums'

const Signup = () => {
  return (
    <main className='main-section items-center'>
      <SignupForm
        role={roles.user}
        name={'Signup'}
        homePath='/'
        loginPath='/login'
      />
    </main>
  )
}

export default Signup
