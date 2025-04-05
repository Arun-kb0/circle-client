import { Route, Routes } from 'react-router-dom'
import { UserType } from '../constants/types'
import RequireAuth from '../components/RequireAuth'
import Home from '../pages/user/Home'
import ProfilePage from '../pages/user/ProfilePage'
import OtherUserProfilePage from '../pages/user/OtherUserProfilePage'
import GlobalFeed from '../pages/user/GlobalFeed'
import CreatePost from '../pages/user/CreatePost'
import EditPostPage from '../pages/user/EditPostPage'
import ChatPage from '../pages/user/ChatPage'
import FollowPeople from '../pages/user/FollowPeople'
import CropperPage from '../pages/user/CropperPage'
import GoLivePage from '../pages/user/GoLivePage'
import ViewLivePage from '../pages/user/ViewLivePage'
import WalletPage from '../pages/user/WalletPage'
import SavedPostsPage from '../pages/user/SavedPostsPage'
import FollowersPage from '../pages/user/FollowingPage'
import { roles } from '../constants/enums'
import NotFoundPage from '../pages/NotFoundPage'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import OtpModel from '../pages/OtpModel'
import ResetPassword from '../pages/ResetPassword'
import PaymentSuccessPage from '../pages/user/PaymentSuccessPage'
import PaymentFailedPage from '../pages/user/PaymentFailedPage'
import BlockedUsers from '../pages/user/BlockedUsers'

type Props = {
  user: UserType | undefined
}

const UserRoutes = ({ user }: Props) => {
  return (
    <Routes>

      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/verify' element={<OtpModel />} />
      <Route path='/resetPwd' element={<ResetPassword />} />
      <Route path='/payment-success' element={<PaymentSuccessPage />} />
      <Route path='/payment-failed' element={<PaymentFailedPage />} />

      <Route element={<RequireAuth role={roles.user} />} >
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/user-profile' element={<OtherUserProfilePage />} />
        <Route path='/global-feed' element={<GlobalFeed />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/edit-post' element={<EditPostPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/following' element={<FollowersPage userId={user?._id || ''} />} />
        <Route path='/follow-people' element={<FollowPeople />} />
        <Route path='/crop' element={<CropperPage />} />
        <Route path='/go-live' element={<GoLivePage />} />
        <Route path='/view-live' element={<ViewLivePage />} />
        <Route path='/wallet' element={<WalletPage />} />
        <Route path='/saved' element={<SavedPostsPage />} />
        <Route path='/blocked-users' element={<BlockedUsers />} />
      </Route>
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default UserRoutes