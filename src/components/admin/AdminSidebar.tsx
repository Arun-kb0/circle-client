import React from 'react'
import { FaRegUser } from "react-icons/fa6";
import { TbMessageCircle } from "react-icons/tb";
import { HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi2";
import { LuUserRoundPlus } from "react-icons/lu";
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
import { BsFileEarmarkPost } from 'react-icons/bs';

type Props = {}

const AdminSidebar = (props: Props) => {
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
              <Link to='/admin' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <HiOutlineUserGroup size={22} />
                <span className="ms-3">user</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/post' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <BsFileEarmarkPost size={22} />
                <span className="ms-3">post</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/post' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <LuUserRoundPlus size={22} />
                <span className="ms-3">Follow</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/chat' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <LuUserRoundPlus size={22} />
                <span className="ms-3">Follow</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/report' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <LuUserRoundPlus size={22} />
                <span className="ms-3">Follow</span>
              </Link>
            </SpringButton>
          </li>

        </ul>
      </div>
    </aside>
  )
}

export default AdminSidebar