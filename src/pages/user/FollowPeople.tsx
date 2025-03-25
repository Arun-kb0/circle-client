import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserNavOpen,
  selectUserSuggested, selectUserSuggestedCurrentPage,
  selectUserSuggestedNumberOfPages, selectUserSuggestedStatus
} from '../../features/user/userSlice';
import { AppDispatch } from '../../app/store';
import { getSuggestedPeople } from '../../features/user/userApi';
import UsersList from '../../components/user/follow/UsersList';
import PageTitle from '../../components/basic/PageTitle';



const FollowPeople = () => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector(selectUserSuggested)
  const status = useSelector(selectUserSuggestedStatus)
  const page = useSelector(selectUserSuggestedCurrentPage)
  const userNavOpen = useSelector(selectUserNavOpen)
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
      <div className={`p-4 ${userNavOpen ? 'sm:ml-64 ' : ''}`}>ch
        <div className="p-4 mt-14">

          <PageTitle firstWord='Follow' secondWord='Users' />

          <div className='p-4 flex flex-wrap justify-start gap-8 lg:w-[160vh] md:w-[100vh]'>
            <UsersList
              users={users}
              loadMorePosts={loadMorePosts}
              hasMore={hasMore}
            />
          </div>

        </div>
      </div>
    </main>
  )
}

export default FollowPeople