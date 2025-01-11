import React, { useState } from 'react'
import AnimatedCard from '../../components/basic/AnimatedCard'
import { TbPhoto } from "react-icons/tb";
import { RiText } from "react-icons/ri";
import SpringButton from '../../components/basic/SpringButton';
import { AnimatePresence } from 'framer-motion'
import AddImage from '../../components/user/createPost/AddImage';
import AddText from '../../components/user/createPost/AddText';
import { FieldValues } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../features/auth/authSlice';
import { AppDispatch } from '../../app/store';
import { createPost } from '../../features/post/postApi';
import { PostType } from '../../constants/FeedTypes';


type Props = {}

const CreatePost = (props: Props) => {
  const [openImageModel, setOpenImageModel] = useState(false)
  const [openTextModel, setOpenTextModel] = useState(false)
  const handleImageModelOpen = () => setOpenImageModel(true)
  const handleImageModelClose = () => setOpenImageModel(false)
  const handleTextModelOpen = () => setOpenTextModel(true)
  const handleTextModelClose = () => setOpenTextModel(false)

  const user = useSelector(selectAuthUser)
  const dispatch = useDispatch<AppDispatch>()

  const handlePost = (data: FieldValues) => {
    if (!user) return
    console.log(data)
    const dataWithUser: Partial<PostType> = {
      ...data,
      authorId: user._id,
      authorName: user.name,
      authorImage: user?.image?.url || '',
    }
    // ! add extra reducers for all th crud operations
    dispatch(createPost(dataWithUser))
  }

  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14 ">

          <h1 className="text-5xl p-4 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">create post</h1>

          <AnimatePresence
            initial={false}
            mode='wait'
            onExitComplete={() => null}
          >
            {openImageModel &&
              <AddImage
                handlePost={handlePost}
                handleClose={handleImageModelClose}
              />
            }
          </AnimatePresence>

          <AnimatePresence
            initial={false}
            mode='wait'
            onExitComplete={() => null}
          >
            {openTextModel &&
              <AddText
                handlePost={handlePost}
                handleClose={handleTextModelClose}
              />}
          </AnimatePresence>


          <section className='flex justify-center items-center gap-16 h-[70vh] '>
            <AnimatedCard>
              <button onClick={handleTextModelOpen} className='text-white z-20'>
                <SpringButton>
                  <div className='flex justify-center'> <RiText size={50} /></div>
                  <h5 className='text-xl font-semibold'>create text post</h5>
                </SpringButton>
              </button>
            </AnimatedCard>
            <AnimatedCard>
              <button onClick={handleImageModelOpen} className='text-white z-20'>
                <SpringButton>
                  <div className='flex justify-center'>  <TbPhoto size={50} /></div>
                  <h5 className='text-xl font-semibold'>create image post</h5>
                </SpringButton>
              </button>
            </AnimatedCard>
          </section>

        </div>
      </div>
    </main>
  )
}

export default CreatePost