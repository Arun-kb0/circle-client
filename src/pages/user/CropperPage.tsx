import React from 'react'
import Cropper from '../../components/user/createPost/Cropper'

type Props = {}

const CropperPage = (props: Props) => {
  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14">

          <Cropper />

        </div>
      </div>
    </main>
  )
}

export default CropperPage