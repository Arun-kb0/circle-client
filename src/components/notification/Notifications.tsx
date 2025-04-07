import { useEffect, useState } from 'react'
import NotificationCard from './NotificationCard'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserNotificationNumberOfPages, selectUserNotificationPage, selectUserNotifications, selectUserNotificationsStatus, selectUserUnreadNotificationsCount } from '../../features/user/userSlice';
import { getNotifications, readNotifications } from '../../features/user/userApi';
import { AppDispatch } from '../../app/store';
import { selectAuthUser } from '../../features/auth/authSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import NotificationCardSkeletonLoader from '../basic/NotificationCardSkeletonLoader';


type Props = {
  open: boolean,
  position: string
}

const Notifications = ({ position, open }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectAuthUser)
  const notifications = useSelector(selectUserNotifications)
  const numberOfPages = useSelector(selectUserNotificationNumberOfPages)
  const page = useSelector(selectUserNotificationPage)
  const status = useSelector(selectUserNotificationsStatus)
  const unreadNotificationCount = useSelector(selectUserUnreadNotificationsCount)
  const [hasMore, setHasMore] = useState<boolean>(() => page <= numberOfPages)

  useEffect(() => {
    if (unreadNotificationCount > 0) {
      dispatch(readNotifications())
    }
  }, [])

  useEffect(() => {
    if (!user || notifications.length !== 0) return
    dispatch(getNotifications({ page: 1, receiverId: user._id }))
  }, [])

  useEffect(() => {
    setHasMore(page <= numberOfPages)
  }, [page, numberOfPages])

  const loadMorePosts = () => {
    if (!user) return
    if (status === 'loading' || page > numberOfPages) return
    dispatch(getNotifications({ page: page + 1, receiverId: user._id }))
  }

  return (
    <>
      {open &&
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className={`${position} z-30 absolute h-[80vh] w-auto max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700`}
        >

          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-bold leading-none text-gray-900 dark:text-white">Notifications</h5>
          </div>
          <InfiniteScroll
            className='flow-root overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500'
            scrollableTarget='home'
            dataLength={notifications.length}
            next={loadMorePosts}
            hasMore={hasMore}
            loader={status === 'loading' &&
              <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
                {Array.from({ length: 10 }).map((_, index) => (
                  <NotificationCardSkeletonLoader key={index} />
                ))}
              </ul>
            }
            height={window.innerHeight - 240}
          >
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {status === 'success' &&
                notifications.map((notification, index) => (
                  <NotificationCard
                    key={index}
                    notification={notification}
                  />
                ))
              }
            </ul>
          </InfiniteScroll>

        </motion.div>
      }
    </>
  )
}

export default Notifications