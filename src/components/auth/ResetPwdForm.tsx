import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetPassword } from "../../features/auth/authApi";
import { AppDispatch } from "../../app/store";
import Spinner from "../Spinner";
import { selectAuthResetStatus } from "../../features/auth/authSlice";


interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

type Props = {
  openModel: () => void
}


const ResetPwdForm = ({ openModel }:Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const status = useSelector(selectAuthResetStatus)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data)
    const { email, password } = data
    await dispatch(resetPassword({ email, password }))
    openModel()
  }

  return (
    <form className="min-w-[300px] mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit(onSubmit)} >
      <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"> Change Password </h2>
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 " >
          Your email
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="example@gmail.com"
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
              message: 'Invalid email'
            }
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          New Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: 'Invalid password'
            }
          })}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label
          htmlFor="confirm-password"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <button type="submit" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        {status === 'loading' && <Spinner />}
        Reset Password
      </button>
      <div className='flex space-x-2 text-black'>
        <p> Got to </p>
        <Link to='/login' className='text-blue-400'> login </Link>
      </div>

    </form>
  );
};

export default ResetPwdForm;
