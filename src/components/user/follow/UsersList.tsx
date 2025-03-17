import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { UserType } from '../../../constants/types'
import UserSkeletonLoader from '../../basic/UserSkeletonLoader'
import UserCard from './UserCard'
import { useSelector } from 'react-redux'
import { selectUserFollowing } from '../../../features/user/userSlice'

type Props = {
  users: UserType[]
  loadMorePosts: () => Promise<void>
  hasMore: boolean
}

const UsersList = ({ users, loadMorePosts, hasMore }: Props) => {

  return (
    <InfiniteScroll
      className='p-4 flex flex-wrap sm:justify-start justify-center gap-3'
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
        />
      ))}
    </InfiniteScroll>
  )
}

export default UsersList