import React, { useEffect, useState } from 'react'
import { CommentType, LikeType } from '../../../constants/FeedTypes'
import moment from 'moment'
import { IoIosMore } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../../features/auth/authSlice';
import { GoHeart, GoHeartFill } from "react-icons/go";
import SpringButton from '../../basic/SpringButton';
import { HiOutlineUserCircle } from "react-icons/hi2";
import CommentDropDown from './CommentDropDown';
import { AppDispatch } from '../../../app/store';
import {
  createChildComment, deleteChildComment, deleteComment, getChildComments,
  like, likeChildComment, unlike,
  unlikeChildComment, updateChildComment, updateComment
} from '../../../features/post/postApi';
import { selectPostSelectedPost, setCommentReplayCount } from '../../../features/post/postSlice';
import { toast } from 'react-toastify';
import GifPicker from '../../basic/GifPicker';
import { MdGif } from 'react-icons/md';
import { stringOrNumber } from '@cloudinary/url-gen/types/types';

type Props = {
  comment: CommentType
  level: number,
  commentLikesArray: LikeType[]
}

const CommentBox = ({ comment: currentComment, level, commentLikesArray }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectAuthUser)
  const selectedPost = useSelector(selectPostSelectedPost)

  const [isCommentDeleted, setIsCommentDeleted] = useState(false)
  const [comment, setComment] = useState<CommentType>(currentComment)
  const [commentLikes, setCommentLikes] = useState<LikeType[]>(commentLikesArray)

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [editValue, setEditValue] = useState(comment.mediaType === 'text' ? comment.media : '')
  const [replayValue, setReplayValue] = useState('')

  const [comments, setComments] = useState<CommentType[]>([])
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyInput, setShowReplyInput] = useState(false)

  const [gifPickerOpen, setGifPickerOpen] = useState<'edit' | 'replay' | 'idle'>('idle')

  const [isLiked, setIsLiked] = useState(() => {
    if (!user) return false
    const status = commentLikes.find(like => like.contentId === comment._id && like.authorId === user._id)
    return status ? true : false
  })

  const toggleDropdown = () => { setIsOpen(!isOpen) }

  const handlePrepareEdit = () => { setIsEdit(prev => !prev) }

  const handleRemove = () => {
    comment.parentId
      ? dispatch(deleteChildComment(comment._id))
      : dispatch(deleteComment(comment._id))
    setComments([])
    setIsCommentDeleted(true)
  }

  const handleEdit = (mediaType: CommentType['mediaType'], url?: string) => {
    if (mediaType == 'text' && editValue.length === 0) return
    console.log(url)
    const editedComment: CommentType = {
      ...comment,
      mediaType: mediaType === 'gif' ? 'gif' : 'text',
      media: (mediaType === 'gif' && url) ? url : editValue
    }
    comment.parentId
      ? dispatch(updateChildComment({
        commentId: comment._id,
        comment: editedComment
      }))
      : dispatch(updateComment({
        commentId: comment._id,
        comment: editedComment
      }))
    setComment(editedComment)
    setIsEdit(false)
    setIsOpen(false)
    setGifPickerOpen('idle')
  }

  const handleEditOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEdit('text')
  }

  const handleLike = () => {
    comment.parentId
      ? dispatch(likeChildComment({ contentId: comment._id, contentType: 'comment', }))
      : dispatch(like({ contentId: comment._id, contentType: 'comment' }))
    setComment(prev => ({ ...prev, likesCount: prev.likesCount + 1 }))
    setIsLiked(true)
  }

  const handleUnlike = () => {
    comment.parentId
      ? dispatch(unlikeChildComment(comment._id))
      : dispatch(unlike(comment._id))
    setIsLiked(false)
    setComment(prev => ({ ...prev, likesCount: prev.likesCount - 1 }))
    setIsLiked(false)
  }

  const handleGetReplies = async () => {
    if (comment.replayCount === 0) return
    setShowReplies(prev => !prev)
    const data = await dispatch(getChildComments({
      contentId: selectedPost?._id as string,
      parentId: comment._id as string,
      page: 1,
    })).unwrap()
    setCommentLikes(data.likes)
    setComments(data.comments)
  }

  const handleReplay = async (mediaType: CommentType['mediaType'], url?: string) => {
    if (mediaType === 'text' && replayValue === '') {
      toast('Cannot create a empty reply')
      return
    }
    const repliedComment: Partial<CommentType> = {
      parentId: comment._id,
      mediaType: mediaType === 'gif' ? 'gif' : 'text',
      media: (mediaType === 'gif' && url) ? url : replayValue
    }
    const data = await dispatch(createChildComment({
      comment: repliedComment,
      contentId: selectedPost?._id as string,
      contentType: 'post',
      parentId: comment._id
    })).unwrap()
    setComment(prev => ({ ...prev, replayCount: prev.replayCount + 1 }))
    setReplayValue('')
    setShowReplyInput(false)
    setGifPickerOpen('idle')
    if (!comment.parentId) {
      dispatch(setCommentReplayCount({
        commentId: comment._id,
        count: comment.replayCount + 1
      }))
    }
  }

  const handleReplyOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleReplay('text')
    }
  }

  const handleGifSelect = (url: string) => {
    if (gifPickerOpen === 'idle') return
    if (gifPickerOpen === 'edit') {
      handleEdit('gif', url)
    } else {
      handleReplay('gif', url)
    }
    setShowReplyInput(false)
  }

  return (
    <>
      <article className="text-base shadow-lg"
        style={{
          marginLeft: `${2 * level}rem`,
          display: isCommentDeleted ? 'none' : ''
        }}
      >
        {gifPickerOpen !== 'idle' && <GifPicker onGifSelect={handleGifSelect} />}

        <footer className="relative flex justify-between items-center">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
              <SpringButton>
                {comment.authorImage
                  ? <img className="mr-2 w-6 h-6 rounded-full object-cover" src={comment.authorImage} alt={comment.authorName} />
                  : <HiOutlineUserCircle className='mr-2 w-6 h-6 rounded-full' />
                }
              </SpringButton>
              <span className='text-xs'>  {comment.authorName} </span>
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{moment(comment.updatedAt).fromNow()}</p>
          </div>

          {user?._id === comment.authorId &&
            <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={toggleDropdown} >
              <IoIosMore size={16} />
              <span className="sr-only">Comment settings</span>
            </button>
          }

          {isOpen &&
            <CommentDropDown
              userId={user?._id as string}
              commentAuthorId={comment.authorId}
              handleEdit={handlePrepareEdit}
              handleRemove={handleRemove}
            />
          }

        </footer>

        <div className='border-l-2 border-b-2 border-gray-600 ml-2 p-2.5 rounded-bl-xl'>
          {isEdit
            ? (
              <div>
                <input
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleEditOnEnter}
                  type="text"
                  id="first_name"
                  className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={editValue}
                  required
                />
                <div className='flex gap-1 '>
                  <button onClick={() => setGifPickerOpen('edit')} className="mx-1  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    <MdGif size={18} />
                  </button>
                  <button onClick={() => handleEdit('text')} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">save</button>
                  <button onClick={() => setIsEdit(false)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">cancel</button>
                </div>
              </div>
            ) : (
              comment.mediaType === 'gif'
                ? <img src={comment.media} alt="media" />
                : <p>{comment.media}</p>
            )
          }

          {showReplyInput &&
            <div>
              <input
                onChange={(e) => setReplayValue(e.target.value)}
                onKeyDown={handleReplyOnEnter}
                placeholder='write a reply'
                type="text"
                id="replay-comment"
                className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={replayValue} required
              />

              <div className='flex gap-1 '>
                <button onClick={() => setGifPickerOpen('replay')} className="mx-1  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <MdGif size={18} />
                </button>
                <button onClick={() => handleReplay('text')} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">save</button>
                <button onClick={() => setShowReplyInput(false)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">cancel</button>
              </div>
            </div>
          }

          <div className="flex items-center mt-2 space-x-3">
            {isLiked ? (
              <button onClick={handleUnlike} className="flex items-center gap-2">
                <SpringButton>
                  <GoHeartFill size={20} fill="red" />
                </SpringButton>
                {comment.likesCount}
              </button>
            ) : (
              <button onClick={handleLike} className="flex items-center gap-2">
                <SpringButton>
                  <GoHeart size={20} />
                </SpringButton>
                {comment.likesCount}
              </button>
            )}

            <button onClick={handleGetReplies} className="flex items-center gap-3 text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
              <SpringButton>
                <span className='capitalize pr-2'>replies</span>
                {comment.replayCount}
              </SpringButton>
            </button>
            <button onClick={() => setShowReplyInput(prev => !prev)} className="flex items-center gap-3 text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
              <SpringButton>
                Replay
              </SpringButton>
            </button>
          </div>

        </div>
      </article >

      {showReplies && comments?.map(comment => (
        <CommentBox
          key={comment._id}
          comment={comment}
          commentLikesArray={commentLikes}
          level={level + 1}
        />
      ))
      }

    </>
  )
}

export default CommentBox