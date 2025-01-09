import React from 'react'
import { FaRegUser  } from "react-icons/fa6";
import { TbMessageCircle } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";
import { LuUserRoundPlus } from "react-icons/lu";
import { HiOutlineGift } from "react-icons/hi2";
import { IoBookmarkOutline } from "react-icons/io5";
import { PiArticleBold } from "react-icons/pi";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <aside id="logo-sidebar" className="fixed top-14 left-0 z-40 lg:w-2/12 md:w-3/12 sm:w-4/12  h-screen pt-5 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <FaRegUser  />
              <span className="ms-3">Profile</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <HiOutlineUsers  />
              <span className="ms-3">Following</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <LuUserRoundPlus  />
              <span className="ms-3">Follow</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <IoBookmarkOutline  />
              <span className="ms-3">Saved</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <HiOutlineCalendarDateRange  />
              <span className="ms-3">Memories</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <HiOutlineGift />
              <span className="ms-3">Birthday</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <PiArticleBold />
              <span className="ms-3">Global Feed</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <TbMessageCircle  />
              <span className="ms-3">Messaging</span>
            </a>
          </li>
          
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar