import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPost, selectPostNumberOfPages, selectPostPage, selectPostPosts, selectPostStatus, selectPostUserCreatedCurrentPage, selectPostUserCreatedNumberOfPages, selectPostUserCreatedPosts, selectPostUserCreatedStatus } from '../../../features/post/postSlice'
import Feed from '../feed/Feed'
import { PostType } from '../../../constants/FeedTypes'
import { AppDispatch } from '../../../app/store'
import { getPosts, getUserCreatedPosts } from '../../../features/post/postApi'
import { AnimatePresence } from 'framer-motion'
import Comments from '../feed/Comments'
import PostCard from '../feed/PostCard'
import { Waypoint } from 'react-waypoint'
import Spinner from '../../Spinner'

type Props = {}

const ProfilePosts = (props: Props) => {
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
    dispatch(getUserCreatedPosts(1))
  }, [])


  const loadMorePosts = () => {
    if (status === 'loading' || !hasMore) return
    dispatch(getUserCreatedPosts(page + 1))
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
    </section>
  )
}

export default ProfilePosts