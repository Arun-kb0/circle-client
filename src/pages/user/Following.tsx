import React, { useEffect } from 'react'
import UserCard from '../../components/user/follow/UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { selectUserFollowCurrentPage, selectUserFollowers, selectUserFollowNumberOfPages, selectUserFollowStatus } from '../../features/user/userSlice'
import { getFollowers } from '../../features/user/userApi'



type Props = {}

const Following = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector(selectUserFollowers)
  const status = useSelector(selectUserFollowStatus)
  const page = useSelector(selectUserFollowCurrentPage)
  const numberOfPages = useSelector(selectUserFollowNumberOfPages)

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getFollowers(1))
    }
  }, [])

  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14 flex flex-wrap justify-center gap-8 lg:w-[160vh] md:w-[100vh]">
          {users.map(user => (
            <UserCard
              key={user._id}
              userId={user._id}
              name={user.name}
              image={user.image?.url}
              isFollowing={true}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Following