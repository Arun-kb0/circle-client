import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostType } from '../../../constants/FeedTypes'
import {
  selectPost, selectPostSavedPosts, selectPostSavedPostsCurrentPage,
  selectPostSavedPostsNumberOfPages, selectPostSavedPostsState
} from '../../../features/post/postSlice'
import { AppDispatch } from '../../../app/store'
import { getSavedPosts } from '../../../features/post/postApi'
import Comments from '../feed/Comments'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostSkeletonLoader from '../../basic/PostSkeletonLoader'
import PostCard from '../feed/PostCard'


const SavedPosts = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [modelOpen, setModelOpen] = useState<Boolean>(false)
  const close = () => setModelOpen(false)
  const open = (post: PostType) => {
    setModelOpen(true)
    dispatch(selectPost(post))
  }

  const posts = useSelector(selectPostSavedPosts)
  const numberOfPages = useSelector(selectPostSavedPostsNumberOfPages)
  const page = useSelector(selectPostSavedPostsCurrentPage)
  const status = useSelector(selectPostSavedPostsState)

  const [hasMore, setHasMore] = useState<boolean>(() => page <= numberOfPages);

  useEffect(() => {
    if (posts.length !== 0) return
    dispatch(getSavedPosts(1))
  }, [])


  const loadMorePosts = () => {
    if (status === 'loading' || !hasMore) return
    dispatch(getSavedPosts(page))
    const newPage = page + 1
    setHasMore(newPage <= numberOfPages)
  }


  return (
    <section className={`space-y-3 scroll-smooth  ${modelOpen ? 'overflow-hidden h-screen ' : ''} `}>
      <AnimatePresence
        initial={false}
        mode='wait'
        onExitComplete={() => null}
      >
        {modelOpen && <Comments handleClose={close} />}
      </AnimatePresence>


      <InfiniteScroll
        className='space-y-4 h-64  overflow-y-scroll  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500'
        scrollableTarget='home'
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={
          posts.length > 0
            ? (
              <div className='space-y-4'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <PostSkeletonLoader key={index} />
                ))}
              </div>
            ) : (
              <div className='flex justify-center items-center h-full'>
                <h5 className='text-xl font-semibold text-center'>no posts to show</h5> 
              </div>
            )
        }
        height={window.innerHeight - 240}
      >
        {status === 'success' && posts.map((post) => (
          post.status === 'active' &&
          <PostCard
            key={post._id}
            post={post}
            openCommentModel={open}
          />
        ))}
      </InfiniteScroll>
    </section>
  )
}

export default SavedPosts