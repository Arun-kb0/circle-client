import React, { useEffect } from 'react'
import UserCard from '../../components/user/follow/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserSuggested, selectUserSuggestedCurrentPage,
  selectUserSuggestedNumberOfPages, selectUserSuggestedStatus
} from '../../features/user/userSlice';
import { AppDispatch } from '../../app/store';
import { getSuggestedPeople } from '../../features/user/userApi';
import Spinner from '../../components/Spinner';


type Props = {}

const FollowPeople = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector(selectUserSuggested)
  const status = useSelector(selectUserSuggestedStatus)
  const page = useSelector(selectUserSuggestedCurrentPage)
  const numberOfPages = useSelector(selectUserSuggestedNumberOfPages)

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getSuggestedPeople(1))
    }
  }, [])

  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14 flex flex-wrap justify-center gap-8 lg:w-[160vh] md:w-[100vh]">
          {status === 'loading' && <Spinner />}
          {status === 'success' &&
            users.map(user => (
              <UserCard
                key={user._id}
                userId={user._id}
                name={user.name}
                image={user?.image?.url}
                isFollowing={false}
              />
            ))}
        </div>
      </div>
    </main>
  )
}

export default FollowPeople