import LiveStream from '../../components/user/live/LiveStream'
import { selectUserNavOpen } from '../../features/user/userSlice'
import { useSelector } from 'react-redux'


const GoLivePage = () => {
  const userNavOpen = useSelector(selectUserNavOpen)

  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className={`p-4 ${userNavOpen ? 'sm:ml-64 ' : ''}`}>
        <div className="p-4 mt-14 w-[70vw]">

          <LiveStream />

        </div>
      </div>
    </main>
  )
}

export default GoLivePage