import { roles } from '../constants/enums'
import LoginFrom from '../components/auth/LoginFrom'


const Login = () => {

  return (
    <main className='main-section items-center'>
      <LoginFrom
        role={roles.user}
        name={'Login'}
        homePath='/'
        signupPath='/signup'
        loginMsg='Login as admin'
        loginPath='/admin/login'
      />

    </main>
  )
}

export default Login