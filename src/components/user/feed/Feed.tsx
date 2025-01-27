import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { PostType } from '../../../constants/FeedTypes'
import Comments from './Comments';
import { AnimatePresence } from 'framer-motion'
import { Waypoint } from 'react-waypoint';
import Spinner from '../../Spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLikedUsersModelState,
  selectPost, selectPostNumberOfPages,
  selectPostPage, selectPostPosts, selectPostStatus,
  setLikedUsersModelState
} from '../../../features/post/postSlice';
import { AppDispatch } from '../../../app/store';
import { getPosts } from '../../../features/post/postApi';
import LikedUsersModel from './LikedUsersModel';


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

  const [hasMore, setHasMore] = useState<boolean>(() => page <= numberOfPages);

  useEffect(() => {
    if (posts.length !== 0) return
    dispatch(getPosts(1))
  }, [])


  const loadMorePosts = () => {
    if (status === 'loading' || !hasMore) return
    dispatch(getPosts(page + 1))
    const newPage = page + 1
    setHasMore(newPage <= numberOfPages)
  }


  return (
    <main className={`space-y-3 scroll-smooth  ${modelOpen ? 'overflow-hidden h-screen ' : ''} `}>

      <AnimatePresence
        initial={false}
        mode='wait'
        onExitComplete={() => null}
      >
        {modelOpen && <Comments handleClose={close} />}
        {likedUsersModelOpen &&
          <LikedUsersModel
            postId=''
            handleClose={() => dispatch(setLikedUsersModelState(false))}
          />
        }
        
      </AnimatePresence>

      {
        status === 'success' && posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            openCommentModel={open}
          />
        ))
      }

      {
        hasMore && status === 'success' &&
        <Waypoint
          onEnter={loadMorePosts}
          bottomOffset="-100px"
        >
          <div> <Spinner /></div>
        </Waypoint>
      }

      {status === 'loading' && <Spinner />}
      {!hasMore && <div className="text-center">No more post</div>}

    </main >
  )
}

export default Feed