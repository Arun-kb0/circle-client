import React from 'react'
import ChatUser from './ChatUser';

const users = [
  {
    name: 'Alice Johnson',
    image: 'https://i.pinimg.com/236x/27/87/62/2787629fe39ee0bb053b9d1cf1906d33.jpg',
    messageCount: 12,
  },
  {
    name: 'Bob Smith',
    image: 'https://i.pinimg.com/236x/92/23/17/922317bfcac91946f5f56e9d191ea6d6.jpg',
    messageCount: 8,
  },
  {
    name: 'Carol Lee',
    image: 'https://i.pinimg.com/236x/51/94/3c/51943cc25deca6d8e426c5433a8a03fc.jpg',
    messageCount: 15,
  },
  {
    name: 'David Garcia',
    image: 'https://i.pinimg.com/236x/9d/8b/5a/9d8b5a1c5e3fef5273293d5ef21a7a33.jpg',
    messageCount: 20,
  },
  {
    name: 'Eve Thompson',
    image: 'https://i.pinimg.com/236x/4f/5c/cd/4f5ccde9aa5a5e937e523e7d1f814f62.jpg',
    messageCount: 25,
  },
];



type Props = {}

const ChatUsers = (props: Props) => {
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
                name={user.name}
                image={user.image}
                messageCount={user.messageCount}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>

  )
}

export default ChatUsers