import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import ProfilePosts from './ProfilePosts'
import ProfileAbout from './ProfileAbout'
import { UserType } from '../../../constants/types'
import FollowingPage from '../../../pages/user/FollowingPage'
import Followers from './Followers'
import SpringButton from '../../basic/SpringButton'
import { LuCrown } from 'react-icons/lu'
import { createOrder } from '../../../features/payment/paymentApi'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import { selectAuthUser } from '../../../features/auth/authSlice'
import { selectPaymentSubscriptions } from '../../../features/payment/paymentSlice'
import { PiCrownSimpleFill } from 'react-icons/pi'

type Props = {
  user: UserType
}

const Profile = ({ user }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector(selectAuthUser)
  const subscriptions = useSelector(selectPaymentSubscriptions)
  const [activeSection, setActiveSection] = useState<"posts" | "about" | "following" | "followers" | null>('posts')
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    return Boolean(subscriptions.find(item => item.subscriberToUserId === user._id))
  })

  const handleSectionClick = (section: "posts" | "about" | "following" | "followers") => {
    if (activeSection === section) return
    setActiveSection((prev) => (prev === section ? null : section))
  }


  const handlePayment = () => {
    if (!currentUser) return
    const data = {
      subscriberUserId: currentUser._id,
      subscriberName: currentUser.name,
      subscriberEmail: currentUser.email,
      orderType: 'user-subscription',
      subscribedToUserId: user._id,
      subscribedToUserName: user.name,
      amount: 1000
      // mobileNumber: ,
    }
    dispatch(createOrder({ data }))
  }

  


  return (
    <main className='space-y-8'>
      {/* profile image */}
      <section className='flex justify-start w-full'>
        <div className="relative">
          {user?.image?.url
            ? <img className="h-72 w-72 rounded-full object-cover" src={user?.image?.url} alt={user?.name} />
            : <FaUserCircle className='h-72 w-72 rounded-full object-cover' />
          }
          <span className="top-14 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>

        <div className='px-10 flex justify-center items-center capitalize text-2xl font-semibold'>
          <div className='space-y-4'>
            <h5 className=''>{user?.name}</h5>
            <div className='flex flex-wrap gap-3 justify-center items-center'>
              <p>Following {user?.followerCount}</p>
              <p>Followers {user?.followeeCount}</p>
              {user._id !== currentUser?._id &&
                isSubscribed
                ? (
                  <div className=' text-yellow-400 text-lg flex gap-1 items-center justify-center'>
                    <PiCrownSimpleFill size={20} />
                    subscribed
                  </div>
                )
                : (
                  <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handlePayment}>
                    <SpringButton>
                      <div className='flex gap-1 items-center justify-center'>
                        <LuCrown size={20} />
                        subscribe
                      </div>
                    </SpringButton>
                  </button>
                )

              }
            </div>
          </div>
        </div>

      </section>

      {/* profile buttons */}
      <section className="inline-flex rounded-md shadow-sm" role="group">
        <button onClick={() => handleSectionClick('posts')} className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
          Post
        </button>
        <button onClick={() => handleSectionClick('about')} className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
          About
        </button>
        <button onClick={() => handleSectionClick('followers')} className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900  hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
          Followers
        </button>
        <button onClick={() => handleSectionClick('following')} className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
          Following
        </button>

      </section>

      {/* user data */}
      <section className='w-full flex justify-center'>
        {activeSection === 'posts' && <ProfilePosts userId={user._id} />}
        {activeSection === 'about' && <ProfileAbout user={user} />}
        {activeSection === 'following' && <FollowingPage userId={user._id} />}
        {activeSection === 'followers' && <Followers userId={user._id} />}
      </section>

    </main >
  )
}

export default Profile