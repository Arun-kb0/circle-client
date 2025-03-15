import React, { useState } from 'react'
import SignupForm from '../components/auth/SignupForm'
import { roles } from '../constants/enums'
import { AnimatePresence } from 'framer-motion'
import VerifyOtpModal from '../components/models/VerifyOtpModal'
import { useSelector } from 'react-redux'
import { selectAuthStatus } from '../features/auth/authSlice'
import signupImage from '../assets/signupImage.png'

const Signup = () => {
  const status = useSelector(selectAuthStatus)
  const [modelOpen, setModelOpen] = useState<Boolean>(false)
  const close = () => setModelOpen(false)
  const open = () => setModelOpen(true)


  return (
    <main className='relative overflow-hidden'>
      <div className='main-section items-center min-h-screen bg-cover bg-center' style={{
        backgroundImage: `url(${signupImage})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>
        <AnimatePresence
          initial={false}
          mode='wait'
          onExitComplete={() => null}
        >
          {modelOpen && status === 'success' &&
            <VerifyOtpModal
              componentType='email'
              handleClose={close}
            />
          }
        </AnimatePresence>

        <div className='backdrop-blur-sm bg-white/30 p-4 rounded-md shadow-lg '>
          <SignupForm
            role={roles.user}
            name={'Circle Signup'}
            homePath='/'
            loginPath='/login'
            openModel={open}
          />
        </div>

      </div>
    </main>
  )
}

export default Signup
