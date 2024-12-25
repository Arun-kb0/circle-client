import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthUser } from '../../features/auth/authSlice'
import { selectPostPosts, selectPostStatus } from '../../features/post/postSlice'
import { AppDispatch } from '../../app/store'
import { getPosts } from '../../features/post/postApi'


const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectAuthUser)
  const posts = useSelector(selectPostPosts)
  const postStatus = useSelector(selectPostStatus)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <main className='main-section items-center' >
      <h1 className='text-xl font-semibold text-gray-50'> welcome
        <span className='font-bold text-orange-300 capitalize'>  {user?.name}  </span>
        post status = {postStatus}
      </h1>
    </main>
  )
}

export default Home