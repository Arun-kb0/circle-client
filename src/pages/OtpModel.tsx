import  { useEffect, useState } from 'react'
import VerifyOtpModal from '../components/models/VerifyOtpModal'
import { AnimatePresence, motion } from 'framer-motion'


const OtpModel = () => {
  const [modelOpen, setModelOpen] = useState<Boolean>(false)
  const close = () => setModelOpen(false)
  const open = () => setModelOpen(true)

  useEffect(() => {
    console.log("modelOpen = ", modelOpen)
  }, [modelOpen])

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className='p-1 bg-blue-200 rounded m-2'
        onClick={open}
      >
        Lunch modal
      </motion.button>


      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={() => null}
      >
        {modelOpen &&
          <VerifyOtpModal
            componentType='email'
            handleClose={close}
          />
        }
      </AnimatePresence>
    </>

  )
}

export default OtpModel