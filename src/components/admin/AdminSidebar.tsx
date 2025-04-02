import { TbReportAnalytics } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuLayoutDashboard, LuUserRoundPlus } from "react-icons/lu";
import SpringButton from '../basic/SpringButton';
import { Link } from 'react-router-dom';
import {  selectUserNavOpen } from '../../features/user/userSlice';
import {  useSelector } from 'react-redux';
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
        <ul className="space-y-2 font-medium">
          <li>
            <SpringButton>
              <Link to='/admin/' className={`${location.pathname === '/admin/' ? 'bg-gray-700' : "hover:bg-gray-700"} flex w-full items-center p-2 rounded-lg text-white group`}>
                <LuLayoutDashboard size={22} />
                <span className="ms-3 capitalize">dashboard</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/user' className={`${location.pathname === '/admin/user' ? 'bg-gray-700' : "hover:bg-gray-700"} flex w-full items-center p-2 rounded-lg text-white group`}>
                <HiOutlineUserGroup size={22} />
                <span className="ms-3">user</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/post' className={`${location.pathname === '/admin/post' ? 'bg-gray-700' : "hover:bg-gray-700"} flex w-full items-center p-2 rounded-lg text-white group`}>
                <BsFileEarmarkPost size={22} />
                <span className="ms-3">post</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/report' className={`${location.pathname === '/admin/report' ? 'bg-gray-700' : "hover:bg-gray-700"} flex w-full items-center p-2 rounded-lg text-white group`}>
                <TbReportAnalytics size={22} />
                <span className="ms-3">Report</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/subscription' className={`${location.pathname === '/admin/subscription' ? 'bg-gray-700' : "hover:bg-gray-700"} flex w-full items-center p-2 rounded-lg text-white group`}>
                <LuUserRoundPlus size={22} />
                <span className="ms-3">Subscriptions</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/transaction-wallet' className={`${location.pathname === '/admin/transaction-wallet' ? 'bg-gray-700' : "hover:bg-gray-700"} flex w-full items-center p-2 rounded-lg text-white group`}>
                <LuUserRoundPlus size={22} />
                <span className="ms-3">wallet transactions</span>
              </Link>
            </SpringButton>
          </li>

        </ul>
      </div>
    </aside>
  )
}

export default AdminSidebar