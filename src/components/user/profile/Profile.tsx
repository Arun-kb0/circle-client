import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import ProfilePosts from './ProfilePosts'
import ProfileAbout from './ProfileAbout'
import { UserType } from '../../../constants/types'
import FollowingPage from '../../../pages/user/FollowingPage'
import Followers from './Followers'
import SpringButton from '../../basic/SpringButton'
import { LuCrown } from 'react-icons/lu'
import { createOrder, subscribeWithWallet } from '../../../features/payment/paymentApi'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import { selectAuthUser } from '../../../features/auth/authSlice'
import { resetPaymentStatus, selectPaymentStatus, selectPaymentSubscriptions } from '../../../features/payment/paymentSlice'
import { PiCrownSimpleFill } from 'react-icons/pi'
import { IoWallet } from 'react-icons/io5'
import phonePaySvg from '../../../assets/phonePay.svg'
import { toast } from 'react-toastify'
import PaymentSuccess from '../../basic/PaymentSuccess'
import PaymentFailed from '../../basic/PaymentFailed'
import Avatar from '../../basic/Avatar'

type Props = {
  user: UserType
}

const Profile = ({ user }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const paymentStatus = useSelector(selectPaymentStatus)
  const currentUser = useSelector(selectAuthUser)
  const subscriptions = useSelector(selectPaymentSubscriptions)
  const [activeSection, setActiveSection] = useState<"posts" | "about" | "following" | "followers" | null>('posts')
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    return Boolean(subscriptions.find(item => item.status === 'active' && item.subscriberToUserId === user._id))
  })
  const [showPayBtns, setShowPayBtns] = useState<boolean>(false)

  const handleSectionClick = (section: "posts" | "about" | "following" | "followers") => {
    if (activeSection === section) return
    setActiveSection((prev) => (prev === section ? null : section))
  }


  const handlePayment = (type: "phone-pay" | "wallet") => {
    if (!currentUser) return
    const data = {
      subscriberUserId: currentUser._id,
      subscriberName: currentUser.name,
      subscriberEmail: currentUser.email,
      orderType: 'user-subscription',
      subscribedToUserId: user._id,
      subscribedToUserName: user.name,
      amount: 1000
    }
    if (type === 'phone-pay') {
      dispatch(createOrder({ data }))
    } else if (type === 'wallet') {
      dispatch(subscribeWithWallet({ data }))
    }
    setShowPayBtns(false)
  }

  useEffect(() => {
    dispatch(resetPaymentStatus())
  }, [])

  useEffect(() => {
    if (paymentStatus === 'success') {
      toast(<PaymentSuccess />)
      setIsSubscribed(true)
    } else if (paymentStatus === 'failed') {
      toast(<PaymentFailed />)
    }
  }, [paymentStatus])


  return (
    <main className='space-y-8'>
      {/* profile image */}
      <section className='flex justify-start w-full'>
        <div className="relative">
          <Avatar
            image={user.image?.url}
            alt={user.name}
            userId={''}
            size={200}
            disableNavigation={true}
          />
          <span className="top-10 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>

        <div className='px-10 flex justify-center items-center capitalize text-2xl font-semibold'>
          <div className='space-y-4'>
            <h5 className=''>{user?.name}</h5>
            <div className='flex flex-wrap gap-3 justify-center items-center'>
              <p>Following {user?.followerCount}</p>
              <p>Followers {user?.followeeCount}</p>

              {currentUser?._id !== user._id &&
                <div>
                  {isSubscribed
                    ? (
                      <div className=' text-yellow-400 text-lg flex gap-1 items-center justify-center'>
                        <PiCrownSimpleFill size={20} />
                        subscribed
                      </div>
                    )
                    : (
                      <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => setShowPayBtns(prev => !prev)}>
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
              }
            </div>

            {showPayBtns &&
              <div className='flex gap-1 justify-end mr-2'>
                <button className='cursor-pointer' onClick={() => handlePayment('phone-pay')}>
                  <SpringButton>
                    <img src={phonePaySvg} alt='phonePay icon' />
                  </SpringButton>
                </button>
                <button onClick={() => handlePayment('wallet')} className='text-green-500 cursor-pointer'>
                  <SpringButton>
                    <IoWallet size={38} />
                  </SpringButton>
                </button>
              </div>
            }

          </div>
        </div>

      </section>


      {/* profile buttons */}
      <div className='flex justify-center'>
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
      </div>

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