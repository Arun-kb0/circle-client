import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../app/store'
import {
  clearFollowing,
  selectUserFollowing,
  selectUserFollowingCurrentPage,
  selectUserFollowingNumberOfPages,
  selectUserFollowingStatus,
} from '../../features/user/userSlice'
import { getFollowing } from '../../features/user/userApi'
import UsersList from '../../components/user/follow/UsersList'
import { selectAuthUser } from '../../features/auth/authSlice'


type Props = {
  userId: string
}

const FollowingPage = ({ userId }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const followingUsers = useSelector(selectUserFollowing)
  const status = useSelector(selectUserFollowingStatus)
  const page = useSelector(selectUserFollowingCurrentPage)
  const numberOfPages = useSelector(selectUserFollowingNumberOfPages)
  const [hasMore, setHasMore] = useState<boolean>(() => page < numberOfPages);

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


  return (
    <main className='main-section justify-center relative overflow-y-auto ' >
      <div className="p-4" >
        <div className="">

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