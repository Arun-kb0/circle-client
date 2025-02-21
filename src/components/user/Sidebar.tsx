import React from 'react'
import { FaRegUser } from "react-icons/fa6";
import { TbMessageCircle } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";
import { LuUserRoundPlus } from "react-icons/lu";
import { CgMediaLive } from "react-icons/cg";
import { HiOutlineGift } from "react-icons/hi2";
import { IoBookmarkOutline } from "react-icons/io5";
import { PiArticleBold } from "react-icons/pi";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import SpringButton from '../basic/SpringButton';
import { Link, useNavigate } from 'react-router-dom';
import { clearFollowers, clearFollowing } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { clearUserCreatedPosts } from '../../features/post/postSlice';

type Props = {}

const Sidebar = (props: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleClearProfile = async () => {
    dispatch(clearUserCreatedPosts())
    dispatch(clearFollowers())
    dispatch(clearFollowing())
  }

  const handleNavigateToFollowing = async () => {
    await handleClearProfile()
    navigate('/following')
  }

  const handleNavigateToChat = async () => {
    await handleClearProfile()
    navigate('/chat')
  }

  return (
    <aside id="logo-sidebar" className="fixed top-14 left-0 z-40 lg:w-2/12 md:w-3/12 sm:w-3/12  h-screen pt-5 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <SpringButton>
              <Link to='/profile' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaRegUser size={22} />
                <span className="ms-3">Profile</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <button onClick={handleNavigateToFollowing} className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <HiOutlineUsers size={22} />
                <span className="ms-3">Following</span>
              </button>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/follow-people' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <LuUserRoundPlus size={22} />
                <span className="ms-3">Follow</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/view-live' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <CgMediaLive size={22} />
                <span className="ms-3">View live</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <IoBookmarkOutline size={22} />
                <span className="ms-3">Saved</span>
              </a>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <HiOutlineCalendarDateRange size={22} />
                <span className="ms-3">Memories</span>
              </a>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <HiOutlineGift size={22} />
                <span className="ms-3">Birthday</span>
              </a>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <PiArticleBold size={22} />
                <span className="ms-3">Global Feed</span>
              </a>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <button onClick={handleNavigateToChat}  className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <TbMessageCircle size={22} />
                <span className="ms-3">Messaging</span>
              </button>
            </SpringButton>
          </li>

        </ul>
      </div>
    </aside>
  )
}

export default Sidebar