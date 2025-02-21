import React from 'react'
import LiveStream from '../../components/user/live/LiveStream'

type Props = {}

const GoLivePage = (props: Props) => {
  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14 w-[70vw]">

          <LiveStream />

        </div>
      </div>
    </main>
  )
}

export default GoLivePage