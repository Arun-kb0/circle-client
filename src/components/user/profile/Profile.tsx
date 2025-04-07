import { useState } from 'react'
import ProfilePosts from './ProfilePosts'
import ProfileAbout from './ProfileAbout'
import { DropDownElementsType, UserType } from '../../../constants/types'
import FollowingPage from '../../../pages/user/FollowingPage'
import Followers from './Followers'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import { selectAuthUser } from '../../../features/auth/authSlice'
import { IoIosMore } from 'react-icons/io'
import DropDown from '../../basic/DropDown'
import { userToUserBlock, userToUserUnblock } from '../../../features/user/userApi'
import { selectUserBlockedAccounts } from '../../../features/user/userSlice'
import UserDetails from './UserDetails'


type Props = {
  user: UserType
}

const Profile = ({ user }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const currentUser = useSelector(selectAuthUser)
  const userBlockedAccounts = useSelector(selectUserBlockedAccounts)

  const [activeSection, setActiveSection] = useState<"posts" | "about" | "following" | "followers" | null>('posts')
  const [isBlockedAccountUser, setIsBlockedAccountUser] = useState<boolean>(() => {
    return Boolean(userBlockedAccounts.find(item => item.blockedUserId === user?._id))
  })
  const [openProfileDropdown, setOpenProfileDropdown] = useState<boolean>(false)

  const handleSectionClick = (section: "posts" | "about" | "following" | "followers") => {
    if (activeSection === section) return
    setActiveSection((prev) => (prev === section ? null : section))
  }


  const dropDownElements: DropDownElementsType[] = [
    {
      handler: () => {
        isBlockedAccountUser
          ? dispatch(userToUserUnblock(user?._id))
          : dispatch(userToUserBlock(user?._id))
        setIsBlockedAccountUser(prev => !prev)
        setOpenProfileDropdown(false)
      },
      name: isBlockedAccountUser ? 'Unblock' : 'Block',
    }
  ]


  return (
    <main className='space-y-8'>

      <UserDetails user={user} />

      {/* profile btns */}
      <section className="flex justify-center items-center">
        <div className="flex">
          <button onClick={() => handleSectionClick("posts")} className={`${activeSection === 'posts' ? 'border-teal-300' : 'border-transparent'} md:px-8 px-4 py-2 text-md font-medium text-gray-100 bg-transparent border-b-2 hover:bg-gray-800 hover:text-white hover:border-gray-900 transition duration-150 ease-in-out focus:outline-none`}>
            Posts
          </button>
          <button onClick={() => handleSectionClick("about")} className={`${activeSection === 'about' ? 'border-teal-300' : 'border-transparent'} md:px-8 px-4 py-2 text-md font-medium text-gray-100 bg-transparent border-b-2 hover:bg-gray-800 hover:text-white hover:border-gray-900 transition duration-150 ease-in-out focus:outline-none`}>
            About
          </button>
          <button onClick={() => handleSectionClick("followers")} className={`${activeSection === 'followers' ? 'border-teal-300' : 'border-transparent'} md:px-8 px-4 py-2 text-md font-medium text-gray-100 bg-transparent border-b-2 hover:bg-gray-800 hover:text-white hover:border-gray-900 transition duration-150 ease-in-out focus:outline-none`}>
            Followers
          </button>
          <button onClick={() => handleSectionClick("following")} className={`${activeSection === 'following' ? 'border-teal-300' : 'border-transparent'} md:px-8 px-4 py-2 text-md font-medium text-gray-100 bg-transparent border-b-2 hover:bg-gray-800 hover:text-white hover:border-gray-900 transition duration-150 ease-in-out focus:outline-none`} >
            Following
          </button>

          <div className='relative mx-1'>
            {currentUser?._id !== user._id &&
              <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => setOpenProfileDropdown(prev => !prev)} >
                <IoIosMore size={17} />
              </button>
            }
            <DropDown
              open={openProfileDropdown}
              elements={dropDownElements}
              position='right-0 top-10'
            />
          </div>

        </div>
      </section>

      {/* user data */}
      <section className='w-full flex justify-center'>
        {activeSection === 'posts' && <ProfilePosts userId={user._id} />}
        {activeSection === 'about' && <ProfileAbout user={user} />}
        {activeSection === 'following' && <FollowingPage userId={user._id} />}
        {activeSection === 'followers' && <Followers userId={user._id} />}
      </section>

    </main >
  )
}

export default Profile