import { useState } from 'react'
import SignupForm from '../components/auth/SignupForm'
import { roles } from '../constants/enums'
import { AnimatePresence } from 'framer-motion'
import VerifyOtpModal from '../components/models/VerifyOtpModal'
import { useSelector } from 'react-redux'
import { selectAuthStatus } from '../features/auth/authSlice'
import usersImage from '../assets/users.png'

const Signup = () => {
  const status = useSelector(selectAuthStatus)
  const [modelOpen, setModelOpen] = useState<Boolean>(false)
  const close = () => setModelOpen(false)
  const open = () => setModelOpen(true)


  return (

    <main
      className="flex items-center justify-center min-h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${usersImage})` }}
    >

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

      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-4xl mx-auto p-8 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Side: Intro */}
          <div className="space-y-4 px-4">
            <h1 className="text-4xl font-extrabold text-gray-900">Welcome to Circle</h1>
            <p className="text-lg text-gray-700">
              Engage with friends through instant chat, share your moments with posts, and connect via video & audio calls. Go live anytime to stream your experiences to your community.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Instant text and group chat</li>
              <li>Create and share posts</li>
              <li>High-quality video & audio calls</li>
              <li>Live streaming for your followers</li>
            </ul>
          </div>

          {/* Right Side: Signup Form */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <SignupForm
                role={roles.user}
                name={'Circle Signup'}
                homePath='/'
                loginPath='/login'
                openModel={open}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Signup
