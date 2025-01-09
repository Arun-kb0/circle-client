import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { BsBell } from "react-icons/bs";
import { TbHome } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { TbBrandInstagramFilled } from "react-icons/tb";
import SpringButton from '../basic/SpringButton';

type Props = {
  handleLogout: () => void
}

const UserNav = ({ handleLogout }: Props) => {

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
                <TbBrandInstagramFilled className='text-gray-200' size={25} />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <button type="button" className="flex text-sm bg rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  <SpringButton>
                    <TbHome className='text-gray-200 ' size={25} />
                  </SpringButton>
                </button>
              </div>
            </div>
            <div className="flex items-center ms-3">
              <div>
                <button type="button" className="flex text-sm bg rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  <SpringButton>
                    <FiSearch className='text-gray-200 ' size={25} />
                  </SpringButton>
                </button>
              </div>
            </div>


          </div>

          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <button type="button" className="flex text-sm bg rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  <SpringButton>
                    <BsBell className='text-gray-200 ' size={23} />
                  </SpringButton>
                </button>
              </div>
            </div>

            <div className="flex items-center ms-3">
              <div>
                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  <SpringButton>
                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                  </SpringButton>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default UserNav