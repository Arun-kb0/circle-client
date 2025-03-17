import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { PostType } from '../../../constants/FeedTypes'
import Comments from './Comments';
import { AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLikedUsersModelState,
  selectPost, selectPostNumberOfPages,
  selectPostPage, selectPostPosts, selectPostSharePostModelOpen, selectPostStatus,
  setLikedUsersModelState,
  setSharePostModelOpen
} from '../../../features/post/postSlice';
import { AppDispatch } from '../../../app/store';
import { getPosts, updatePost } from '../../../features/post/postApi';
import LikedUsersModel from './LikedUsersModel';
import InfiniteScroll from 'react-infinite-scroll-component'
import PostSkeltonLoader from '../../basic/PostSkeletonLoader';
import { DataStrategyFunctionArgs } from 'react-router-dom';
import ShareComponent from '../../basic/ShareComponent';


const Feed = () => {
  const dispatch = useDispatch<AppDispatch>()
  const sharePostModelOpen = useSelector(selectPostSharePostModelOpen)

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
    if (status === 'loading' || page > numberOfPages) return
    dispatch(getPosts(page + 1))
  }

  const handleShareClose = () => {
    dispatch(setSharePostModelOpen({ open: false, post: null }))
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
        {sharePostModelOpen &&
          <ShareComponent
            url={''}
            title={''}
            text={''}
            handleClose={handleShareClose}
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
          post.status === 'active' &&
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