import React from 'react'
import NotificationCard from './NotificationCard'
import { motion } from 'framer-motion'

export type NotificationType<T = any> = {
  id: string;
  status: 'read' | 'unread';
  authorName: string;
  message: string;
  time: Date;
  data?: T;
};

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
              {testNotifications.map((notification, index) => (
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