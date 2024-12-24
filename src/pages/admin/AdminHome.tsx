import React from 'react'
import { FaUserXmark, FaUserCheck } from "react-icons/fa6";

type Props = {}

const AdminHome = (props: Props) => {

  const handleBlockUser = () => {
    console.log('block user')
  }

  return (
    <main className='main-section'>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User details
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Followee count
              </th>
              <th scope="col" className="px-6 py-3">
                Follower count
              </th>
              <th scope="col" className="px-6 py-3">
                Created at
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                <div className="ps-3">
                  <div className="text-base font-semibold">Neil Sims</div>
                  <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                </div>
              </th>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                </div>
              </td>
              <td className="px-6 py-4">
                React Developer
              </td>
              <td className="px-6 py-4">
                React Developer
              </td>
              <td className="px-6 py-4">
                React Developer
              </td>
              <td className="px-6 py-4">
                React Developer
              </td>
              <td className="px-6 py-4">
                {true
                  ? <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      <FaUserXmark/>
                    </span>
                  </button>
                  : <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      <FaUserCheck />
                    </span>
                  </button>
                }
              </td>
            </tr>

          </tbody>
        </table>

      </div>


    </main>
  )
}

export default AdminHome