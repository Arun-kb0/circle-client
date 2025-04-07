import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserBlockedAccountsCurrentPage,
  selectUserBlockedAccountsStatus,
  selectUserNavOpen,
  selectUserBlockedAccountsNumberOfPages,
  selectUserBlockedAccounts
} from '../../features/user/userSlice';
import { AppDispatch } from '../../app/store';
import { getUserToUserBlockedAccounts } from '../../features/user/userApi';
import PageTitle from '../../components/basic/PageTitle';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserSkeletonLoader from '../../components/basic/UserSkeletonLoader';
import UserCard from '../../components/user/follow/UserCard';



const BlockedUsers = () => {
  const dispatch = useDispatch<AppDispatch>()
  const blockedUsers = useSelector(selectUserBlockedAccounts)
  const status = useSelector(selectUserBlockedAccountsStatus)
  const page = useSelector(selectUserBlockedAccountsCurrentPage)
  const numberOfPages = useSelector(selectUserBlockedAccountsNumberOfPages)
  const userNavOpen = useSelector(selectUserNavOpen)
  const [hasMore, setHasMore] = useState<boolean>(() => page < numberOfPages);

  useEffect(() => {
    if (blockedUsers.length === 0) {
      dispatch(getUserToUserBlockedAccounts(1))
    }
  }, [])

  const loadMorePosts = async () => {
    if (status === 'loading' || !hasMore) return
    await dispatch(getUserToUserBlockedAccounts(page + 1))
    const newPage = page + 1
    setHasMore(newPage < numberOfPages)
  }

  useEffect(() => {
    console.log('blockedUsers')
    console.log(blockedUsers)
  }, [blockedUsers.length])

  return (
    <main className='main-section justify-center relative overflow-y-auto' >
      <div className={`p-4 ${userNavOpen ? 'sm:ml-64 ' : ''}`}>
        <div className="p-4 mt-14">

          <PageTitle firstWord='Blocked' secondWord='Users' />

          <InfiniteScroll
            className='p-4 flex flex-wrap justify-center gap-3'
            scrollableTarget='home'
            dataLength={blockedUsers.length}
            next={loadMorePosts}
            hasMore={hasMore}
            loader={
              status === 'loading' &&
              <div className='space-y-4 flex flex-wrap'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <UserSkeletonLoader key={index} />
                ))}
              </div>
            }
          >
            {blockedUsers.map(item => (
              <UserCard
                key={item._id}
                userId={item.blockedUserId}
                name={item.blockedUserName}
                image={item.blockedUserImage}
                componentType='blocked-user'
              />
            ))}
          </InfiniteScroll>

        </div>
      </div>
    </main>
  )
}

export default BlockedUsers