import AdminHomeTop from '../../components/admin/home/AdminHomeTop'
import AdminHomeCharts from '../../components/admin/home/AdminHomeCharts'
import PopularPosts from '../../components/admin/home/PopularPosts'
import { selectUserNavOpen } from '../../features/user/userSlice'
import { useSelector } from 'react-redux'


const AdminHome = () => {
  const userNavOpen = useSelector(selectUserNavOpen)

  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className={`p-4 ${userNavOpen ? 'sm:ml-64 ' : ''}`} >
        <div className="lg:p-4 sm:p-1 mt-14 space-y-5">

          <AdminHomeTop />
          <AdminHomeCharts />
          <PopularPosts />


        </div>
      </div>
    </main>
  )
}

export default AdminHome