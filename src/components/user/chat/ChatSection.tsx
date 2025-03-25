import { useEffect, useMemo, useRef, useState } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import SocketIoClient from '../../../config/SocketIoClient';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeDeletedMessage,
  selectChatMessageCurrentPage, selectChatMessageNumberOfPages, selectChatMessages,
  selectChatMessageStatus,
  selectChatRoomId, selectChatUser,
  setAllAsReadMsgNotification,
  updateChatMessage,
} from '../../../features/chat/chatSlice';
import { AppDispatch } from '../../../app/store';
import { selectAuthUser } from '../../../features/auth/authSlice';
import {  FaVideo } from 'react-icons/fa';
import { IoMdMore } from 'react-icons/io';
import { clearChat, getRoomMessages } from '../../../features/chat/chatApi';
import DropDown from '../../basic/DropDown';
import { DropDownElementsType, MessageType } from '../../../constants/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChatSkeltonLoader from '../../basic/ChatSkeltonLoader';
import EmojiPicker, { EmojiClickData, EmojiStyle, Theme } from 'emoji-picker-react';
import { MdCall } from 'react-icons/md';
import socketEvents from '../../../constants/socketEvents';
import Avatar from '../../basic/Avatar';
import MessageTypingAnimation from '../../basic/MessageTypingAnimation';


type Props = {
  handleCallModelOpen: (type: 'audio' | 'video') => void
}

const ChatSection = ({ handleCallModelOpen }: Props) => {
  const socket = SocketIoClient.getInstance()
  const dispatch = useDispatch<AppDispatch>()

  const ref = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [emojiModelOpen, setEmojiModelOpen] = useState<boolean>(false)
  const [emoji, setEmoji] = useState<EmojiClickData | null>(null)
  const [isMessageTyping, setIsMessageTyping] = useState(false)

  const user = useSelector(selectAuthUser)
  const messageObj = useSelector(selectChatMessages)
  const roomId = useSelector(selectChatRoomId)
  const chatUser = useSelector(selectChatUser)

  const messages = useMemo(() => {
    if (roomId && messageObj && messageObj[roomId]) {
      return messageObj[roomId];
    }
    return [];
  }, [roomId, messageObj]) as MessageType[]

  const page = useSelector(selectChatMessageCurrentPage)
  const numberOfPages = useSelector(selectChatMessageNumberOfPages)
  const status = useSelector(selectChatMessageStatus)
  const [hasMore] = useState<boolean>(() => page <= numberOfPages);

  useEffect(() => {
    console.log('message - room ids')
    messages.map(msg => console.log(msg.roomId))
  }, [messages])


  const handleScrollToMessage = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', })
    }
  }

  const loadMoreMessages = () => {
    if (status === 'loading' || page > numberOfPages) return
    dispatch(getRoomMessages(page + 1))
  }

  useEffect(() => {
    if (messages.length !== 0) return
    dispatch(getRoomMessages(1))
    handleScrollToMessage()
  }, [roomId])

  useEffect(() => {
    dispatch(setAllAsReadMsgNotification())
    // dispatch(receiveMessage())
    handleScrollToMessage()
  }, [socket])

  useEffect(() => {
    const handleDeleteMessage = (msg: any) => {
      console.log(socketEvents.messageDeleted)
      dispatch(removeDeletedMessage({ message: msg }))
    }
    const handleEditMessage = (msg: any) => {
      console.log(socketEvents.editMessage)
      console.log(msg)
      dispatch(updateChatMessage({ message: msg }))
    }
    socket?.on(socketEvents.messageDeleted, handleDeleteMessage)
    socket?.on(socketEvents.editMessage, handleEditMessage)

    return () => {
      socket?.off(socketEvents.messageDeleted, handleDeleteMessage)
      socket?.off(socketEvents.editMessage, handleEditMessage)
    }
  }, [socket])

  const dropDownElements: DropDownElementsType[] = [
    {
      handler: () => {
        dispatch(clearChat())
        setOpen(false)
      },
      name: 'clear Chat'
    }
  ]

  useEffect(() => {
    const handleMessageTyping = () => { setIsMessageTyping(true) }
    const handleMessageTypingStopped = () => { setIsMessageTyping(false) }
    socket?.on(socketEvents.messageTyping, handleMessageTyping)
    socket?.on(socketEvents.messageTypingStopped, handleMessageTypingStopped)

    return () => {
      socket?.off(socketEvents.messageTyping, handleMessageTyping)
      socket?.off(socketEvents.messageTypingStopped, handleMessageTypingStopped)
    }
  }, [socket])



  return (
    <section >
      <div className='relative flex justify-start bg-gray-800 px-3 gap-4 items-center py-3 rounded-lg shadow-lg '>
        <div className='w-[65px]'>
          <Avatar
            image={chatUser?.image}
            alt={chatUser?.name}
            userId={chatUser?.userId as string}
          />
        </div>
        <h5 className='font-bold'>{chatUser?.name}</h5>
        <div className='w-full flex justify-end item-center gap-4'>
          <button onClick={() => handleCallModelOpen('video')}>
            <FaVideo size={20} />
          </button>
          <button onClick={() => handleCallModelOpen('audio')}>
            <MdCall size={20} />
          </button>
          <button onClick={() => setOpen(prev => !prev)} className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" >
            <IoMdMore size={25} />
          </button>
          <DropDown
            open={open}
            elements={dropDownElements}
            position='top-20 '
          />
        </div>
      </div>

      <div id="scrollableDiv"
        style={{ height: "60vh", overflowY: "scroll", display: "flex", flexDirection: 'column-reverse', margin: "auto" }}
        className='bg-body-tertiary p-3 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-200 py-4'
      >
        <InfiniteScroll
          dataLength={messages.length}
          next={loadMoreMessages}
          hasMore={hasMore}
          style={{ display: "flex", flexDirection: "column-reverse", overflow: "visible" }}
          scrollableTarget="scrollableDiv"
          inverse={true}
          loader={
            status === 'loading' && (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <ChatSkeltonLoader
                    key={index}
                    isSend={index % 2 === 0 ? true : false}
                  />
                ))}
              </div>
            )
          }
          className="space-y-4"
        >
          <div ref={ref} className="w-full h-24"></div>
          {isMessageTyping && <MessageTypingAnimation />}
          {!chatUser && (
            <div className="w-full h-full flex justify-center items-center">
              <h5 className="font-semibold text-lg">Select a user to chat</h5>
            </div>
          )}
          {chatUser && !hasMore && messages.length === 0 && (
            <div className="text-center">No messages</div>
          )}
          
          {messages.map((message) => (
            <ChatMessage
              key={message.updatedAt as unknown as string}
              message={message}
              isUserSendMessage={user?._id === message.authorId}
            />
          ))}
        </InfiniteScroll>
      </div>

      <div className='relative h-10 w-20'>
        <EmojiPicker
          className="absolute z-20 top-0 right-[-600px] bottom-0"
          open={emojiModelOpen}
          theme={Theme.DARK}
          emojiStyle={EmojiStyle.APPLE}
          width={350}
          height={450}
          onEmojiClick={e => setEmoji(e)}
        />
      </div>

      <ChatInput
        handleScrollToMessage={handleScrollToMessage}
        setEmojiModelOpen={setEmojiModelOpen}
        emoji={emoji}
      />

    </section>
  )
}

export default ChatSection