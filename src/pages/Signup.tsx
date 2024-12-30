import React, { useState } from 'react'
import SignupForm from '../components/auth/SignupForm'
import { roles } from '../constants/enums'
import { AnimatePresence } from 'framer-motion'
import VerifyOtpModal from '../components/models/VerifyOtpModal'

const Signup = () => {
  const [modelOpen, setModelOpen] = useState<Boolean>(false)
  const close = () => setModelOpen(false)
  const open = () => setModelOpen(true)


  return (
    <main className='main-section items-center'>

      <AnimatePresence
        initial={false}
        mode='wait'
        onExitComplete={() => null}
      >
        {modelOpen &&
          <VerifyOtpModal
            text='verify email'
            handleClose={close}
          />
        }
      </AnimatePresence>

      <SignupForm
        role={roles.user}
        name={'Signup'}
        homePath='/'
        loginPath='/login'
        openModel={open}
      />
    </main>
  )
}

export default Signup
