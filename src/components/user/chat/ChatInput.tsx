import React, { useState } from 'react'
import { BsSendFill } from "react-icons/bs";

type Props = {
  
}

const ChatInput = (props: Props) => {
  const [message, setMessage] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // * add message to current chat slice
    }
  } 

  return (
    <div className="mb-6">
      <div className='flex gap-7 items-center'>
        <input
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          id="large-input"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          <BsSendFill size={22} />
        </button>
      </div>

    </div>
  )
}

export default ChatInput