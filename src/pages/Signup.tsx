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
    <main className='main-section items-center min-h-screen bg-cover bg-center' style={{
      backgroundImage: `url(${signupImage})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat", 
      backgroundPosition: "center",
    }}>

      <div className='backdrop-blur-sm bg-white/30 p-4 rounded-md shadow-lg '>
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

        <SignupForm
          role={roles.user}
          name={'Signup'}
          homePath='/'
          loginPath='/login'
          openModel={open}
        />
      </div>
    </main>
  )
}

export default Signup
