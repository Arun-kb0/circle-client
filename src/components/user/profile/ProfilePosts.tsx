import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectPost, selectPostUserCreatedCurrentPage,
  selectPostUserCreatedNumberOfPages, selectPostUserCreatedPosts,
  selectPostUserCreatedStatus
} from '../../../features/post/postSlice'
import Feed from '../feed/Feed'
import { PostType } from '../../../constants/FeedTypes'
import { AppDispatch } from '../../../app/store'
import { getUserCreatedPosts } from '../../../features/post/postApi'
import { AnimatePresence } from 'framer-motion'
import Comments from '../feed/Comments'
import PostCard from '../feed/PostCard'
import PostSkeltonLoader from '../../basic/PostSkeletonLoader'
import InfiniteScroll from 'react-infinite-scroll-component'


type Props = {
  userId: string
}

const ProfilePosts = ({ userId }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const [modelOpen, setModelOpen] = useState<Boolean>(false)
  const close = () => setModelOpen(false)
  const open = (post: PostType) => {
    setModelOpen(true)
    dispatch(selectPost(post))
  }

  const posts = useSelector(selectPostUserCreatedPosts)
  const numberOfPages = useSelector(selectPostUserCreatedNumberOfPages)
  const page = useSelector(selectPostUserCreatedCurrentPage)
  const status = useSelector(selectPostUserCreatedStatus)

  const [hasMore, setHasMore] = useState<boolean>(() => page <= numberOfPages);

  useEffect(() => {
    if (posts.length !== 0) return
    dispatch(getUserCreatedPosts({ page: 1, userId }))
  }, [userId])


  const loadMorePosts = () => {
    if (status === 'loading' || !hasMore) return
    dispatch(getUserCreatedPosts({ page: page + 1, userId }))
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
          <div className='space-y-4'>
            {Array.from({ length: 5 }).map((_, index) => (
              <PostSkeltonLoader key={index} />
            ))}
          </div>
        }
        height={window.innerHeight - 240}
      >
        {status === 'success' && posts.map((post) => (
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

export default ProfilePosts