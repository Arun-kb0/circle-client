import React from 'react'
import { StateType, UserType } from '../constants/types'
import moment from 'moment'
import { FaUserCheck, FaUserXmark } from 'react-icons/fa6'
import Avatar from './basic/Avatar'

type Props = {
  users: UserType[]
  status: StateType,
  handleBlock: (userId: string) => void
  handleUnblock: (userId: string) => void
  currentPage: number
  numberOfPages: number
}

const UserTable = ({ users, status, handleBlock, handleUnblock }: Props) => {

  return (
    <section className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">User details</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Location</th>
            <th scope="col" className="px-6 py-3">Followee count</th>
            <th scope="col" className="px-6 py-3">Follower count</th>
            <th scope="col" className="px-6 py-3">Created at</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <Avatar
                  image={user.image?.url}
                  alt={user.name}
                  userId={user._id}
                  disableNavigation={true}
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">{user.name}</div>
                  <div className="font-normal text-gray-500">{user.email}</div>
                </div>
              </th>
              <td className="px-6 py-4">
                {user.isOnline
                  ? <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                    Online
                  </div>
                  : <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                    Offline
                  </div>
                }
              </td>
              <td className="px-6 py-4">
                {user.location}
              </td>
              <td className="px-6 py-4">
                {user.followeeCount}
              </td>
              <td className="px-6 py-4">
                {user.followerCount}
              </td>
              <td className="px-6 py-4">
                {moment(user.createdAt).format('MMM Do YYYY, h:mm A')}
              </td>
              <td className="px-6 py-4">
                {user.status === 'active'
                  ? <button onClick={() => handleBlock(user._id)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      <FaUserXmark size={17} />
                    </span>
                  </button>
                  : <button onClick={() => handleUnblock(user._id)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      <FaUserCheck size={17} />
                    </span>
                  </button>
                }
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </section>
  )
}

export default UserTable