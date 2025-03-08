import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { createPost, uploadFiles } from '../../features/post/postApi';
import { PostType } from '../../constants/FeedTypes';
import {
  selectPostCreateCache, selectPostCroppedImage,
  selectPostImageToCrop,
  selectPostImageToCropIndex,
  selectUploadFilesStatus, setCreatePostCache,
  setCroppedImage, setImageToCrop,
  setImageToCropIndex
} from '../../features/post/postSlice';
import PostForm from '../../components/user/createPost/PostForm';
import { useNavigate } from 'react-router-dom';
import OrbAnimation from '../../components/basic/OrbAnimation';
import { AnimatePresence } from 'framer-motion';
import PageTitle from '../../components/basic/PageTitle';


type Props = {}

type FromDataType = {
  image?: FileList
  message: string
}

const CreatePost = (props: Props) => {
  const navigator = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const uploadFilesStatus = useSelector(selectUploadFilesStatus)
  const croppedImage = useSelector(selectPostCroppedImage)
  const imageToCrop = useSelector(selectPostImageToCrop)
  const postCache = useSelector(selectPostCreateCache)
  const imageToCropIndex = useSelector(selectPostImageToCropIndex)

  const [images, setImages] = useState<string[]>(postCache.images)
  const [imageFiles, setImageFiles] = useState<File[]>(postCache.imageFiles)
  const [resetActiveIndex, setResetActiveIndex] = useState(false)
  const [loaderModelOpen, setLoaderModelOpen] = useState(false)

  const onSubmit = async (data: FromDataType) => {
    console.log("data = ")
    setLoaderModelOpen(true)
    const cloudinaryUrlRegex = /^https:\/\/res\.cloudinary\.com\/.*$/;
    const existingImageUrls = images.filter(item => cloudinaryUrlRegex.test(item))
    const updatedImageFiles = imageFiles.filter(file => file !== null)

    const content = data.message.replace(/#[a-zA-Z0-9_]+/g, "").replace(/\n/g, " ").trim();
    const hashtags = data.message.match(/#[a-zA-Z0-9_]+/g);

    if (existingImageUrls.length === 0 && updatedImageFiles.length === 0) {
      const updatedPost: Partial<PostType> = {
        mediaType: 'text',
        media: [`${content}`],
        tags: hashtags ? hashtags : [],
      }
      await dispatch(createPost(updatedPost))
      dispatch(setCroppedImage({ url: undefined, blob: undefined }))
      dispatch(setImageToCrop(undefined))
      dispatch(setCreatePostCache({ imageFiles: [], images: [] }))
      setLoaderModelOpen(false)
      navigator('/')
      return
    }

    const result = await dispatch(uploadFiles(updatedImageFiles)).unwrap()
    const updatedPost: Partial<PostType> = {
      mediaType: 'image',
      media: [...existingImageUrls, ...result.urls],
      desc: content,
      tags: hashtags ? hashtags : [],
    }
    console.log(updatedPost)
    await dispatch(createPost(updatedPost)).unwrap()
    dispatch(setCroppedImage({ url: undefined, blob: undefined }))
    dispatch(setImageToCrop(undefined))
    dispatch(setCreatePostCache({ imageFiles: [], images: [] }))
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

  const handleDeleteImage = async (index: number) => {
    const imageToDelete = images[index]
    if (imageToDelete === croppedImage) dispatch(setCroppedImage({ url: undefined, blob: undefined }))
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
    setImageFiles((prevImages) => prevImages.filter((_, i) => i !== index))
    setResetActiveIndex(true)
  }

  const handleImageCrop = async (index: number) => {
    await handleDeleteImage(index)

    dispatch(setImageToCrop(images[index]));
    navigator('/crop');
  }

  useEffect(() => {
    if (!croppedImage) return
    const { url, blob } = croppedImage
    if (!url || !blob) return
    if (images.includes(url)) return
    const updatedFiles = imageFiles
    const updatedImages = images
    setImages([...updatedImages, url])
    const file = new File([blob], `new-cropped-image.jpg`, { type: 'image/jpeg' });
    setImageFiles([...updatedFiles, file])
  }, [croppedImage])

  useEffect(() => {
    dispatch(setCreatePostCache({ images, imageFiles }))
  }, [images, imageFiles])


  useEffect(() => {
    console.log('image files array = ')
    console.log(imageFiles)
    console.log('image urls array = ')
    console.log(images)
  }, [imageFiles, images])

  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14 w-[70vw]">

          <PageTitle firstWord='Create' secondWord='Post' />

          <AnimatePresence
            initial={false}
            mode='wait'
            onExitComplete={() => null}
          >
            {loaderModelOpen &&
              <OrbAnimation
                message="creating your post...."
                handleClose={() => { setLoaderModelOpen(false) }}
              />
            }
          </AnimatePresence>

          <PostForm
            isEdit={false}
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

export default CreatePost