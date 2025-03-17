import React, { useEffect, useState } from 'react'
import NotificationCard from './NotificationCard'
import { motion } from 'framer-motion'
import { NotificationType } from '../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserNotificationNumberOfPages, selectUserNotificationPage, selectUserNotifications, selectUserUnreadNotificationsCount } from '../../features/user/userSlice';
import { getNotifications, readNotifications } from '../../features/user/userApi';
import { AppDispatch } from '../../app/store';
import { selectAuthUser } from '../../features/auth/authSlice';


const testNotifications: NotificationType[] = [
  {
    id: '1',
    status: 'read',
    authorName: 'Alice',
    message: 'Your order has been shipped.',
    time: new Date(),
  },
  {
    id: '2',
    status: 'unread',
    authorName: 'Bob',
    message: 'New comment on your post.',
    time: new Date(),
  },
  {
    id: '3',
    status: 'read',
    authorName: 'Charlie',
    message: 'You have a new follower!',
    time: new Date(),
  },
  {
    id: '4',
    status: 'unread',
    authorName: 'Dana',
    message: 'Your password was changed successfully.',
    time: new Date(),
  },
  {
    id: '5',
    status: 'read',
    authorName: 'Eve',
    message: 'Welcome to our service!',
    time: new Date(),
  },
];



type Props = {
  open: boolean,
  position: string
}

const Notifications = ({ position, open }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectAuthUser)
  const notifications = useSelector(selectUserNotifications)
  const numberOfPages = useSelector(selectUserNotificationNumberOfPages)
  const unreadNotificationCount = useSelector(selectUserUnreadNotificationsCount)
  const page = useSelector(selectUserNotificationPage)

  useEffect(() => {
    if (unreadNotificationCount > 0) {
      dispatch(readNotifications())
    }
  }, [])

  useEffect(() => {
    if (!user) return
    dispatch(getNotifications({ page: 1, receiverId: user._id }))
  }, [page])

  return (
    <>
      {open &&
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className={`${position} z-30 absolute  w-auto max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700`}
        >
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-bold leading-none text-gray-900 dark:text-white">Notifications</h5>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {notifications.map((notification, index) => (
                <NotificationCard
                  key={index}
                  notification={notification}
                />
              ))
              }
            </ul>
          </div>
        </motion.div>
      }
    </>
  )
}

export default Notifications