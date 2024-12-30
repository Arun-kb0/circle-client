import React, { useEffect, useState } from 'react'
import VerifyOtpModal from '../components/models/VerifyOtpModal'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {}

const OtpModel = (props: Props) => {
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
            text='this is modal'
            handleClose={close}
          />
        }
      </AnimatePresence>
    </>

    // <section className="w-screen h-screen flex justify-center items-center">
    //   <div
    //     id="small-modal"
    //     className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
    //   >
    //     <div className="relative w-full max-w-md">
    //       {/* Modal content */}
    //       <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
    //         {/* Modal header */}
    //         <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
    //           <h3 className="text-xl font-medium text-gray-900 dark:text-white">
    //             Small modal
    //           </h3>
    //           <button
    //             type="button"
    //             className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
    //             data-modal-hide="small-modal"
    //           >
    //             <svg
    //               className="w-3 h-3"
    //               aria-hidden="true"
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 14 14"
    //             >
    //               <path
    //                 stroke="currentColor"
    //                 stroke-linecap="round"
    //                 stroke-linejoin="round"
    //                 stroke-width="2"
    //                 d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
    //               />
    //             </svg>
    //             <span className="sr-only">Close modal</span>
    //           </button>
    //         </div>
    //         {/* Modal body */}
    //         <div className="p-4 md:p-5 space-y-4">
    //           <div>
    //             <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
    //             <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
    //           </div>
    //         </div>
    //         {/* Modal footer */}
    //         <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
    //           <button
    //             data-modal-hide="small-modal"
    //             type="button"
    //             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //           >
    //             I accept
    //           </button>
    //           <button
    //             data-modal-hide="small-modal"
    //             type="button"
    //             className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    //           >
    //             Decline
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

  )
}

export default OtpModel