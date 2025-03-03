import React, { useEffect, useState } from 'react'
import { BsSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { selectChatRoomId } from '../../../features/chat/chatSlice';
import { selectAuthUser } from '../../../features/auth/authSlice';
import { AppDispatch } from '../../../app/store';
import { sendMessage } from '../../../features/chat/chatApi';
import { EmojiClickData } from 'emoji-picker-react'
import { MdEmojiEmotions, MdGif } from 'react-icons/md';
import GifPicker from '../../basic/GifPicker';

type Props = {
  handleScrollToMessage: () => void
  setEmojiModelOpen: React.Dispatch<React.SetStateAction<boolean>>
  emoji: EmojiClickData | null

}

const ChatInput = ({ handleScrollToMessage, setEmojiModelOpen, emoji }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const roomId = useSelector(selectChatRoomId)
  const user = useSelector(selectAuthUser)
  const [currentMessage, setCurrentMessage] = useState('')
  const [gifPickerOpen, setGifPickerOpen] = useState<boolean>(false)

  const handleSendMessage = () => {
    if (user && roomId && currentMessage !== "") {
      dispatch(sendMessage({ roomId, user, currentMessage, mediaType: 'text' }))
      setCurrentMessage("")
      handleScrollToMessage()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleGifSelect = (url: string) => {
    if (user && roomId) {
      dispatch(sendMessage({ roomId, user, currentMessage: url, mediaType: 'gif' }))
      setCurrentMessage("")
      setGifPickerOpen(false)
      handleScrollToMessage()
    }
  }

  useEffect(() => {
    if (!emoji) return
    setCurrentMessage(prev => prev + emoji.emoji)
    setEmojiModelOpen(false)
  }, [emoji])


  return (
    <div className="mb-1 relative">
      {gifPickerOpen && <GifPicker onGifSelect={handleGifSelect} />}

      <div className='flex gap-7 items-center'>
        <input
          onChange={e => setCurrentMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          value={currentMessage}
          type="text"
          id="large-input"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <div className='flex justify-center items-center gap-2'>
          <button onClick={() => setGifPickerOpen(prev => !prev)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            <MdGif size={20} />
          </button>
          <button onClick={() => setEmojiModelOpen(prev => !prev)} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
            <MdEmojiEmotions size={18} />
          </button>
          <button onClick={handleSendMessage} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            <BsSendFill size={18} />
          </button>
        </div>
      </div>

    </div>
  )
}

export default ChatInput