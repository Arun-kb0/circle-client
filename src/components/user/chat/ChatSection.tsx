import React, { useState } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import SendMessage from './SendMessage';

const messages = [
  {
    name: "Alice Johnson",
    time: new Date("2023-01-01T10:30:00"),
    status: "delivered",
    message: "Hi! How are you doing today?",
  },
  {
    name: "Bob Smith",
    time: new Date("2023-01-01T10:35:00"),
    status: "read",
    message: "Hey, did you check out the new feature update?",
  },
  {
    name: "Charlie Brown",
    time: new Date("2023-01-01T10:40:00"),
    status: "sent",
    message: "Good morning! Are we still on for the meeting?",
  },
  {
    name: "Diana Prince",
    time: new Date("2023-01-01T10:45:00"),
    status: "read",
    message: "Sure, let me know the details when you're ready.",
  },
  {
    name: "Ethan Hunt",
    time: new Date("2023-01-01T10:50:00"),
    status: "delivered",
    message: "Got it! I'll get back to you shortly.",
  },
];


type Props = {}

const ChatSection = (props: Props) => {

  return (
    <section>
      <div className='w-full h-[70vh] space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-200 py-4'>
        {messages.map((message, index) => (
          index % 2 === 0
            ? < ChatMessage
              name={message.name}
              userImage={undefined}
              time={message.time}
              status={message.status}
              message={message.message}
            />
            : <SendMessage
              name={message.name}
              userImage={undefined}
              time={message.time}
              status={message.status}
              message={message.message}
            />
        ))}
      </div>

      <ChatInput />
    </section>
  )
}

export default ChatSection