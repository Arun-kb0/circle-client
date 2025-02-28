import React, { useEffect, useState } from 'react'
import ViewLiveModel from '../../components/user/live/ViewLiveModel'
import LiveUserCard from '../../components/user/live/LiveUserCard'
import InfiniteScroll from 'react-infinite-scroll-component';
import UserSkeletonLoader from '../../components/basic/UserSkeletonLoader';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserLiveUsers } from '../../features/user/userSlice';
import { getLiveUsers } from '../../features/user/userApi';
import { AppDispatch } from '../../app/store';
import { selectAuthUser } from '../../features/auth/authSlice';

type Props = {}


const ViewLivePage = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector(selectUserLiveUsers)
  const currentUser = useSelector(selectAuthUser)
  // const [hasMore, setHasMore] = useState<boolean>(() => page < numberOfPages);
  const [hasMore, setHasMore] = useState<boolean>(false);
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
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14 w-[70vw]">

          <div className='py-3 flex justify-center items-center'>
            <h5 className='capitalize text-center text-xl font-semibold tracking-wider '>live stream</h5>
          </div>

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