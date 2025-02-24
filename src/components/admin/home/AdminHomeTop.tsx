import React, { useEffect } from 'react'
import AdminCard from './AdminCard'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectPostSelectedPost, selectTotalCommentCounts,
  selectTotalLikeCounts, selectTotalPostCounts
} from '../../../features/post/postSlice'
import { AppDispatch } from '../../../app/store'
import { feedCounts } from '../../../features/post/postApi'
import { getUsersCount } from '../../../features/user/userApi'
import { selectUserTotalUsers } from '../../../features/user/userSlice'

type Props = {}

const AdminHomeTop = (props: Props) => {
  const dispatch =useDispatch<AppDispatch>()
  const postsCount = useSelector(selectTotalPostCounts)
  const commentsCount = useSelector(selectTotalCommentCounts)
  const likesCount = useSelector(selectTotalLikeCounts)
  const usersCount = useSelector(selectUserTotalUsers)

  useEffect(() => {
    dispatch(feedCounts())
    dispatch(getUsersCount({}))
  },[])

  return (
    <section className='flex gap-4 justify-center items-center'>

      <AdminCard
        title={'total People'}
        count={usersCount}
        diff={20}
      />
      <AdminCard
        title={'total likes'}
        count={likesCount}
        diff={20}
      />
      <AdminCard
        title={'total comment'}
        count={commentsCount}
        diff={20}
      />
      <AdminCard
        title={'total posts'}
        count={postsCount}
        diff={20}
      />

    </section>
  )
}

export default AdminHomeTop