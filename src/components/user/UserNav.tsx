import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { BsBell } from "react-icons/bs";
import { TbHome } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import SpringButton from '../basic/SpringButton';
import { Link, useNavigate } from 'react-router-dom';
import BadgeButton from '../basic/BadgeButton';
import { AiOutlineMessage } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { selectChatUnreadMsgNotification } from '../../features/chat/chatSlice';
import DropDown from '../basic/DropDown';
import { DropDownElementsType } from '../../constants/types';
import { AppDispatch } from '../../app/store';
import { logout } from '../../features/auth/authApi';
import { selectAuthUser } from '../../features/auth/authSlice';
import { FaUserCircle } from 'react-icons/fa';
import { clearUserCreatedPosts } from '../../features/post/postSlice';
import { clearFollowers, clearFollowing } from '../../features/user/userSlice';
import logo from '../../assets/vite.png'
import Notifications from '../notification/Notifications';
import IncomingCallAnimation from '../basic/IncomingCallAnimation';


type Props = {
  handleLogout: () => void
}

const UserNav = ({ handleLogout }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectAuthUser)
  const unreadNotificationCount = useSelector(selectChatUnreadMsgNotification)

  const [userDropDown, setUserDropDown] = useState(false)
  const [notificationDropDown, setNotificationDropDown] = useState(false)
  
  const [callState, setCallState] = useState<'ring' | 'end'>('ring')
  const [showIncomingCall, setShowIncomingCall] = useState<boolean>(false)

  const handleClearProfile = async () => {
    dispatch(clearUserCreatedPosts());
    dispatch(clearFollowers());
    dispatch(clearFollowing());
  }

  const userDropDownElements: DropDownElementsType[] = [
    {
      handler: async () => {
        await handleClearProfile()
        navigate('/profile')
      },
      name: "profile"
    },
    {
      handler: () => { dispatch(logout()) },
      name: 'logout'
    }
  ]

  const handleIncomingCall = () => {
    navigate('/chat')
  }

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">

          <div className="flex items-center">
            <button className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <SpringButton>
                <RxHamburgerMenu size={22} />
              </SpringButton>
            </button>

            <div className="flex items-center ms-3">
              <div>
                <img className='w-10 h-10 object-cover' src={logo} alt="" />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <Link to='/' className="flex text-sm bg rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" >
                  <SpringButton>
                    <TbHome className='text-gray-200 ' size={25} />
                  </SpringButton>
                </Link>
              </div>
            </div>
            <div className="flex items-center ms-3">
              <div>
                <Link to='/' className="flex text-sm bg rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" >
                  <SpringButton>
                    <FiSearch className='text-gray-200 ' size={25} />
                  </SpringButton>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center">

            {/* incoming call */}
            <div className="flex items-center ms-3 relative">
              {showIncomingCall &&
                <a onClick={handleIncomingCall}>
                  <IncomingCallAnimation state={callState} />
                </a>
              }
            </div>

            <div className="flex items-center ms-3 relative">
              <div>
                <button onClick={() => setNotificationDropDown(prev => !prev)} className="flex text-sm bg rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" >
                  <SpringButton>
                    <BsBell className='text-gray-200 ' size={23} />
                  </SpringButton>
                </button>
                <Notifications
                  open={notificationDropDown}
                  position='right-1'
                />
              </div>
            </div>

            <div className="flex items-center ms-3">
              <div>
                <Link to='/chat' className="flex text-sm bg rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" >
                  <SpringButton>
                    <BadgeButton
                      count={unreadNotificationCount}
                      icon={<AiOutlineMessage className='text-gray-200 ' size={23} />}
                    />
                  </SpringButton>
                </Link>
              </div>
            </div>

            <div className="flex items-center ms-3 relative ">
              <div>
                <button onClick={() => setUserDropDown(prev => !prev)} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" >
                  <SpringButton>
                    {user?.image?.url
                      ? <img className="w-8 h-8 rounded-full object-cover" src={user.image.url} alt="Neil image" />
                      : <FaUserCircle size={35} />
                    }
                  </SpringButton>
                </button>
              </div>
              <DropDown
                open={userDropDown}
                elements={userDropDownElements}
                position='top-10 right-0'
              />
            </div>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default UserNav