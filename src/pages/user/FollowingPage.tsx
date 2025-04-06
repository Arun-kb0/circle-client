import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../app/store'
import {
  selectUserFollowing,
  selectUserFollowingCurrentPage,
  selectUserFollowingNumberOfPages,
  selectUserFollowingStatus,
  selectUserNavOpen,
} from '../../features/user/userSlice'
import { getFollowing } from '../../features/user/userApi'
import UsersList from '../../components/user/follow/UsersList'
import PageTitle from '../../components/basic/PageTitle'
import { useLocation } from 'react-router-dom'


type Props = {
  userId: string
}

const FollowingPage = ({ userId }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const followingUsers = useSelector(selectUserFollowing)
  const status = useSelector(selectUserFollowingStatus)
  const page = useSelector(selectUserFollowingCurrentPage)
  const numberOfPages = useSelector(selectUserFollowingNumberOfPages)
  const userNavOpen = useSelector(selectUserNavOpen)
  
  const [hasMore, setHasMore] = useState<boolean>(() => page < numberOfPages);
  const [isUserProfile] = useState(() => {
    return location.pathname === '/profile' || location.pathname === '/user-profile'
    ? true : false
  })

  useEffect(() => {
    if (followingUsers.length === 0) {
      dispatch(getFollowing({ userId, page: 1 }))
    }
  }, [userId])

  const loadMorePosts = async () => {
    if (status === 'loading' || !hasMore) return
    await dispatch(getFollowing({ userId, page: page + 1 }))
    const newPage = page + 1
    setHasMore(newPage < numberOfPages)
  }

  useEffect(() => {
    console.log('isUserProfile following page ',isUserProfile)
  },[isUserProfile])

  return (
    <main className='main-section justify-center relative overflow-y-auto' >
      <div className={`p-4 ${userNavOpen && !isUserProfile ? 'sm:ml-64 ' : ''}`}>
        <div className={`${isUserProfile ? "" : "p-4 mt-14"}`}>

          {!isUserProfile && <PageTitle firstWord='' secondWord='Following' />}

          <UsersList
            users={followingUsers}
            loadMorePosts={loadMorePosts}
            hasMore={hasMore}
          />

        </div>
      </div>
    </main>
  )
}

export default FollowingPage