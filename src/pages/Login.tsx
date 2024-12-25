import { roles } from '../constants/enums'
import LoginFrom from '../components/auth/LoginFrom'


const Login = () => {
  return (
    <main className='main-section items-center'>
      <LoginFrom
        role={roles.user}
        name={'Login'}
      />
    </main>
  )
}

export default Login