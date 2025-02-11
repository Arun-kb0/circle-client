import React, { useEffect, useState } from 'react'
import AdminPostTable from '../../components/admin/AdminPostTable'
import { PostType } from '../../constants/FeedTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { selectUserUsers } from '../../features/user/userSlice';
import {
  selectPostNumberOfPages, selectPostPage, selectPostPosts,
  selectPostSelectedPost, selectPostStatus
} from '../../features/post/postSlice';
import { FieldValues } from 'react-hook-form';
import DatePicker from '../../components/DatePicker';
import Search from '../../components/Search';
import { getPosts, searchPost, updatePost } from '../../features/post/postApi';
import Pagination from '../../components/basic/Pagination';
import { toast } from 'react-toastify';

export const posts: PostType[] = [
  {
    _id: '1',
    desc: 'This is a sample post 1',
    tags: ['sample', 'post'],
    mediaType: 'image',
    media: ['https://example.com/image1.jpg'],
    authorId: 'user1',
    authorName: 'John Doe',
    authorImage: 'https://example.com/user1.jpg',
    status: 'active',
    likesCount: 10,
    reportsCount: 0,
    commentCount: 5,
    shareCount: 2,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    _id: '2',
    desc: 'This is a sample post 2',
    tags: ['example', 'post'],
    mediaType: 'video',
    media: ['https://example.com/video1.mp4'],
    authorId: 'user2',
    authorName: 'Jane Smith',
    authorImage: 'https://example.com/user2.jpg',
    status: 'active',
    likesCount: 20,
    reportsCount: 1,
    commentCount: 8,
    shareCount: 3,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    _id: '3',
    desc: 'This is a sample post 3',
    tags: ['fun', 'post'],
    mediaType: 'text',
    // For text posts, the media property can be omitted or left empty
    authorId: 'user3',
    authorName: 'Alice Johnson',
    authorImage: 'https://example.com/user3.jpg',
    status: 'active',
    likesCount: 5,
    reportsCount: 0,
    commentCount: 2,
    shareCount: 1,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    _id: '4',
    desc: 'This is a sample post 4',
    tags: ['news', 'post'],
    mediaType: 'image',
    media: ['https://example.com/image2.jpg'],
    authorId: 'user4',
    authorName: 'Bob Brown',
    authorImage: 'https://example.com/user4.jpg',
    status: 'active',
    likesCount: 15,
    reportsCount: 2,
    commentCount: 4,
    shareCount: 0,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    _id: '5',
    desc: 'This is a sample post 5',
    tags: ['random', 'post'],
    mediaType: 'video',
    media: ['https://example.com/video2.mp4'],
    authorId: 'user5',
    authorName: 'Charlie Davis',
    authorImage: 'https://example.com/user5.jpg',
    status: 'active',
    likesCount: 30,
    reportsCount: 0,
    commentCount: 10,
    shareCount: 5,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
];


type Props = {}

const PostManagement = (props: Props) => {

  const dispatch = useDispatch<AppDispatch>()

  const [startDate, setStartDate] = useState<Date>(() => {
    const currentDate = new Date()
    const oneYearBefore = new Date()
    oneYearBefore.setMonth(currentDate.getMonth() - 1)
    return oneYearBefore
  })
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)

  const posts = useSelector(selectPostPosts)
  const status = useSelector(selectPostStatus)
  const currentPage = useSelector(selectPostPage)
  const numberOfPages = useSelector(selectPostNumberOfPages)


  useEffect(() => {
    dispatch(searchPost({
      page,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      searchText: searchText,
      isAdmin: true
    }))
  }, [page])


  const handleBlock = (post: PostType) => {
    const updatedPost: Partial<PostType> = { ...post, status: 'blocked' }
    dispatch(updatePost({ post: updatedPost, isAdmin: true }))
    toast('Post blocked')
  }

  const handleUnblock = (post: PostType) => {
    const updatedPost: Partial<PostType> = { ...post, status: 'active' }
    dispatch(updatePost({ post: updatedPost, isAdmin: true }))
    toast('Post unblocked')
  }

  const handleFilter = (data: FieldValues | undefined) => {
    dispatch(searchPost({
      page: page,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      searchText: data?.searchText ? data?.searchText : '',
      isAdmin: true
    }))
  }

  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="lg:p-4 sm:p-1 mt-14 flex justify-between gap-8 lg:w-[160vh] md:w-[100vh] sm:w-[80vh]">

          <div className='mt-10'>
            <div className='flex space-x-5 items-end'>
              <DatePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
              <button onClick={handleFilter} className="text-white  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> find </button>
              <Search
                handleSearch={handleFilter}
              />
            </div>

            <AdminPostTable
              posts={posts}
              handleBlock={handleBlock}
              handleUnblock={handleUnblock}
            />

            <Pagination
              numberOfPages={numberOfPages ? numberOfPages : 0}
              currentPage={currentPage ? currentPage : 0}
              page={page}
              setPage={setPage}
            />
          </div>


        </div>
      </div>
    </main>
  )
}

export default PostManagement