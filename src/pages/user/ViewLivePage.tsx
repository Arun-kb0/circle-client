import React from 'react'
import ViewLiveModel from '../../components/user/live/ViewLiveModel'

type Props = {}

const ViewLivePage = (props: Props) => {
  const handleClose = () => { }
  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14 w-[70vw]">
          
          <h5 className='text-xl font-semibold'>live stream</h5>
          <ViewLiveModel
            handleClose={handleClose}
          />

        </div>
      </div>
    </main>
  )
}

export default ViewLivePage