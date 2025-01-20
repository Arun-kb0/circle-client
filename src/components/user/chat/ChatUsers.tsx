import React, { useEffect, useState } from 'react'
import ChatUser from './ChatUser';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserFollowCurrentPage, selectUserFollowers, selectUserFollowNumberOfPages, selectUserFollowStatus } from '../../../features/user/userSlice';
import { AppDispatch } from '../../../app/store';
import { getFollowers } from '../../../features/user/userApi';
import { Waypoint } from 'react-waypoint';
import Spinner from '../../Spinner';


type Props = {}

const ChatUsers = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector(selectUserFollowers)
  const numberOfPages = useSelector(selectUserFollowNumberOfPages)
  const page = useSelector(selectUserFollowCurrentPage)
  const status = useSelector(selectUserFollowStatus)
  const [hasMore, setHasMore] = useState<boolean>(() => page <= numberOfPages);

  useEffect(() => {
    console.log(page)
    if (!users || users.length === 0) {
      dispatch(getFollowers(1))
    }
  }, [])

  const loadMoreUsers = () => {
    if (status === 'loading') return
    if (hasMore) {
      dispatch(getFollowers(page + 1))
      setHasMore(page <= numberOfPages)
    }
  }


  return (
    <section className="w-full overflow-y-auto max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">People</h5></div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <li className="py-3 sm:py-4">
              <ChatUser
                key={user._id}
                userId={user._id}
                name={user.name}
                image={user.image?.url}
                messageCount={21}
              />
            </li>
          ))}
        </ul>
      </div>

      {hasMore && status === 'success' &&
        <Waypoint
          onEnter={loadMoreUsers}
          bottomOffset="-100px"
        >
          <div> <Spinner /></div>
        </Waypoint>
      }

    </section>

  )
}

export default ChatUsers