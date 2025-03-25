import { Route, Routes } from 'react-router-dom'
import RequireAuth from '../components/RequireAuth'
import { roles } from '../constants/enums'
import AdminHome from '../pages/admin/AdminHome'
import UserManagement from '../pages/admin/UserManagement'
import PostManagement from '../pages/admin/PostManagement'
import ReportManagement from '../pages/admin/ReportManagement'
import SubscriptionManagement from '../pages/admin/SubscriptionManagement'
import WalletTransactionsManagement from '../pages/admin/WalletTransactionsManagement'
import NotFoundPage from '../pages/NotFoundPage'
import AdminLogin from '../pages/AdminLogin'
import AdminSignup from '../pages/AdminSignup'


const AdminRoutes = () => {
  return (
    <Routes>

      <Route path='/login' element={<AdminLogin />} />
      <Route path='/signup' element={<AdminSignup />} />

      <Route element={<RequireAuth role={roles.admin} />} >
        <Route path='/'>
          <Route index element={<AdminHome />} />
          <Route path='user' element={<UserManagement />} />
          <Route path='post' element={<PostManagement />} />
          <Route path='report' element={<ReportManagement />} />
          <Route path='subscription' element={<SubscriptionManagement />} />
          <Route path='transaction-wallet' element={<WalletTransactionsManagement />} />
        </Route>
      </Route>
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AdminRoutes