import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { selectAuthStatus, selectAuthUser } from '../../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { roles } from '../../constants/enums'
import { adminLogin, login, signup } from '../../features/auth/authApi'
import Spinner from '../Spinner'
import OauthProviders from './OauthProviders'


type Props = {
  role: roles
  name: string
  homePath: '/' | '/admin'
  signupPath: '/signup' | '/admin/signup'
  loginMsg: string
  loginPath: '/login' | '/admin/login'
}


const LoginFrom = ({ role, name, homePath, signupPath, loginMsg, loginPath }: Props) => {

  const dispatch = useDispatch<AppDispatch>()
  const status = useSelector(selectAuthStatus)
  const user = useSelector(selectAuthUser)

  const navigate = useNavigate()
  const from = user?.role === roles.user ? '/' : '/admin'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: FieldValues) => {
    const { email, password } = data
    role === roles.admin
      ? dispatch(adminLogin({ email, password }))
      : dispatch(login({ email, password }))
  }

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true })
    }
  }, [user])



  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 min-w-[300px]'>
      <h2 className='title text-center text-black'> {name} </h2>
      <div className="grid space-y-4">

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
          <input
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder='enter email'
            {...register('email', {
              required: 'email is required',
              pattern: {
                value: /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
                message: 'Invalid email'
              }
            })}
          />
          {errors.email &&
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> {String(errors.email.message)}</p>
          }
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register('password', {
              required: 'password is required',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'Invalid password'
              }
            })}
          />
          {errors.password &&
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> {String(errors.password.message)}</p>
          }
        </div>


      </div>

      <button
        type="submit"
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 capitalize">
        {status === 'loading' &&
          <Spinner />
        }
        Login
      </button>

      <OauthProviders />

      <div className='space-y-1 text-black'>
        <div className='flex space-x-2'>
          <p>don't have an account </p>
          <Link to={signupPath} className='text-blue-400'> Sign up </Link>
        </div>
        {role === roles.user &&
          <div className='flex space-x-2'>
            <p>forgot password?</p>
            <Link to='/resetPwd' className='text-blue-400'> reset </Link>
          </div>
        }
        <div className='flex space-x-2 '>
          <p>{loginMsg}</p>
          <Link to={loginPath} className='text-blue-400'> {role === roles.admin ? 'Login as user' : 'Login as admin'} </Link>
        </div>
      </div>

    </form>
  )
}

export default LoginFrom