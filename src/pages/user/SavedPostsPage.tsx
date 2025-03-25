import SavedPosts from '../../components/user/createPost/SavedPosts'
import PageTitle from '../../components/basic/PageTitle'
import { selectUserNavOpen } from '../../features/user/userSlice'
import { useSelector } from 'react-redux'


const SavedPostsPage = () => {
  const userNavOpen = useSelector(selectUserNavOpen)

  return (
    <main className='main-section justify-center relative overflow-hidden ' >
      <div className={`p-4 ${userNavOpen ? 'sm:ml-64 ' : ''}`}>
        <div className="p-4 mt-14">

          <PageTitle firstWord='Saved' secondWord='Posts' />

          <SavedPosts />

        </div>
      </div>
    </main>

  )
}

export default SavedPostsPage