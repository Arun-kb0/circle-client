import  { useEffect, useState } from 'react'
import ViewLiveModel from '../../components/user/live/ViewLiveModel'
import LiveUserCard from '../../components/user/live/LiveUserCard'
import InfiniteScroll from 'react-infinite-scroll-component';
import UserSkeletonLoader from '../../components/basic/UserSkeletonLoader';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserLiveUsers, selectUserNavOpen } from '../../features/user/userSlice';
import { getLiveUsers } from '../../features/user/userApi';
import { AppDispatch } from '../../app/store';
import { selectAuthUser } from '../../features/auth/authSlice';
import PageTitle from '../../components/basic/PageTitle';



const ViewLivePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector(selectUserLiveUsers)
  const currentUser = useSelector(selectAuthUser)
  const userNavOpen = useSelector(selectUserNavOpen)
  // const [hasMore, setHasMore] = useState<boolean>(() => page < numberOfPages);
  const [hasMore] = useState<boolean>(false);
  const [openModel, setOpenModel] = useState(false)
  const [streamerId, setStreamerId] = useState<string | null>(null)

  const handleOpen = () => { setOpenModel(true) }
  const handleClose = () => { setOpenModel(false) }

  useEffect(() => {
    dispatch(getLiveUsers())
  }, [])

  const loadMoreUsers = async () => {
    // if (status === 'loading' || !hasMore) return
    // await dispatch(getFollowers({ userId, page: page + 1 }))
    // const newPage = page + 1
    // setHasMore(newPage < numberOfPages)
  }

  // ! navigate to profile if not subscribed
  const handleViewLive = (userId: string) => {
    if (!userId) {
      console.error('invalid user id')
      return
    }
    setStreamerId(userId)
    handleOpen()
  }


  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className={`p-4 ${userNavOpen ? 'sm:ml-64 ' : ''}`}>
        <div className="p-4 mt-14 w-[70vw]">

          <PageTitle  firstWord='Watch' secondWord='Live'/>

          <AnimatePresence
            initial={false}
            mode='wait'
            onExitComplete={() => null}
          >
            {openModel &&
              <ViewLiveModel
                streamerId={streamerId as string}
                handleClose={handleClose}
              />
            }
          </AnimatePresence>

          <InfiniteScroll
            className='p-4 mt-14 flex flex-wrap justify-start gap-6 w-full '
            dataLength={users.length}
            next={loadMoreUsers}
            hasMore={hasMore}
            loader={
              <div className='space-y-4 flex flex-wrap'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <UserSkeletonLoader key={index} />
                ))}
              </div>
            }
          >

            {users.map(user => (
              currentUser?._id !== user._id &&
              <LiveUserCard
                key={user._id}
                userId={user._id}
                name={user.name}
                image={user?.image?.url}
                handleViewLive={handleViewLive}
              />
            ))}

          </InfiniteScroll>

        </div>
      </div>
    </main>
  )
}

export default ViewLivePage