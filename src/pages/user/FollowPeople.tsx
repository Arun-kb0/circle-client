import React, { useEffect, useState } from 'react'
import UserCard from '../../components/user/follow/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserSuggested, selectUserSuggestedCurrentPage,
  selectUserSuggestedNumberOfPages, selectUserSuggestedStatus
} from '../../features/user/userSlice';
import { AppDispatch } from '../../app/store';
import { getSuggestedPeople } from '../../features/user/userApi';
import Spinner from '../../components/Spinner';
import { Waypoint } from 'react-waypoint';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserSkeletonLoader from '../../components/basic/UserSkeletonLoader';


type Props = {}

const FollowPeople = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector(selectUserSuggested)
  const status = useSelector(selectUserSuggestedStatus)
  const page = useSelector(selectUserSuggestedCurrentPage)
  const numberOfPages = useSelector(selectUserSuggestedNumberOfPages)
  const [hasMore, setHasMore] = useState<boolean>(() => page < numberOfPages);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getSuggestedPeople(1))
    }
  }, [])

  const loadMorePosts = async () => {
    if (status === 'loading' || !hasMore) return
    await dispatch(getSuggestedPeople(page + 1))
    const newPage = page + 1
    setHasMore(newPage < numberOfPages)
  }

  return (
    <main className='main-section justify-center relative overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14 flex flex-wrap justify-start gap-8 lg:w-[160vh] md:w-[100vh]">

          <InfiniteScroll
            className='p-4 mt-14 flex flex-wrap justify-start gap-8'
            scrollableTarget='home'
            dataLength={users.length}
            next={loadMorePosts}
            hasMore={hasMore}
            loader={
              <div className='space-y-4 flex flex-wrap'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <UserSkeletonLoader key={index} />
                ))}
              </div>
            }
          >
            {users.map(user => (
              <UserCard
                key={user._id}
                userId={user._id}
                name={user.name}
                image={user.image?.url}
                isFollowing={true}
              />
            ))}
          </InfiniteScroll>

        </div>
      </div>
    </main>
  )
}

export default FollowPeople