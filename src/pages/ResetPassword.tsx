import React, { useState } from 'react'
import ResetPwdForm from '../components/auth/ResetPwdForm'
import VerifyOtpModal from '../components/models/VerifyOtpModal'
import { AnimatePresence } from 'framer-motion'

type Props = {}

const ResetPassword = (props: Props) => {
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
            componentType='password'
            handleClose={close}
          />
        }
      </AnimatePresence>

      <ResetPwdForm
        openModel={open}
      />
    </main>
  )
}

export default ResetPassword