import React from 'react'
import ChatUsers from '../../components/user/chat/ChatUsers'
import ChatSection from '../../components/user/chat/ChatSection'

type Props = {}

const ChatPage = (props: Props) => {
  
  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="lg:p-4 sm:p-1 mt-14 flex justify-between gap-8 lg:w-[160vh] md:w-[100vh] sm:w-[80vh]">

          <div className='w-full rounded-lg bg-gray-900 p-3  '>
            <ChatSection />
          </div>
          <div className=' col-3/12'>
            <ChatUsers />
          </div>

        </div>
      </div>
    </main>
  )
}

export default ChatPage