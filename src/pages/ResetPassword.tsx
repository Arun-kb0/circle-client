import React, { useState } from 'react'
import ResetPwdForm from '../components/auth/ResetPwdForm'
import VerifyOtpModal from '../components/models/VerifyOtpModal'
import { AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectAuthResetStatus } from '../features/auth/authSlice'
import resetPassword from '../assets/resetPassword.png'

type Props = {}

const ResetPassword = (props: Props) => {
  const status = useSelector(selectAuthResetStatus)
  const [modelOpen, setModelOpen] = useState<Boolean>(false)
  const close = () => setModelOpen(false)
  const open = () => setModelOpen(true)


  return (
    <main className='main-section items-center min-h-screen bg-cover bg-center'
      style={{
        backgroundImage: `url(${resetPassword})`,
        backgroundSize: "contain", 
        backgroundRepeat: "no-repeat", 
        backgroundPosition: "center",
      }}
    >
      <div className='backdrop-blur-sm bg-white/30 p-4 rounded-md shadow-lg '>

        <AnimatePresence
          initial={false}
          mode='wait'
          onExitComplete={() => null}
        >
          {modelOpen && status === 'success' &&
            <VerifyOtpModal
              componentType='password'
              handleClose={close}
            />
          }
        </AnimatePresence>

        <ResetPwdForm
          openModel={open}
        />
      </div>
    </main>
  )
}

export default ResetPassword