import { useEffect, useState } from 'react'
import Avatar from '../../basic/Avatar'
import { RadioInputDataType, SubscriptionsType, UserType } from '../../../constants/types'
import { useMediaQuery } from 'react-responsive'
import CountUp from 'react-countup'
import SpringButton from '../../basic/SpringButton'
import { PiCrownSimpleFill } from 'react-icons/pi'
import { LuCrown } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import {
  clearUserSubscriptionPlan, resetPaymentStatus, selectPaymentStatus,
  selectPaymentSubscriptions, selectPaymentUserSubscriptionPlan
} from '../../../features/payment/paymentSlice'
import { selectAuthUser } from '../../../features/auth/authSlice'
import { selectUserCurrentUserFollowingIds } from '../../../features/user/userSlice'
import { createOrder, getUserSubscriptionPlan, subscribeWithWallet } from '../../../features/payment/paymentApi'
import PaymentSuccess from '../../basic/PaymentSuccess'
import PaymentFailed from '../../basic/PaymentFailed'
import { toast } from 'react-toastify'
import { followUser, unFollow } from '../../../features/user/userApi'
import RadioInputs from '../../basic/RadioInputs'
import { IoWallet } from 'react-icons/io5'
import phonePaySvg from '../../../assets/phonePay.svg'

type Props = {
  user: UserType
}

