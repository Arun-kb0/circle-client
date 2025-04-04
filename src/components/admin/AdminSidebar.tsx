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
              <Link to='/admin/' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <LuLayoutDashboard size={22} />
                <span className="ms-3 capitalize">dashboard</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/user' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <HiOutlineUserGroup size={22} />
                <span className="ms-3">user</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/post' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <BsFileEarmarkPost size={22} />
                <span className="ms-3">post</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/report' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <TbReportAnalytics size={22} />
                <span className="ms-3">Report</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/subscription' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <LuUserRoundPlus size={22} />
                <span className="ms-3">Subscriptions</span>
              </Link>
            </SpringButton>
          </li>
          <li>
            <SpringButton>
              <Link to='/admin/transaction-wallet' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
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