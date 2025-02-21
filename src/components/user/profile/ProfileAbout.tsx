import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../../features/auth/authSlice';
import { UserType } from '../../../constants/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppDispatch } from '../../../app/store';
import { updatedUser } from '../../../features/user/userApi';
import { uploadFiles } from '../../../features/post/postApi';
import { selectUploadFilesStatus } from '../../../features/post/postSlice';
import Spinner from '../../Spinner';
import { selectUserOtherUser } from '../../../features/user/userSlice';

type Props = {
  user: UserType
}

type FormValues = {
  name: string;
  image: FileList | null;
  age: number
  location: string
  state: string
  gender: string
};


const ProfileAbout = ({ user }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector(selectAuthUser)
  const imageUploadStatus = useSelector(selectUploadFilesStatus)
  const [isEditable, setIsEditable] = useState(() => currentUser?._id === user._id)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: user.name || "",
      age: user.age || undefined,
      location: user.location || "",
      state: user.location || "",
      gender: user.gender || "",
      image: null,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Form Data:", data);
    console.log(data)
    let result: any = ''
    if (data.image) {
      const fileArray = Array.from(data.image)
      result = await dispatch(uploadFiles(fileArray)).unwrap()
      console.log(result)
    }
    const userReq: Partial<UserType> = {
      image: {
        url: Array.isArray(result?.urls) ? result.urls[0] : ''
      },
      name: data.name,
      age: data.age ? data.age : 0,
      location: data.location,
      state: data.state,
      gender: data.gender
    }
    dispatch(updatedUser(userReq))
  };

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Personal details</h5>
      </div>
      <form className="flow-root" onSubmit={handleSubmit(onSubmit)}>
        <article className="flex items-center mb-4">
          <div className="flex-1 min-w-0 ms-4">
            <label htmlFor="name" className="text-sm font-medium text-gray-900 truncate dark:text-white" >
              Name
            </label>
          </div>
          <div className="flex-1 min-w-0 ms-4 items-center">
            <input
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="name"
              disabled={!isEditable}
              {...register("name", {
                pattern: {
                  value: /^[A-Za-z\s]*$/,
                  message: "Only alphabets are allowed",
                },
              })}
            />
            {errors.name &&
              <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> {String(errors.name.message)}</p>
            }
          </div>
        </article>

        <article className="flex items-center mb-4">
          <div className="flex-1 min-w-0 ms-4">
            <label htmlFor="location" className="text-sm font-medium text-gray-900 truncate dark:text-white" >
              Location
            </label>
          </div>
          <div className="flex-1 min-w-0 ms-4 items-center">
            <input
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="location"
              disabled={!isEditable}
              {...register("location", {
                pattern: {
                  value: /^[A-Za-z\s]*$/,
                  message: "Only alphabets are allowed",
                },
              })}
            />
            {errors.name &&
              <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> {String(errors.location?.message)}</p>
            }
          </div>
        </article>

        <article className="flex items-center mb-4">
          <div className="flex-1 min-w-0 ms-4">
            <label htmlFor="state" className="text-sm font-medium text-gray-900 truncate dark:text-white" >
              State
            </label>
          </div>
          <div className="flex-1 min-w-0 ms-4 items-center">
            <input
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="state"
              disabled={!isEditable}
              {...register("state", {
                pattern: {
                  value: /^[A-Za-z\s]*$/,
                  message: "Only alphabets are allowed",
                },
              })}
            />
            {errors.name &&
              <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> {String(errors.state?.message)}</p>
            }
          </div>
        </article>

        <article className="flex items-center mb-4">
          <div className="flex-1 min-w-0 ms-4">
            <label htmlFor="gender" className="text-sm font-medium text-gray-900 truncate dark:text-white" >
              Gender
            </label>
          </div>
          <div className="flex-1 min-w-0 ms-4 items-center">
            <input
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="gender"
              disabled={!isEditable}
              {...register("gender", {
                pattern: {
                  value: /^[A-Za-z\s]*$/,
                  message: "Only alphabets are allowed",
                },
              })}
            />
            {errors.name &&
              <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> {String(errors.gender?.message)}</p>
            }
          </div>
        </article>

        {isEditable && <article className="relative flex items-center mb-4">
          <div className="flex-1 min-w-0 ms-4">
            <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">
              Upload Profile Image
            </label>
          </div>
          <div className="flex-1 min-w-0 ms-4 items-center">
            <input
              type="file"
              id="image"
              {...register("image")}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              accept="image/*"
            />
          </div>
        </article>}

        <article className="flex justify-center items-center mb-4">
          {isEditable && <button type='submit' className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            {imageUploadStatus === 'loading' && <Spinner />}
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"> update </span>
          </button>}
        </article>
      </form>

    </div >

  )
}

export default ProfileAbout