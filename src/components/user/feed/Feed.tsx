import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { PostType } from '../../../constants/FeedTypes'
import Comments from './Comments';
import { AnimatePresence } from 'framer-motion'
import { Waypoint } from 'react-waypoint';
import Spinner from '../../Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { selectPost, selectPostNumberOfPages, selectPostPage, selectPostPosts, selectPostSelectedPost, selectPostStatus } from '../../../features/post/postSlice';
import { AppDispatch } from '../../../app/store';
import { getPosts } from '../../../features/post/postApi';


const Feed = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [modelOpen, setModelOpen] = useState<Boolean>(false)
  const close = () => setModelOpen(false)
  const open = (post: PostType) => {
    setModelOpen(true)
    dispatch(selectPost(post))
  }

  const posts = useSelector(selectPostPosts)
  const numberOfPages = useSelector(selectPostNumberOfPages)
  const page = useSelector(selectPostPage)
  const status = useSelector(selectPostStatus)

  const [hasMore, setHasMore] = useState<boolean>(() => page <= numberOfPages);

  useEffect(() => {
    if (posts.length !== 0) return
    dispatch(getPosts(1))
  }, [])

  // ! consoles
  useEffect(() => {
    console.log(status)
    console.log(hasMore)
    console.log(page)
  }, [status, hasMore, page])

  // ! way point bug need to fix
  const loadMorePosts = () => {
    console.log('waypoint triggered !!')
    if (status === 'loading') return
    if (hasMore) {
      dispatch(getPosts(page + 1))
      setHasMore(page <= numberOfPages)
    }
  }


  return (
    // <main className={`space-y-3 scroll-smooth  ${modelOpen ? 'overflow-hidden h-screen' : 'overflow-y-auto '} `}>
    <main className={`space-y-3 scroll-smooth  ${modelOpen ? 'overflow-hidden h-screen ' : ''} `}>

      <AnimatePresence
        initial={false}
        mode='wait'
        onExitComplete={() => null}
      >
        {modelOpen && <Comments handleClose={close} />}
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

  { status === 'loading' && <Spinner /> }
  { !hasMore && <div className="text-center">No more post</div> }

    </main >
  )
}

export default Feed