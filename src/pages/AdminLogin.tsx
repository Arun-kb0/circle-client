import LoginFrom from '../components/auth/LoginFrom'
import { roles } from '../constants/enums'
import AdminLoginImg from '../assets/adminLogin.png'

const AdminLogin = () => {
  return (
    <main className='main-section items-center min-h-screen bg-cover bg-center"'
      style={{
        backgroundImage: `url(${AdminLoginImg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>
      <div className='backdrop-blur-sm bg-white/30 p-4 rounded-md shadow-lg '>
        <LoginFrom
          role={roles.admin}
          name={'Admin Login'}
          homePath='/admin'
          signupPath='/admin/signup'
          loginMsg='Login as user'
          loginPath='/login'
        />
      </div>
    </main>
  )
}

export default AdminLogin