import  { useState } from 'react'
import ResetPwdForm from '../components/auth/ResetPwdForm'
import VerifyOtpModal from '../components/models/VerifyOtpModal'
import { AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectAuthResetStatus } from '../features/auth/authSlice'
import resetPassword from '../assets/resetPassword.png'


const ResetPassword = () => {
  const status = useSelector(selectAuthResetStatus)
  const [modelOpen, setModelOpen] = useState<Boolean>(false)
  const close = () => setModelOpen(false)
  const open = () => setModelOpen(true)


  return (
    <main className='relative overflow-hidden'>
      <div className='main-section items-center min-h-screen bg-cover bg-center'
        style={{
          backgroundImage: `url(${resetPassword})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >

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

        <div className='backdrop-blur-sm bg-white/30 p-4 rounded-md shadow-lg '>
          <ResetPwdForm
            openModel={open}
          />
        </div>
      </div>
    </main>
  )
}

export default ResetPassword