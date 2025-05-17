import LoginForm from '../components/auth/LoginForm'
import { roles } from '../constants/enums'
import AdminLoginImg from '../assets/adminLogin.png'

const AdminLogin = () => {
  return (
    <main
      className="flex items-center justify-center min-h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${AdminLoginImg})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-4xl mx-auto p-8 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Side: Intro */}
          <div className="space-y-4 px-4">
            <h1 className="text-4xl font-extrabold text-gray-900">Admin Portal</h1>
            <p className="text-lg text-gray-700">
              Manage your social community with powerful admin tools.
            </p>
          </div>

          {/* Right Side: Login Form */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <LoginForm
                role={roles.admin}
                name={'Admin Login'}
                homePath='/admin'
                signupPath='/admin/signup'
                loginMsg='Login as user'
                loginPath='/login'
              />
            </div>
          </div>
        </div>
      </div>
    </main>

  )
}

export default AdminLogin