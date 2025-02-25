import React from 'react'
import { NotificationType } from '../../constants/types'
import moment from 'moment'
import { LuNewspaper } from 'react-icons/lu'
import { TiTickOutline } from 'react-icons/ti'

type Props = {
  notification: NotificationType
}

const NotificationCard = ({ notification }: Props) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center">
        <div className="text-gray-300 bg-gray-700 rounded-full p-2">
          {notification.status === 'unread'
            ? <LuNewspaper />
            : <TiTickOutline />
          }
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white"> {notification.message}</p>
          <div className='flex gap-2'>
            <p className="text-xs text-gray-200 truncate dark:text-gray-200">{notification.authorName}</p>
            <p className="text-xs text-gray-500 truncate dark:text-gray-400">{moment(notification.time).fromNow()}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default NotificationCard