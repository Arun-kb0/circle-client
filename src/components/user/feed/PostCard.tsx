import React, { useEffect, useState } from 'react'
import { PostType } from '../../../constants/FeedTypes'
import { GoHeart } from "react-icons/go";
import { BiCommentDots } from "react-icons/bi";
import { IoShareSocialOutline } from "react-icons/io5";
import PostImages from './PostImages';
import { motion } from 'framer-motion'
import SpringButton from '../../basic/SpringButton';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { deletePost, like, unlike } from '../../../features/post/postApi'
import { selectPost, selectPostLikes, setCommentedUsersModelState, setLikedUsersModelState } from '../../../features/post/postSlice';
import { selectAuthUser } from '../../../features/auth/authSlice';
import { GoHeartFill } from "react-icons/go";
import DropDown from '../../basic/DropDown';
import { DropDownElementsType } from '../../../constants/types';
import { IoIosMore } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';


type Props = {
  post: PostType,
  openCommentModel: (post: PostType) => void
}

const PostCard = ({ post, openCommentModel }: Props) => {
  const navigator = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const likes = useSelector(selectPostLikes)
  const user = useSelector(selectAuthUser)

  const [openPostDropdown, setOpenPostDropdown] = useState(false)
  const postDropdownElements: DropDownElementsType[] = [
    {
      handler: () => { dispatch(deletePost(post._id)) },
      name: "delete"
    },
    {
      handler: () => { navigator('/edit-post', { state: post }) },
      name: 'edit'
    }
  ]

  const [isLiked, setIsLiked] = useState(() => {
    if (!user) return false
    const status = likes.find(like => like.contentId === post._id && like.authorId === user._id)
    return status ? true : false
  })

  const handleImageView = () => {

  }

  const handleLike = () => {
    dispatch(like({ contentId: post._id, contentType: 'post' }))
    setIsLiked(true)
  }

  const handleUnlike = () => {
    dispatch(unlike(post._id))
    setIsLiked(false)
  }

  const handleShare = () => {

  }

  const handleShowLikedUsers = () => {
    dispatch(selectPost(post))
    dispatch(setLikedUsersModelState(true))
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="lg:w-[50vw] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex items-center justify-between m-2 relative" >
        <div className='flex justify-start items-center'>
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <SpringButton>
              {post.authorImage
                ? <img className="mr-2 w-6 h-6 rounded-full object-cover" src={post.authorImage} alt="Michael Gough" />
                : <HiOutlineUserCircle size={22} className='mr-2 w-6 h-6 rounded-full' />
              }
            </SpringButton>
            {post.authorId === user?._id ? 'You' : post.authorName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{moment(post.updatedAt).fromNow()}</p>
        </div>

        {post.authorId === user?._id &&
          <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => setOpenPostDropdown(prev => !prev)} >
            <IoIosMore size={17} />
            <span className="sr-only">Comment settings</span>
          </button>
        }
        <DropDown
          open={openPostDropdown}
          elements={postDropdownElements}
          position='right-0 top-10'
        />
      </div>

      {post.mediaType === 'image' && post.media &&
        <PostImages media={post.media} />
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

        </div>



      </div>
    </motion.div>

  )
}

export default PostCard