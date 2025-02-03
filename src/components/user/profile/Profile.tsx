import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import ProfilePosts from './ProfilePosts'
import ProfileAbout from './ProfileAbout'
import { UserType } from '../../../constants/types'
import FollowingPage from '../../../pages/user/FollowingPage'
import Followers from './Followers'

type Props = {
  user: UserType
}

const Profile = ({ user }: Props) => {
  const [activeSection, setActiveSection] = useState<"posts" | "about" | "following" | "followers" | null>('posts')

  const handleSectionClick = (section: "posts" | "about" | "following" | "followers") => {
    if (activeSection === section) return
    setActiveSection((prev) => (prev === section ? null : section))
  }


  return (
    <main className='space-y-8'>
      {/* profile image */}
      <section className='flex justify-start w-full'>
        <div className="relative">
          {user?.image?.url
            ? <img className=" h-72 w-72 rounded-full object-cover" src={user?.image?.url} alt={user?.name} />
            : <FaUserCircle className='h-48 w-48' />
          }
          <span className="top-14 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>
        <div className='px-10 flex gap-3 justify-center items-center text-2xl font-semibold '>
          <p>Following {user?.followerCount}</p>
          <p>Followers {user?.followeeCount}</p>
        </div>
      </section>
      <section className='flex justify-start w-full'>
        <h5 className='text-lg font-semibold'>{user?.name}</h5>
      </section>

      {/* profile buttons */}
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

      {/* user data */}
      <section className='w-full flex justify-center'>
        {activeSection === 'posts' && <ProfilePosts userId={user._id} />}
        {activeSection === 'about' && <ProfileAbout />}
        {activeSection === 'following' && <FollowingPage userId={user._id} />}
        {activeSection === 'followers' && <Followers userId={user._id} />}
      </section>

    </main >
  )
}

export default Profile