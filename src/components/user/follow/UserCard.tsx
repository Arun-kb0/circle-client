import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { MdMoreHoriz } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { followUser, unFollow } from '../../../features/user/userApi';

type Props = {
  userId: string
  name: string
  image: string | undefined
  isFollowing: boolean
}

const UserCard = ({ userId, name, image, isFollowing }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleFollow = () => { dispatch(followUser(userId)) }
  const handleUnFollow = () => { dispatch(unFollow(userId)) }
  const handleRemove = () => { }
  const handleMessage = () => { }

  return (
    <article className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

      <div className="flex justify-end px-4 pt-4">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
          <span className="sr-only">Open dropdown</span>
          <MdMoreHoriz />
        </button>
        <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center pb-10">
        {image
          ? <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={image} alt="Bonnie image" />
          : <FaUserCircle size={35} />
        }
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
        {isFollowing
          ? <div className="flex mt-4 md:mt-6">
            <button onClick={handleUnFollow} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >unfollow</button>
            <button onClick={handleMessage} className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">message</button>
          </div>
          : <div className="flex mt-4 md:mt-6">
            <button onClick={handleFollow} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">follow</button>
            <button onClick={handleRemove} className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">remove</button>
          </div>
        }

      </div>

    </article>

  )
}

export default UserCard