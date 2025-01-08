import { roles } from '../constants/enums'
import LoginFrom from '../components/auth/LoginFrom'
import usersImage from '../assets/users.png'

const Login = () => {

  return (
    <main className='main-section items-center min-h-screen bg-cover bg-center"'  style={{backgroundImage:`url(${usersImage})`}}>
      <div className='backdrop-blur-sm bg-white/30 p-4 rounded-md shadow-lg '>
        <LoginFrom
          role={roles.user}
          name={'Login'}
          homePath='/'
          signupPath='/signup'
          loginMsg='Login as admin'
          loginPath='/admin/login'
        />
      </div>

    </main>
  )
}

export default Login