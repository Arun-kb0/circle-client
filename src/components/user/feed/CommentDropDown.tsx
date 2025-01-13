import React from 'react'
import { UserType } from '../../../constants/types'
import { CommentType } from '../../../constants/FeedTypes'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import { deleteComment } from '../../../features/post/postApi'

type Props = {
  user: UserType
  comment: CommentType
  handleFocusInput: (type: 'edit' | 'create') => void
}

const CommentDropDown = ({ user, comment, handleFocusInput }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleRemove = () => { dispatch(deleteComment(comment._id)) }
  const handleReport = () => { }

  return (
    <div className="absolute right-0 top-14 z-10 w-auto bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200 w-full">
        {user && user._id === comment.authorId &&
          <>
            <li>
              <button onClick={() => handleFocusInput('edit')} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">Edit</button>
            </li>
            <li>
              <button onClick={handleRemove} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">Remove</button>
            </li>
          </>
        }
        <li>
          <button onClick={handleReport} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">Report</button>
        </li>
      </ul>
    </div>
  )
}

export default CommentDropDown