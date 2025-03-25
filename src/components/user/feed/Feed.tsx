import { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { PostType } from '../../../constants/FeedTypes'
import Comments from './Comments';
import { AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import {
  clearSearchResults,
  selectLikedUsersModelState,
  selectPost, selectPostNumberOfPages,
  selectPostPage, selectPostPosts, selectPostSearchStatus, selectPostSearchUserResult, selectPostSharePostModelOpen, selectPostStatus,
  setLikedUsersModelState,
  setSharePostModelOpen
} from '../../../features/post/postSlice';
import { AppDispatch } from '../../../app/store';
import { getPosts } from '../../../features/post/postApi';
import LikedUsersModel from './LikedUsersModel';
import InfiniteScroll from 'react-infinite-scroll-component'
import PostSkeltonLoader from '../../basic/PostSkeletonLoader';
import ShareComponent from '../../basic/ShareComponent';
import UsersList from '../follow/UsersList';
import PageTitle from '../../basic/PageTitle';
import { IoMdArrowRoundBack } from 'react-icons/io';
import SpringButton from '../../basic/SpringButton';


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

  const searchPostStatus = useSelector(selectPostSearchStatus)
  const searchUser = useSelector(selectPostSearchUserResult)

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

  const handleSearchGoBack = () => {
    dispatch(clearSearchResults())
    dispatch(getPosts(1))
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

      {searchPostStatus === 'success' &&
        <section>
          <PageTitle firstWord='Search' secondWord='Results' />
          <div className='flex justify-start'>
            <SpringButton>
              <button onClick={handleSearchGoBack} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                <IoMdArrowRoundBack size={32} />
              </button>
            </SpringButton>
          </div>

          <div className='p-4 flex flex-wrap justify-center gap-8 '>
            <UsersList
              users={searchUser}
              loadMorePosts={function (): Promise<void> {
                throw new Error('Function not implemented.');
              }}
              hasMore={false} />
          </div>
        </section>
      }

      <div className='flex justify-center item-center'>
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
      </div>

    </main >
  )
}

export default Feed