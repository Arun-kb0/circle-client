import { useState } from 'react'
import ResetPwdForm from '../components/auth/ResetPwdForm'
import VerifyOtpModal from '../components/models/VerifyOtpModal'
import { AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectAuthResetStatus } from '../features/auth/authSlice'
import resetPasswordImg from '../assets/resetPassword.png'



const ResetPassword = () => {
  const status = useSelector(selectAuthResetStatus)
  const [modelOpen, setModelOpen] = useState<Boolean>(false)
  const close = () => setModelOpen(false)
  const open = () => setModelOpen(true)


  return (
    <main
      className="flex items-center justify-center min-h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${resetPasswordImg})` }}
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

      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-4xl mx-auto p-8 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Side: Intro */}
          <div className="space-y-4 px-4">
            <h1 className="text-4xl font-extrabold text-gray-900">Reset Password</h1>
            <p className="text-lg text-gray-700">
              Can’t remember your password? Reset it now.
            </p>
          </div>

          {/* Right Side: Login Form */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <ResetPwdForm
                openModel={open}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ResetPassword