import React from 'react'
import BackdropVerifyOtp from '../../backdrop/BackdropVerifyOtp'
import { motion } from 'framer-motion'
import { dropIn } from '../../../constants/animationDropins'
import { FieldValues, useForm } from 'react-hook-form'
import { PostType } from '../../../constants/FeedTypes'
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from 'react-toastify'

type Props = {
  handleClose: () => void
  handlePost: (data: Partial<PostType>) => void
}

const AddImage = ({ handleClose, handlePost }: Props) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (formData: FieldValues) => {
    const MAX_SIZE = 10 * 1024 * 1024;
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/ogg'];
    const invalidFiles = formData.image.filter((file: File) =>
      !validTypes.includes(file.type) || file.size > MAX_SIZE
    );
    if (invalidFiles.length > 0) {
      invalidFiles.array.forEach((file: File) => {
        if (!validTypes.includes(file.type)) toast(`invalid file type for ${file.name}`)
        if (file.size > MAX_SIZE) toast(`file is too large ${file.name}`)
      })
    }
    const content = formData.message.replace(/#[a-zA-Z0-9_]+/g, "").replace(/\n/g, " ").trim();
    const hashtags = formData.message.match(/#[a-zA-Z0-9_]+/g);
    console.log(formData.image)

    const data: Partial<PostType> = {
      mediaType: 'image',
      desc: content,
      tags: hashtags,
    }
    handlePost(data)
  };


  return (
    <BackdropVerifyOtp onClick={handleClose}>
      <motion.div
        className='justify-center w-96'
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >

        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
          <div className='space-y-4'>

            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 w-96">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <IoCloudUploadOutline size={52} />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                multiple
                accept="image/jpeg, image/png, image/gif, image/webp, video/mp4, video/webm, video/ogg"
                className="hidden"
                {...register('image', { required: 'image is required' })}
              />
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">upload images</label>
            </label>

            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">add tags and description</label>
            <textarea
              className="block p-2.5 w-full text-MD text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-23"
              {...register('message')}
            />
            <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800" >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"> Post </span>
            </button>

          </div>
        </form>

      </motion.div>
    </BackdropVerifyOtp>
  )
}

export default AddImage