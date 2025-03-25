import { useEffect } from 'react'
import AdminPostTable from '../AdminPostTable'
import { selectPostPopularPosts } from '../../../features/post/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularPosts } from '../../../features/post/postApi';
import { AppDispatch } from '../../../app/store';



const PopularPosts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const posts = useSelector(selectPostPopularPosts)

  useEffect(() => {
    dispatch(getPopularPosts({ limit: 10 }))
  }, [])
  
  return (
    <section className='mt-6'>
      <h5 className='text-center text-xl text-bold capitalize'>popular posts</h5>
      <AdminPostTable
        posts={posts}
      />
    </section>
  )
}

export default PopularPosts