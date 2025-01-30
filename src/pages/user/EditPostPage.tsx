import React, { useEffect, useState } from 'react'
import PostImages from '../../components/user/feed/PostImages';
import { useLocation, useNavigate } from 'react-router-dom';
import { PostType } from '../../constants/FeedTypes';
import { useForm } from 'react-hook-form';
import {
  selectPostCroppedImage, selectPostImageToCrop, selectUploadFiles,
  selectUploadFilesStatus, setCroppedImage, setImageToCrop
} from '../../features/post/postSlice';
import { AppDispatch } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost, uploadFiles } from '../../features/post/postApi';
import { IoCloudUploadOutline } from 'react-icons/io5';
import Spinner from '../../components/Spinner';
import { imaggaScale } from '@cloudinary/url-gen/actions/resize';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import { useAnimationControls } from 'framer-motion';
import { BsDisplayport } from 'react-icons/bs';
import PostForm from '../../components/user/createPost/PostForm';

type Props = {}


type FromDataType = {
  image?: FileList
  message: string
}


const EditPostPage = (props: Props) => {
  const navigator = useNavigate()
  const location = useLocation()
  const post = location.state as PostType

  const [images, setImages] = useState<string[]>(() => {
    return post.mediaType !== 'text'
      ? post.media ? post.media : []
      : []
  })
  const [imageFiles, setImageFiles] = useState<File[]>(
    post.media ? Array(post.media.length).fill(null) : []
  );
  const [resetActiveIndex, setResetActiveIndex] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const uploadFilesStatus = useSelector(selectUploadFilesStatus)
  const croppedImage = useSelector(selectPostCroppedImage)
  const imageToCrop = useSelector(selectPostImageToCrop)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FromDataType>({
    defaultValues: {
      image: undefined,
      message: post.desc,
    }
  });

  const onSubmit = async (data: FromDataType) => {
    console.log("data = ")
    const cloudinaryUrlRegex = /^https:\/\/res\.cloudinary\.com\/.*$/;
    const existingImageUrls = images.filter(item => cloudinaryUrlRegex.test(item))
    const updatedImageFiles = imageFiles.filter(file => file !== null)

    if (existingImageUrls.length === 0 && updatedImageFiles.length === 0) {
      const updatedPost: Partial<PostType> = {
        ...post,
        mediaType: 'text',
        media: [`${data.message}`],
      }
      dispatch(updatePost(updatedPost))
      dispatch(setCroppedImage({ url: undefined, blob: undefined }))
      dispatch(setImageToCrop(undefined))
      return
    }

    const result = await dispatch(uploadFiles(updatedImageFiles)).unwrap()
    const content = data.message.replace(/#[a-zA-Z0-9_]+/g, "").replace(/\n/g, " ").trim();
    const hashtags = data.message.match(/#[a-zA-Z0-9_]+/g);

    const updatedPost: Partial<PostType> = {
      ...post,
      mediaType: 'image',
      media: [...existingImageUrls, ...result.urls],
      desc: content,
      tags: hashtags ? hashtags : [],
    }
    console.log(updatedPost)
    dispatch(updatePost(updatedPost))
    dispatch(setCroppedImage({ url: undefined, blob: undefined }))
    dispatch(setImageToCrop(undefined))
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return

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
    const imageToDelete = images[index]
    if (imageToDelete === croppedImage) dispatch(setCroppedImage({ url: undefined, blob: undefined }))
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
    setImageFiles((prevImages) => prevImages.filter((_, i) => i !== index))
    setResetActiveIndex(true)
  }

  const handleImageCrop = (index: number) => {
    dispatch(setImageToCrop(images[index]))
    navigator('/crop')
  }

  useEffect(() => {
    if (!croppedImage) return
    const { url, blob } = croppedImage
    if (!url || !blob) return
    if (images.includes(url)) return
    console.log('use effect')

    const updatedImages = images.filter(item => item !== imageToCrop)
    const updatedFiles = imageFiles.filter(item => {
      if (!item) return true
      return item.name !== imageToCrop
    })
    setImages([...updatedImages, url])
    const file = new File([blob], `new-cropped-image.jpg`, { type: 'image/jpeg' });
    setImageFiles([...updatedFiles, file])
  }, [croppedImage])

  useEffect(() => {
    console.log('image files array = ')
    console.log(imageFiles)
    console.log('image urls array = ')
    console.log(images)
  }, [imageFiles])

  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14">

          {/* <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center" >
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
          </form> */}

          <PostForm
            isEdit={true}
            images={images}
            imageFiles={imageFiles}
            onSubmit={onSubmit}
            handleDeleteImage={handleDeleteImage}
            handleFileChange={handleFileChange}
            handleImageCrop={handleImageCrop}
            resetActiveIndex={resetActiveIndex}
            uploadFilesStatus={uploadFilesStatus}
          />

        </div>
      </div>
    </main>
  )
}

export default EditPostPage