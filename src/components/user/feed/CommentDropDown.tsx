import React from 'react'

type Props = {
  userId: string
  commentAuthorId: string
  handleEdit: () => void
  handleRemove: () => void
}

const CommentDropDown = ({ userId, commentAuthorId, handleEdit, handleRemove }: Props) => {

  return (
    <div className="absolute right-0 top-10 z-10 w-auto bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200 w-full">
        {userId === commentAuthorId &&
          <>
            <li>
              <button onClick={handleEdit} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">Edit</button>
            </li>
            <li>
              <button onClick={handleRemove} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">Remove</button>
            </li>
          </>
        }
      </ul>
    </div>
  )
}

export default CommentDropDown