const UserDetails = ({ user }: Props) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' })
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const paymentStatus = useSelector(selectPaymentStatus)
  const currentUser = useSelector(selectAuthUser)
  const subscriptions = useSelector(selectPaymentSubscriptions)
  const plan = useSelector(selectPaymentUserSubscriptionPlan)
  const currentUserFollowingIds = useSelector(selectUserCurrentUserFollowingIds)

  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionsType['plan']>('monthly')
  const [subscriptionAmount, setSubscriptionAmount] = useState(200)
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    return Boolean(subscriptions.find(item => item.status === 'active' && item.subscriberToUserId === user._id))
  })
  const [isFollowing, setIsFollowing] = useState<boolean>(() => {
    return Boolean(currentUserFollowingIds.includes(user._id))
  })
  const [showPayBtns, setShowPayBtns] = useState<boolean>(false)

  const radioInputData: RadioInputDataType[] = [
    {
      id: 'monthly-id',
      name: 'radio-group',
      label: `monthly ₹${plan ? plan.monthly : 200}`,
      value: 'monthly'
    },
    {
      id: 'yearly-id',
      name: 'radio-group',
      label: `yearly ₹${plan ? plan.yearly : 1000}`,
      value: 'yearly'
    },
    {
      id: 'lifetime-id',
      name: 'radio-group',
      label: `lifetime ₹${plan ? plan.lifetime : 5000}`,
      value: 'lifetime'
    }
  ]


  const handlePayment = (type: "phone-pay" | "wallet") => {
    if (!currentUser) return
    const data = {
      subscriberUserId: currentUser._id,
      subscriberName: currentUser.name,
      subscriberEmail: currentUser.email,
      orderType: 'user-subscription',
      subscribedToUserId: user._id,
      subscribedToUserName: user.name,
      amount: subscriptionAmount,
      plan: subscriptionPlan
    }
    if (type === 'phone-pay') {
      dispatch(createOrder({ data })).unwrap()
    } else if (type === 'wallet') {
      dispatch(subscribeWithWallet({ data }))
    }
    setShowPayBtns(false)
  }

  useEffect(() => {
    setIsFollowing(Boolean(currentUserFollowingIds.includes(user._id)))
  }, [])

  useEffect(() => {
    if (paymentStatus === 'success') {
      toast(<PaymentSuccess />)
      setIsSubscribed(true)
    } else if (paymentStatus === 'failed') {
      toast(<PaymentFailed />)
    }
    dispatch(resetPaymentStatus())
  }, [paymentStatus])

  const handleRadioBtnClick = (value: string) => {
    setSubscriptionPlan(value as SubscriptionsType['plan'])
    switch (value as SubscriptionsType['plan']) {
      case 'monthly':
        setSubscriptionAmount(plan ? plan.monthly : 200)
        break
      case 'yearly':
        setSubscriptionAmount(plan ? plan.yearly : 1000)
        break
      case 'lifetime':
        setSubscriptionAmount(plan ? plan.lifetime : 5000)
        break
      default:
        console.error('invalid subscription plan')
    }
  }

  useEffect(() => {
    dispatch(clearUserSubscriptionPlan())
    dispatch(getUserSubscriptionPlan({ userId: user._id }))
  }, [dispatch, user._id])

  useEffect(() => {
    if (!plan) return
    setSubscriptionAmount(plan.monthly)
  }, [plan])

  const handleChatNav = () => {
    navigate('/chat')
  }

  const handleFollow = async () => {
    if (isFollowing) {
      await dispatch(unFollow(user._id))
    } else {
      await dispatch(followUser(user._id))
    }
    setIsFollowing(prev => !prev)
  }

  return (
    <section className='flex justify-center w-full'>
      <div>
        <div className="relative flex justify-center items-center">
          <Avatar
            image={user.image?.url}
            alt={user.name}
            userId={''}
            size={isSmallScreen ? 80 : 150}
            disableNavigation={true}
          />
        </div>
        <h5 className='text-center py-3 capitalize md:text-2xl sm:text-lg text-sm font-semibold'>{user?.name}</h5>
      </div>

      <div className='sm:px-10 px-2 flex flex-wrap justify-center items-center capitalize md:text-2xl sm:text-lg text-sm font-semibold'>
        <div className='space-y-4'>
          <div className='flex sm:gap-3 gap-1 justify-center items-center'>
            <div className='flex justify-center items-center gap-3'>
              <div>
                <h4 className='sm:text-4xl text-xl font-semibold text-center'>
                  <CountUp
                    end={user?.followerCount || 0}
                    duration={2}
                    separator=","
                  />
                </h4>
                <p className='sm:text-xl text-md'>Following</p>
              </div>
              <div>
                <h4 className='sm:text-4xl text-xl font-semibold text-center'>
                  <CountUp
                    end={user?.followeeCount || 0}
                    duration={2}
                    separator=","
                  />
                </h4>
                <p className='sm:text-xl text-md'>Followers</p>
              </div>
            </div>
          </div>

          {currentUser?._id !== user._id &&
            <div className='flex gap-1 justify-center items-center'>
              {isFollowing
                ? (
                  <SpringButton>
                    <button onClick={handleFollow} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg sm:text-sm text-xs sm:px-5 px-3 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Unfollow </button>
                  </SpringButton>
                ) : (
                  <SpringButton>
                    <button onClick={handleFollow} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg sm:text-sm text-xs sm:px-5 px-3 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Follow </button>
                  </SpringButton>
                )
              }
              {isFollowing && <SpringButton>
                <button onClick={handleChatNav} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg sm:text-sm text-xs sm:px-5 px-3 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Message </button>
              </SpringButton>
              }
              {isSubscribed
                ? (
                  <div className=' text-yellow-400 text-lg flex gap-1 items-center justify-center'>
                    <PiCrownSimpleFill size={20} />
                    subscribed
                  </div>
                ) : (
                  <SpringButton>
                    <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg sm:text-sm text-xs sm:px-5 px-3 py-2.5 text-center me-2 mb-2" onClick={() => setShowPayBtns(prev => !prev)}>
                      <div className='flex gap-1 items-center justify-center'>
                        <LuCrown size={20} />
                        subscribe
                      </div>
                    </button>
                  </SpringButton>
                )
              }

            </div>
          }

          {showPayBtns &&
            <section className='space-y-2 border border-gray-700 rounded-lg p-2'>
              <h4 className='text-lg py-3 font-semibold text-center capitalize'>Payment Details</h4>
              <div className='w-full h-0.5 bg-gray-700 my-2'></div>

              <h4 className='text-sm text-center py-2'>subscription plans</h4>
              <RadioInputs
                data={radioInputData}
                handleInputClick={handleRadioBtnClick}
              />
              <div className='w-full h-0.5 bg-gray-700 my-2'></div>

              <h4 className='text-sm text-center py-2'>payment methods</h4>
              <div className='flex gap-1 justify-center mr-2'>
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

            </section>
          }

        </div>
      </div>

    </section>

  )
}

export default UserDetails