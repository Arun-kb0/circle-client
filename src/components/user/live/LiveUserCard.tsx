import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { selectPaymentSubscriptions } from '../../../features/payment/paymentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getUser } from '../../../features/user/userApi'
import { clearUserCreatedPosts } from '../../../features/post/postSlice'
import { clearFollowers, clearFollowing } from '../../../features/user/userSlice'
import { AppDispatch } from '../../../app/store'

type Props = {
  userId: string
  name: string
  image: string | undefined
  handleViewLive: (userId: string) => void
}

const LiveUserCard = ({ userId, name, image, handleViewLive }: Props) => {
  const navigator = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const subscriptions = useSelector(selectPaymentSubscriptions)
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    return Boolean(subscriptions.find(item => item.subscriberToUserId === userId))
  })


  const handleClearProfile = async () => {
    dispatch(clearUserCreatedPosts())
    dispatch(clearFollowers())
    dispatch(clearFollowing())
  }
  const handleNavToProfile = async () => {
    await handleClearProfile()
    await dispatch(getUser(userId))
    navigator('/user-profile')
  }

  return (
    <div className=" max-w-sm w-52 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <div className='p-2' >
          {image
            ? <img className="w-24 h-24 mb-3 rounded-full object-cover shadow-lg" src={image} alt={name} />
            : <FaUserCircle className='w-24 h-24 mb-3 shadow-lg' />
          }
        </div>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
        <div className="flex justify-center items-center mt-4 md:mt-6">
          {isSubscribed
            ? (
              <button onClick={() => handleViewLive(userId)} className="capitalize text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Watch live
              </button>
            ) : (
              <button onClick={handleNavToProfile} className=" capitalize text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Subscribe to watch
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default LiveUserCard 