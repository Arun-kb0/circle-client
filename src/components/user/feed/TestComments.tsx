import React, { useState } from 'react'

const dummyComments = [
  {
    id: '1',
    comment:'tst1'
  },
  {
    id: '2',
    comment: 'tst2'
  },
  {
    id: '3',
    comment: 'tst3'
  }
]

type Props = {}

const TestComments = (props: Props) => {
  const [comments, setComments] = useState([])

  return (
    <main className='flex flex-col gap-3 h-screen w-screen'>
      <span className='text-3xl'> Nested comments</span>
      <div className='flex flex-col'>
        <input
          type="text"
          placeholder='add comment'
        />
        <button>comment</button>
      </div>
      <div>
        
      </div>
    </main>
  )
}

export default TestComments