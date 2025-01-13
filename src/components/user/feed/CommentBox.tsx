import React, { useState } from 'react'
import { CommentType } from '../../../constants/FeedTypes'
import moment from 'moment'
import { IoIosMore } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../../features/auth/authSlice';
import { BiCommentDots } from "react-icons/bi";
import { GoHeart } from "react-icons/go";
import SpringButton from '../../basic/SpringButton';
import { HiOutlineUserCircle } from "react-icons/hi2";
import CommentDropDown from './CommentDropDown';
import { AppDispatch } from '../../../app/store';
import { updateComment } from '../../../features/post/postApi';


type Props = {
  comment: CommentType
  onFocusInput: (commentId: string, contentId: string) => void
}

const CommentBox = ({ comment, onFocusInput }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectAuthUser)
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [editValue, setEditValue] = useState(comment.media)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFocusInput = (type: 'edit' | 'create') => {
    onFocusInput(comment._id, comment.contentId)
    setIsEdit(prev => !prev)
  }

  const handleEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (editValue.length > 0) {
        dispatch(updateComment({
          commentId: comment._id,
          comment: { ...comment, media: editValue }
        }))
      }
    }
  }

  return (
    <article className="relative p-6 pb-0 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">

        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <SpringButton>
              {comment.authorImage
                ? <img className="mr-2 w-6 h-6 rounded-full" src={comment.authorImage} alt="Michael Gough" />
                : <HiOutlineUserCircle size={22} className='mr-2 w-6 h-6 rounded-full' />
              }
            </SpringButton>
            {comment.authorName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{moment(comment.updatedAt).format('MMMM Do, YYYY [at] h:mm A')}</p>
        </div>

        <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={toggleDropdown} >
          <IoIosMore size={22} />
          <span className="sr-only">Comment settings</span>
        </button>

        {user && isOpen &&
          <CommentDropDown
            handleFocusInput={handleFocusInput}
            user={user}
            comment={comment}
          />
        }
      </footer>
      {comment.mediaType === 'text' &&
        isEdit
        ? <input
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleEdit}
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={editValue} required
        />
        : <p className="text-gray-600 dark:text-gray-100">{comment.media} </p>
      }

      <div className="flex items-center mt-4 space-x-4">
        <button className="flex items-center gap-3 text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
          <SpringButton>
            <GoHeart size={20} />
          </SpringButton>
          {comment.likesCount}
        </button>
        <button className="flex items-center gap-3 text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
          <SpringButton>
            <BiCommentDots size={20} />
          </SpringButton>
          {comment.replayCount}
        </button>
        <button onClick={() => handleFocusInput('create')} className="flex items-center gap-3 text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
          <SpringButton>
            Replay
          </SpringButton>
        </button>
      </div>
      <div className='bg-gray-400 w-full h-0.5 rounded-lg my-3' ></div>
    </article >
  )
}

export default CommentBox