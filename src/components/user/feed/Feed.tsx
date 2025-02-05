import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { PostType } from '../../../constants/FeedTypes'
import Comments from './Comments';
import { AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLikedUsersModelState,
  selectPost, selectPostNumberOfPages,
  selectPostPage, selectPostPosts, selectPostStatus,
  setLikedUsersModelState
} from '../../../features/post/postSlice';
import { AppDispatch } from '../../../app/store';
import { getPosts, updatePost } from '../../../features/post/postApi';
import LikedUsersModel from './LikedUsersModel';
import InfiniteScroll from 'react-infinite-scroll-component'
import PostSkeltonLoader from '../../basic/PostSkeletonLoader';


const Feed = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [modelOpen, setModelOpen] = useState<Boolean>(false)
  const close = () => setModelOpen(false)
  const open = (post: PostType) => {
    setModelOpen(true)
    dispatch(selectPost(post))
  }

  const likedUsersModelOpen = useSelector(selectLikedUsersModelState)

  const posts = useSelector(selectPostPosts)
  const numberOfPages = useSelector(selectPostNumberOfPages)
  const page = useSelector(selectPostPage)
  const status = useSelector(selectPostStatus)
  const [hasMore, setHasMore] = useState<boolean>(() => page <= numberOfPages)


  useEffect(() => {
    if (posts.length !== 0) return
    dispatch(getPosts(1))
  }, [dispatch, posts.length])

  useEffect(() => {
    setHasMore(page <= numberOfPages)
  }, [page, numberOfPages])


  const loadMorePosts = () => {
    console.log('waypoint triggered !!')
    if (status === 'loading' || page > numberOfPages) return
    dispatch(getPosts(page + 1))
  }

  return (
    <main className='space-y-5' >

      <AnimatePresence
        initial={false}
        mode='wait'
        onExitComplete={() => null}
      >
        {modelOpen && <Comments handleClose={close} />}
        {likedUsersModelOpen &&
          <LikedUsersModel
            handleClose={() => dispatch(setLikedUsersModelState(false))}
          />
        }
        
      </AnimatePresence>


      <InfiniteScroll
        className='space-y-4 h-64 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500'
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

    </main >
  )
}

export default Feed