import { TbReportAnalytics } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuLayoutDashboard, LuUserRoundPlus } from "react-icons/lu";
import SpringButton from '../basic/SpringButton';
import { Link } from 'react-router-dom';
import { selectUserNavOpen } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';
import { BsFileEarmarkPost } from 'react-icons/bs';


const AdminSidebar = () => {
  // const navigate = useNavigate()
  // const dispatch = useDispatch<AppDispatch>()
  const navOpen = useSelector(selectUserNavOpen)

  // const handleClearProfile = async () => {
  //   dispatch(clearUserCreatedPosts())
  //   dispatch(clearFollowers())
  //   dispatch(clearFollowing())
  // }

  // const handleNavigateToFollowing = async () => {
  //   await handleClearProfile()
  //   navigate('/following')
  // }

  // const handleNavigateToChat = async () => {
  //   await handleClearProfile()
  //   navigate('/chat')
  // }

  return (
    <aside id="logo-sidebar" className={`nav-bg-color fixed top-14 left-0 z-40 lg:w-2/12 md:w-3/12 sm:w-3/12 h-screen pt-8 transition-transform duration-300 transform ${navOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Sidebar">
      <div className="h-full px-3 pb-4 overflow-y-auto ">
        <ul className="space-y-6 font-medium">
          <li>
            <SpringButton>
              <Link to='/admin/' className={`${location.pathname === '/admin/' ? 'sidebar-item-active' : 'sidebar-item-inactive'} sidebar-item group`}>
                <LuLayoutDashboard size={22} className='sidebar-item-icon group-hover:text-white' />
                <span className="sidebar-item-text group-hover:text-white">dashboard</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/user' className={`${location.pathname === '/admin/user' ? 'sidebar-item-active' : 'sidebar-item-inactive'} sidebar-item group`}>
                <HiOutlineUserGroup size={22} className='sidebar-item-icon group-hover:text-white' />
                <span className="sidebar-item-text group-hover:text-white">user</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/post' className={`${location.pathname === '/admin/post' ? 'sidebar-item-active' : 'sidebar-item-inactive'} sidebar-item group`}>
                <BsFileEarmarkPost size={22} className='sidebar-item-icon group-hover:text-white' />
                <span className="sidebar-item-text group-hover:text-white">post</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/report' className={`${location.pathname === '/admin/report' ? 'sidebar-item-active' : 'sidebar-item-inactive'} sidebar-item group`}>
                <TbReportAnalytics size={22} className='sidebar-item-icon group-hover:text-white' />
                <span className="sidebar-item-text group-hover:text-white">Report</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/subscription' className={`${location.pathname === '/admin/subscription' ? 'sidebar-item-active' : 'sidebar-item-inactive'} sidebar-item group`}>
                <LuUserRoundPlus size={22} className='sidebar-item-icon group-hover:text-white' />
                <span className="sidebar-item-text group-hover:text-white">Subscriptions</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/transaction-wallet' className={`${location.pathname === '/admin/transaction-wallet' ? 'sidebar-item-active' : 'sidebar-item-inactive'} sidebar-item group`}>
                <LuUserRoundPlus size={22} className='sidebar-item-icon group-hover:text-white' />
                <span className="sidebar-item-text group-hover:text-white">wallet transactions</span>
              </Link>
            </SpringButton>
          </li>

        </ul>
      </div>
    </aside>
  )
}

export default AdminSidebar