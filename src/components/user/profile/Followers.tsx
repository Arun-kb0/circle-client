import { useEffect, useState } from 'react'
import UsersList from '../follow/UsersList'
import { AppDispatch } from '../../../app/store'
import { useDispatch, useSelector } from 'react-redux'
import {
   selectUserFollowCurrentPage, selectUserFollowers,
  selectUserFollowNumberOfPages, selectUserFollowStatus
} from '../../../features/user/userSlice'
import { getFollowers } from '../../../features/user/userApi'

type Props = {
  userId: string
}

const Followers = ({ userId }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const followerUsers = useSelector(selectUserFollowers)
  const status = useSelector(selectUserFollowStatus)
  const page = useSelector(selectUserFollowCurrentPage)
  const numberOfPages = useSelector(selectUserFollowNumberOfPages)
  const [hasMore, setHasMore] = useState<boolean>(() => page < numberOfPages);

  useEffect(() => {
    if (followerUsers.length === 0) {
      dispatch(getFollowers({ userId, page: 1 }))
    }
  }, [userId])

  const loadMorePosts = async () => {
    if (status === 'loading' || !hasMore) return
    await dispatch(getFollowers({ userId, page: page + 1 }))
    const newPage = page + 1
    setHasMore(newPage < numberOfPages)
  }


  return (
    <main className='main-section justify-center relative overflow-y-auto ' >
      <div className="p-4" >
        <div className="">

          <UsersList
            users={followerUsers}
            loadMorePosts={loadMorePosts}
            hasMore={hasMore}
          />

        </div>
      </div>
    </main>
  )
}

export default Followers