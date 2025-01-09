import React from 'react'
import { PostType } from '../../../constants/FeedTypes'
import { GoHeart } from "react-icons/go";
import { BiCommentDots } from "react-icons/bi";
import { IoShareSocialOutline } from "react-icons/io5";
import PostImages from './PostImages';
import { motion } from 'framer-motion'
import SpringButton from '../../basic/SpringButton';

type Props = {
  post: PostType
}

const PostCard = ({ post }: Props) => {

  const handleImageView = () => {

  }
  const handleLike = () => {

  }
  const handleComment = () => {

  }
  const handleShare = () => {

  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="max-w-sm lg:min-w-[500px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      {post.mediaType === 'image' && post.media &&
        <PostImages media={post.media} />
      }
      <div className="p-5">
        {post.mediaType === 'text' && post.media &&
          <h5 className="mb-2 text-lg font-bold tracking-tight  dark:text-white">{post.media[0]}</h5>
        }
        <div className='flex flex-wrap justify-start items-center gap-2'>
          {post.tags?.map((tag) => (
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">{`#${tag}`}</p>
          ))}
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.desc}</p>
        <div className='flex justify-start space-x-5 items-center'>
          <button onClick={handleLike} className='flex items-center mr-3 gap-2'>
            <SpringButton>
              <GoHeart size={20} />
            </SpringButton>
            {post.likesCount}
          </button>
          <button onClick={handleComment} className='flex items-center mr-3 gap-2'>
            <SpringButton>
              <BiCommentDots size={20} />
            </SpringButton>
            {post.commentCount}
          </button>
          <button onClick={handleShare} className='flex items-center mr-3 gap-2'>
            <SpringButton>
              <IoShareSocialOutline size={20} />
            </SpringButton>
            {post.shareCount}
          </button>
        </div>

      </div>
    </motion.div>

  )
}

export default PostCard