import React, { useEffect, useState } from 'react'
import ChatUser from './ChatUser';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserFollowing, selectUserFollowingCurrentPage,
  selectUserFollowingNumberOfPages, selectUserFollowingStatus,
} from '../../../features/user/userSlice';
import { AppDispatch } from '../../../app/store';
import { getFollowers, getFollowing } from '../../../features/user/userApi';
import Spinner from '../../Spinner';
import { selectAuthUser } from '../../../features/auth/authSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChatUserSkeletonLoader from '../../basic/ChatUserSkeletonLoader';


type Props = {}

const ChatUsers = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector(selectAuthUser)
  const users = useSelector(selectUserFollowing)
  const numberOfPages = useSelector(selectUserFollowingNumberOfPages)
  const page = useSelector(selectUserFollowingCurrentPage)
  const status = useSelector(selectUserFollowingStatus)
  const [hasMore, setHasMore] = useState<boolean>(() => page <= numberOfPages);

  useEffect(() => {
    if (!currentUser) return
    if (!users || users.length === 0) {
      dispatch(getFollowing({ userId: currentUser._id, page: 1 }))
    }
  }, [])

  const loadMoreUsers = () => {
    if (!currentUser) return
    if (status === 'loading' || !hasMore) return
    dispatch(getFollowing({ userId: currentUser._id, page: page + 1 }))
    const newPage = page + 1
    setHasMore(newPage <= numberOfPages)
  }


  return (
    <section className="w-auto overflow-y-auto max-w-md p-1 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

      <div className="flex items-center justify-between mb-4"> <h5 className="sm:text-xl text-sm font-bold leading-none text-gray-900 dark:text-white capitalize">people</h5></div>
      <InfiniteScroll
        className='flow-root divide-y divide-gray-200 dark:divide-gray-700'
        dataLength={users.length}
        next={loadMoreUsers}
        hasMore={hasMore}
        loader={
          <div className='space-y-4'>
            {Array.from({ length: 5 }).map((_, index) => (
              <ChatUserSkeletonLoader key={index} />
            ))}
          </div>
        }
        height={window.innerHeight - 240}
      >
        {users.map((user) => (
          <article className="py-2 sm:py-4">
            <ChatUser
              key={user._id}
              userId={user._id}
              name={user.name}
              image={user.image?.url}
              messageCount={21}
            />
          </article>
        ))}
      </InfiniteScroll>

    </section>
  )
}

export default ChatUsers