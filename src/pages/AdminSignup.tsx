import SignupForm from '../components/auth/SignupForm'
import { roles } from '../constants/enums'
import adminSignupImg from '../assets/adminSignup.png'

const AdminSignup = () => {
  return (
    <main className='main-section items-center min-h-screen bg-cover bg-center"'
      style={{
        backgroundImage: `url(${adminSignupImg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>
      <div className='backdrop-blur-sm bg-white/30 p-4 rounded-md shadow-lg '>

        <SignupForm
          role={roles.admin}
          name={'Admin Signup'}
          homePath='/admin'
          loginPath='/admin/login'
        />
      </div>

    </main>
  )
}

export default AdminSignup