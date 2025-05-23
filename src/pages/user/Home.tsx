import { useEffect } from 'react'
import Feed from '../../components/user/feed/Feed'
import { TbPhoto } from "react-icons/tb";
import { TbVideo } from "react-icons/tb";
import { Link } from 'react-router-dom';
import SpringButton from '../../components/basic/SpringButton';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { getFollowing } from '../../features/user/userApi';
import { selectAuthUser } from '../../features/auth/authSlice';
import { selectUserNavOpen } from '../../features/user/userSlice';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectAuthUser)
  const userNavOpen = useSelector(selectUserNavOpen)

  useEffect(() => {
    if(!user) return
    dispatch(getFollowing({ userId: user._id, page: 1 }))
  }, [])

  return (
    <main id='home' className='main-section justify-center relative overflow-hidden ' >
      <div className={`p-4 ${userNavOpen ? 'sm:ml-64 ' : ''}`} >
        <div className="p-4 mt-14">

          <section className='flex justify-center items-center gap-8 my-5 bg-gray-900 p-4 rounded-lg shadow-lg'>
            <Link to='/go-live'>
              <SpringButton>
                <div className='flex justify-center'> <TbVideo size={35} className='bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text hover:bg-gradient-to-br' /> </div>
              </SpringButton>
              Go live
            </Link>
            <Link to='/create-post'>
              <SpringButton>
                <div className='flex justify-center'> <TbPhoto size={30} /> </div>
              </SpringButton>
              Create post
            </Link>
          </section>

          <Feed />

        </div>
      </div>
    </main>
  )
}

export default Home