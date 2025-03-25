import Cropper from '../../components/user/createPost/Cropper'
import { selectUserNavOpen } from '../../features/user/userSlice'
import { useSelector } from 'react-redux'


const CropperPage = () => {
  const userNavOpen = useSelector(selectUserNavOpen)

  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className={`p-4 ${userNavOpen ? 'sm:ml-64 ' : ''}`}>
        <div className="p-4 mt-14">

          <Cropper />

        </div>
      </div>
    </main>
  )
}

export default CropperPage