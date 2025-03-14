import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { PostType } from '../../constants/FeedTypes';
import { useForm } from 'react-hook-form';
import {
  selectPostCroppedImage, selectPostImageToCrop,
  selectUploadFilesStatus, setCroppedImage, setImageToCrop
} from '../../features/post/postSlice';
import { AppDispatch } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost, uploadFiles } from '../../features/post/postApi';
import PostForm from '../../components/user/createPost/PostForm';
import { AnimatePresence } from 'framer-motion';
import OrbAnimation from '../../components/basic/OrbAnimation';
import PageTitle from '../../components/basic/PageTitle';
import { selectUserNavOpen } from '../../features/user/userSlice';

type Props = {}


type FromDataType = {
  image?: FileList
  message: string
}


const EditPostPage = (props: Props) => {
  const navigator = useNavigate()
  const location = useLocation()
  const post = location.state as PostType
  const userNavOpen = useSelector(selectUserNavOpen)
  

  const [images, setImages] = useState<string[]>(() => {
    return post.mediaType !== 'text'
      ? post.media ? post.media : []
      : []
  })
  const [imageFiles, setImageFiles] = useState<File[]>(
    post.media ? Array(post.media.length).fill(null) : []
  );
  const [resetActiveIndex, setResetActiveIndex] = useState(false)
  const [loaderModelOpen, setLoaderModelOpen] = useState(false)

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
    setLoaderModelOpen(true)
    const cloudinaryUrlRegex = /^https:\/\/res\.cloudinary\.com\/.*$/;
    const existingImageUrls = images.filter(item => cloudinaryUrlRegex.test(item))
    const updatedImageFiles = imageFiles.filter(file => file !== null)

    if (existingImageUrls.length === 0 && updatedImageFiles.length === 0) {
      const updatedPost: Partial<PostType> = {
        ...post,
        mediaType: 'text',
        media: [`${data.message}`],
      }
      await dispatch(updatePost({ post: updatedPost }))
      dispatch(setCroppedImage({ url: undefined, blob: undefined }))
      dispatch(setImageToCrop(undefined))
      setLoaderModelOpen(false)
      navigator('/')
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
    await dispatch(updatePost({ post: updatedPost }))
    dispatch(setCroppedImage({ url: undefined, blob: undefined }))
    dispatch(setImageToCrop(undefined))
    setLoaderModelOpen(false)
    navigator('/')
  }

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
      <div className={`p-4 ${userNavOpen ? 'sm:ml-64 ' : ''}`}>
        <div className="p-4 mt-14">

          <PageTitle firstWord='Edit' secondWord='Post' />

          <AnimatePresence
            initial={false}
            mode='wait'
            onExitComplete={() => null}
          >
            {loaderModelOpen &&
              <OrbAnimation
                message='Updating your post....'
                handleClose={() => { setLoaderModelOpen(false) }}
              />
            }
          </AnimatePresence>

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