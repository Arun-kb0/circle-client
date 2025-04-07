import { FaRegUser } from "react-icons/fa6";
import { TbMessageCircle } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";
import { LuUserRoundPlus } from "react-icons/lu";
import { CgMediaLive } from "react-icons/cg";
import { IoBookmarkOutline, IoWalletOutline } from "react-icons/io5";
import SpringButton from '../basic/SpringButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearFollowers, clearFollowing, selectUserNavOpen } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { clearUserCreatedPosts } from '../../features/post/postSlice';
import { RiUserForbidLine } from "react-icons/ri";


const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const navOpen = useSelector(selectUserNavOpen)
  const location = useLocation()

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
    <aside id="logo-sidebar" className={`nav-bg-color fixed top-14 left-0 z-40 lg:w-2/12 md:w-3/12 sm:w-3/12 h-screen pt-8 transition-transform duration-300 transform ${navOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Sidebar">
      <div className="h-full px-3 pb-4 overflow-y-auto ">
        <ul className="space-y-6 font-medium">
          <li>
            <SpringButton>
              <Link to='/profile' className={`${location.pathname === '/profile' ? 'sidebar-item-active' : 'sidebar-item-inactive'} sidebar-item group`}>
                <FaRegUser size={22} className='sidebar-item-icon group-hover:text-white'  />
                <span className="sidebar-item-text group-hover:text-white">Profile</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <button onClick={handleNavigateToFollowing} className={`${location.pathname === '/following' ? 'sidebar-item-active' : 'sidebar-item-inactive'} sidebar-item group`}>
                <HiOutlineUsers size={22} className='sidebar-item-icon group-hover:text-white' />
                <span className="sidebar-item-text group-hover:text-white">Following</span>
              </button>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/follow-people' className={`${location.pathname === '/follow-people' ? 'sidebar-item-active' : 'sidebar-item-inactive'} sidebar-item group`}>
                <LuUserRoundPlus size={22} className='sidebar-item-icon group-hover:text-white' />
                <span className="sidebar-item-text group-hover:text-white">Follow</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/view-live' className={`${location.pathname === '/view-live' ? 'sidebar-item-active' : 'sidebar-item-inactive'} sidebar-item group`}>
                <CgMediaLive size={22} className='sidebar-item-icon group-hover:text-white' />
                <span className="sidebar-item-text group-hover:text-white">View live</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/saved' className={`${location.pathname === '/saved' ? 'sidebar-item-active' : 'sidebar-item-inactive'} sidebar-item group`}>
                <IoBookmarkOutline size={22} className='sidebar-item-icon group-hover:text-white' />
                <span className="sidebar-item-text group-hover:text-white">Saved</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/wallet' className={`${location.pathname === '/wallet' ? 'sidebar-item-active' : 'sidebar-item-inactive'} sidebar-item group`}>
                <IoWalletOutline size={22} className='sidebar-item-icon group-hover:text-white' />
                <span className="sidebar-item-text group-hover:text-white">Wallet</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <button onClick={handleNavigateToChat} className={`${location.pathname === '/chat' ? 'sidebar-item-active' : 'sidebar-item-inactive'} sidebar-item group`}>
                <TbMessageCircle size={22} className='sidebar-item-icon group-hover:text-white' />
                <span className="sidebar-item-text group-hover:text-white">Chat</span>
              </button>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/blocked-users' className={`${location.pathname === '/blocked-users' ? 'sidebar-item-active' : 'sidebar-item-inactive'} sidebar-item group`}>
                <RiUserForbidLine size={22} className='sidebar-item-icon group-hover:text-white' />
                <span className="sidebar-item-text group-hover:text-white">Blocked</span>
              </Link>
            </SpringButton>
          </li>

        </ul>
      </div>
    </aside>

  )
}

export default Sidebar