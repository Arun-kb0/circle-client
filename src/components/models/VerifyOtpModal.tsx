import React, { useEffect, useState } from 'react'
import BackdropVerifyOtp from '../backdrop/BackdropVerifyOtp'
import { motion, useForceUpdate } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { resendOtp, verifyEmail } from '../../features/auth/authApi'
import { AppDispatch } from '../../app/store'
import { FieldValue, FieldValues, useForm } from 'react-hook-form'

type Props = {
  text: string
  handleClose: () => void
}

const VerifyOtpModal = ({ text, handleClose }: Props) => {
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      y: "100vh",
      opacity: 1
    }
  }

  const dispatch = useDispatch<AppDispatch>()
  const [timeLeft, setTimeLeft] = useState(120)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset: resetForm
  } = useForm()

  useEffect(() => {
    if (timeLeft <= 0) return
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000);
    return () => clearInterval(interval)
  }, [timeLeft])

  const handleResend = () => {
    dispatch(resendOtp())
    resetForm()
    setTimeLeft(120)
  }
  const handleVerify = (data: FieldValues) => {
    dispatch(verifyEmail(data.otp))
  }



  return (
    <BackdropVerifyOtp onClick={handleClose}>
      <motion.div
        className=''
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="relative p-4 w-full  max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <form onSubmit={handleSubmit(handleVerify)} className="p-4 md:p-5 text-center space-y-3">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Enter OTP</h3>
              <div>
                <input
                  type="number"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register('otp', {
                    required: 'otp required',
                    pattern: {
                      value: /^\d{4}$/,
                      message: 'otp must be 4 digits number'
                    }
                  })}
                />
                {errors.otp &&
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> {String(errors.otp.message)}</p>
                }
              </div>
              <button type='submit' data-modal-hide="popup-modal" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                Verify email
              </button>
              <button
                onClick={handleResend}
                disabled={timeLeft !== 0}
                data-modal-hide="popup-modal"
                type="button"
                className="min-w-[110px] py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                {timeLeft === 0 ? "Resend" : `${timeLeft} sec`}
              </button>
            </form>
          </div>
        </div>

      </motion.div>

    </BackdropVerifyOtp>
  )
}

export default VerifyOtpModal