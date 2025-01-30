import React from 'react'
import PostImages from '../feed/PostImages'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import { PostType } from '../../../constants/FeedTypes'
import Spinner from '../../Spinner'
import { StateType } from '../../../constants/types'

type Props = {
  isEdit: boolean
  post?: PostType

  uploadFilesStatus: StateType
  images: string[]
  imageFiles: File[]
  onSubmit: (data: FromDataType) => Promise<void>
  handleDeleteImage: (index: number) => void
  handleImageCrop: (index: number) => void
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  resetActiveIndex: boolean
}

type FromDataType = {
  image?: FileList
  message: string
}


const PostForm = ({
  isEdit = false, post, images, imageFiles,
  onSubmit, handleDeleteImage, handleFileChange,
  handleImageCrop, resetActiveIndex, uploadFilesStatus }: Props) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FromDataType>({
    defaultValues: {
      image: undefined,
      message: post?.desc,
    }
  });


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center">
      <div className='space-y-4'>

        {images.length > 0 &&
          <PostImages
            media={images}
            isEdit={true}
            deleteFunction={handleDeleteImage}
            resetActiveIndex={resetActiveIndex}
            handleImageCrop={handleImageCrop}
          />
        }
        <div>
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
              {...register('image')}
              onChange={handleFileChange}
            />
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">upload images</label>
          </label>
        </div>

        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">update tags and description</label>
        <textarea
          className="block p-2.5 w-full text-MD text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-23"
          {...register('message')}
        />
        <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >
          {uploadFilesStatus === 'loading' && <Spinner />}
          Update post
        </button>

      </div>
    </form>
  )
}

export default PostForm