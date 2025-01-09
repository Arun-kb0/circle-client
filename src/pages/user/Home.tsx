import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthUser } from '../../features/auth/authSlice'
import { selectPostPosts, selectPostStatus } from '../../features/post/postSlice'
import { AppDispatch } from '../../app/store'
import { getPosts } from '../../features/post/postApi'
import Feed from '../../components/user/feed/Feed'


const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectAuthUser)
  const posts = useSelector(selectPostPosts)
  const postStatus = useSelector(selectPostStatus)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <main className='main-section justify-center ' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14">

          <Feed/>

        </div>
      </div>
    </main>
  )
}

export default Home