import React, { useEffect, useState } from 'react'
import BackdropVerifyOtp from '../../backdrop/BackdropVerifyOtp'
import { motion } from 'framer-motion'
import { dropIn } from '../../../constants/animationDropins'
import { useForm } from 'react-hook-form'
import { PostType } from '../../../constants/FeedTypes'
import { IoCloudUploadOutline, IoTerminal } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import { uploadFiles } from '../../../features/post/postApi'
import { selectUploadFiles, selectUploadFilesStatus } from '../../../features/post/postSlice'

// ! remove all this depentancies
import { Cloudinary, ImageTransformation } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { v4 as uuid } from 'uuid'
import Spinner from '../../Spinner'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6'
import PostImages from '../feed/PostImages'



type Props = {
  handleClose: () => void
  handlePost: (data: Partial<PostType>) => void
}

type FromDataType = {
  image: FileList
  message: string
}

const AddImage = ({ handleClose, handlePost }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const uploadFilesStatus = useSelector(selectUploadFilesStatus)
  const uploadedImageUrls = useSelector(selectUploadFiles)
  const [images, setImages] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [resetActiveIndex, setResetActiveIndex] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<FromDataType>({
    defaultValues: {
      image: undefined,
      message: undefined
    }
  });

  const onSubmit = async (data: FromDataType) => {
    console.log("image data = ")
    console.log(data)

    const result = await dispatch(uploadFiles(imageFiles)).unwrap()

    // const result = await dispatch(uploadFiles(data.image)).unwrap()
    const content = data.message.replace(/#[a-zA-Z0-9_]+/g, "").replace(/\n/g, " ").trim();
    const hashtags = data.message.match(/#[a-zA-Z0-9_]+/g);

    const post: Partial<PostType> = {
      mediaType: 'image',
      media: result.urls,
      desc: content,
      tags: hashtags ? hashtags : [],
    }
    console.log(post)
    // ! remove file accptance from this method in backend

    handlePost(post)
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const imageUrls: string[] = [];
    const newImageFiles: File[] = [];

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result
        if (typeof result === 'string') {
          imageUrls.push(result)
          newImageFiles.push(file)
          setImages(prev => [...prev, result])
          setImageFiles(prev => [...prev, file])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
    setImageFiles((prevImages) => prevImages.filter((_, i) => i !== index))
    setResetActiveIndex(true)
  }



  return (
    <BackdropVerifyOtp onClick={handleClose}>
      <motion.div
        className='justify-center'
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >

        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center">
          <div className='space-y-4'>

            {images.length !== 0 &&
              <PostImages
                media={images}
                isEdit={true}
                deleteFunction={handleDeleteImage}
                resetActiveIndex={resetActiveIndex}
              />
            }
            <div className={images.length > 0 ? 'hidden' : 'block'}>
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 w-[50vw] h-[50vh]">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {uploadFilesStatus === 'loading'
                    ? <Spinner />
                    : <IoCloudUploadOutline size={52} />
                  }
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
                  onChange={handleFileChange}
                />
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">upload images</label>
              </label>
            </div>

            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">add tags and description</label>
            <textarea
              className="block p-2.5 w-full text-MD text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-23"
              {...register('message')}
            />
            <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >
              {uploadFilesStatus === 'loading' && <Spinner />}
              Post
            </button>

          </div>
        </form>

      </motion.div>
    </BackdropVerifyOtp>
  )
}

export default AddImage