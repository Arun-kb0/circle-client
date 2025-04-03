import { useState } from 'react'
import { PostType } from '../../../constants/FeedTypes'
import { GoHeart } from "react-icons/go";
import { BiCommentDots } from "react-icons/bi";
import { IoShareSocialOutline } from "react-icons/io5";
import PostImages from './PostImages';
import { motion } from 'framer-motion'
import SpringButton from '../../basic/SpringButton';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { deletePost, like, report, savePost, unlike } from '../../../features/post/postApi'
import {
  selectPost, selectPostLikes,
  selectPostSavedPosts,
  setCommentedUsersModelState, setLikedUsersModelState,
} from '../../../features/post/postSlice';
import { selectAuthUser } from '../../../features/auth/authSlice';
import { GoHeartFill } from "react-icons/go";
import DropDown from '../../basic/DropDown';
import { DropDownElementsType } from '../../../constants/types';
import { IoIosMore } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../basic/Avatar';
import { CiBookmark, CiBookmarkCheck } from 'react-icons/ci';
import { toast } from 'react-toastify';


type Props = {
  post: PostType,
  openCommentModel: (post: PostType) => void
  isGridView?: boolean
}

const PostCard = ({ post, openCommentModel, isGridView = false }: Props) => {
  const navigatorRouter = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const likes = useSelector(selectPostLikes)
  const user = useSelector(selectAuthUser)
  const savedPosts = useSelector(selectPostSavedPosts)
  // const reports = useSelector(selectPostReports)

  const [isSavedPost, setIsSavedPost] = useState<boolean>(() => {
    return Boolean(savedPosts.find(item => item._id === post._id))
  })
  // const [isReportedPost, setIsReportedPost] = useState<boolean>(() => {
  //   return Boolean(reports.find(item => item.contentType === 'post' && item.contentId === post._id))
  // })
  const [openPostDropdown, setOpenPostDropdown] = useState(false)

  const userPostDropdownElements: DropDownElementsType[] = [
    {
      handler: () => { dispatch(deletePost(post._id)) },
      name: "delete"
    },
    {
      handler: () => { navigatorRouter('/edit-post', { state: post }) },
      name: 'edit'
    }
  ]

  const postDropdownElements: DropDownElementsType[] = [
    {
      handler: async () => {
        await dispatch(report({
          userId: user?._id as string,
          contentId: post._id,
          contentType: 'post'
        })).unwrap()
        toast(`post created by ${post.authorName} reported`)
      },
      name: "report"
    }
  ]

  const [isLiked, setIsLiked] = useState(() => {
    if (!user) return false
    const status = likes.find(like => like.contentId === post._id && like.authorId === user._id)
    return status ? true : false
  })

  // const handleImageView = () => {}

  const handleLike = () => {
    dispatch(like({ contentId: post._id, contentType: 'post' }))
    setIsLiked(true)
  }

  const handleUnlike = () => {
    dispatch(unlike(post._id))
    setIsLiked(false)
  }

  const handleShare = async () => {
    // dispatch(setSharePostModelOpen({ open: true, postId: post._id }))
    const url = window.location.href
    const title = post.mediaType === 'text' ? post.desc : 'Shared post'
    const text = 'shared post'
    try {
      if (navigator.share) {
        await navigator.share({ url, title, text });
        console.log('Content shared successfully!');
      } else {
        console.log('Web Share API is not supported in this browser.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }

  const handleShowLikedUsers = () => {
    dispatch(selectPost(post))
    dispatch(setLikedUsersModelState(true))
  }

  const handleSavePost = () => {
    dispatch(savePost({
      userId: user?._id as string,
      postId: post._id
    }))
    setIsSavedPost(prev => !prev)
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`${isGridView ? 'w-60 h-auto' : 'sm:w-[50vw] w-[90vw]'} nav-bg-color rounded-lg shadow overflow-hidden`}
    >
      <div className="flex items-center justify-between m-2 relative" >
        <div className='flex justify-start items-center'>
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <Avatar
              image={post.authorImage}
              alt={post.authorName}
              userId={post.authorId}
            />
            {post.authorId === user?._id ? 'You' : post.authorName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{moment(post.updatedAt).fromNow()}</p>
        </div>

        <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => setOpenPostDropdown(prev => !prev)} >
          <IoIosMore size={17} />
          <span className="sr-only">Comment settings</span>
        </button>
        <DropDown
          open={openPostDropdown}
          elements={post.authorId === user?._id ? userPostDropdownElements : postDropdownElements}
          position='right-0 top-10'
        />
      </div>

      {post.mediaType === 'image' && post.media &&
        <PostImages
          media={post.media}
          isGridView={isGridView}
        />
      }
      <div className="p-5">
        {post.mediaType === 'text' && post.media &&
          <h5 className="mb-2 text-lg font-bold tracking-tight  dark:text-white">{post.media[0]}</h5>
        }
        <div className='flex flex-wrap justify-start items-center gap-2'>
          {post.tags?.map((tag, index) => (
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400" key={index}>{`#${tag}`}</p>
          ))}
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.desc}</p>
        <div className='flex justify-start space-x-5 items-center'>

          <div className='flex'>
            {isLiked ? (
              <button onClick={handleUnlike} className="flex items-center mr-3 gap-2">
                <SpringButton>
                  <GoHeartFill size={20} fill="red" />
                </SpringButton>
              </button>
            ) : (
              <button onClick={handleLike} className="flex items-center mr-3 gap-2">
                <SpringButton>
                  <GoHeart size={20} />
                </SpringButton>
              </button>
            )}
            <button onClick={handleShowLikedUsers}>{post.likesCount}</button>
          </div>

          <div className='flex'>
            <button onClick={() => openCommentModel(post)} className='flex items-center mr-3 gap-2'>
              <SpringButton>
                <BiCommentDots size={20} />
              </SpringButton>
            </button>
            <button onClick={() => { dispatch(setCommentedUsersModelState(true)) }}>  {post.commentCount} </button>
          </div>
          <button onClick={handleShare} className='flex items-center mr-3 gap-2'>
            <SpringButton>
              <IoShareSocialOutline size={20} />
            </SpringButton>
          </button>

          {isSavedPost
            ? (
              <button onClick={handleSavePost} className='flex items-center mr-3 gap-2'>
                <SpringButton>
                  <CiBookmarkCheck size={20} />
                </SpringButton>
              </button>
            ) : (
              <button onClick={handleSavePost} className='flex items-center mr-3 gap-2'>
                <SpringButton>
                  <CiBookmark size={20} />
                </SpringButton>
              </button>
            )
          }

        </div>
      </div>

    </motion.div>

  )
}

export default PostCard