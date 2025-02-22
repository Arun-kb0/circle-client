import React, { forwardRef, ForwardedRef, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdGif } from 'react-icons/md';


type FormData = {
  comment: string;
};

type Props = {
  handleCommentSubmit: SubmitHandler<FormData>
  setIsGifPickerOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const CommentForm = forwardRef<HTMLTextAreaElement, Props>(
  ({ handleCommentSubmit, setIsGifPickerOpen }: Props, ref: React.ForwardedRef<HTMLTextAreaElement>) => {

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
      reset({ comment: '' })
      handleCommentSubmit(data)
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">

        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="commentInput" className="sr-only">Your comment</label>
          <textarea
            id="commentInput"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            required
            {...register('comment', { required: 'Comment is required' })}
            ref={(e) => {
              register('comment').ref(e); // Register the ref for react-hook-form
              if (typeof ref === 'function') {
                ref(e); // Forward the ref if it is a function
              } else if (ref) {
                ref.current = e; // Forward the ref if it is an object
              }
            }}
          />
        </div>

        <div className='flex gap-1 items-center'>
          <button type="submit" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2">
            Post comment
          </button>
          <button onClick={() => setIsGifPickerOpen(prev => !prev)} className="mx-1  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            <MdGif size={18} />
          </button>
        </div>

      </form>
    )
  })
export default CommentForm