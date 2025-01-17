import React, { useState } from 'react'
import ChatUser from './ChatUser';
import { useSelector } from 'react-redux';
import { selectUserFollowers } from '../../../features/user/userSlice';


type Props = {}

const ChatUsers = (props: Props) => {
  const users = useSelector(selectUserFollowers)

  return (
    <section className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">People</h5>
      </div>
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
    </section>

  )
}

export default ChatUsers