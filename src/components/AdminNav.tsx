import { useNavigate } from 'react-router-dom'
import SpringButton from './basic/SpringButton'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../app/store'
import { selectAuthUser } from '../features/auth/authSlice'
import { useState } from 'react'
import { DropDownElementsType } from '../constants/types'
import { logout } from '../features/auth/authApi'
import { RxHamburgerMenu } from 'react-icons/rx'
import { BsBell } from 'react-icons/bs'
import DropDown from './basic/DropDown'
import logo from '../assets/vite.png'
import { selectUserNavOpen, setUserNavOpen } from '../features/user/userSlice'
import Avatar from './basic/Avatar'


type Props = {
  handleLogout: () => void
}

const AdminNav = ({  }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectAuthUser)
  const navOpen = useSelector(selectUserNavOpen)

  const [userDropDown, setUserDropDown] = useState(false)
  const [_, setNotificationDropDown] = useState(false)

  const userDropDownElements: DropDownElementsType[] = [
    {
      handler: async () => {
        await dispatch(logout()).unwrap()
        navigate('/login')
      },
      name: 'logout'
    }
  ]


  const handleUserNavOpen = () => {
    dispatch(setUserNavOpen(!navOpen))
  }



  return (
    // <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <nav className="fixed top-0 z-50 w-full text-white font-sans ">

      <div className="px-3 py-3 lg:px-5 lg:pl-3 nav-bg-color">
        <div className="flex items-center justify-between">

          <div className="flex items-center">
            <button onClick={handleUserNavOpen} className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
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
           
          </div>

          <div className="flex items-center">

            <div className="flex items-center ms-3 relative">
              <div>
                <button onClick={() => setNotificationDropDown(prev => !prev)} className="flex text-sm bg rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" >
                  <SpringButton>
                    <BsBell className='text-gray-200 ' size={23} />
                  </SpringButton>
                </button>
              </div>
            </div>

            <div className="flex items-center ms-3 relative ">
              <div>
                <button onClick={() => setUserDropDown(prev => !prev)} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" >
                  <SpringButton>
                    <Avatar
                      userId={''}
                      image={user?.image?.url}
                      alt={user?.name}
                      disableNavigation={true}
                    />
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

export default AdminNav