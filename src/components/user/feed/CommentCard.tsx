import React, { useRef } from 'react'
import { CommentType } from '../../../constants/FeedTypes'
import CommentForm from './CommentForm'
import CommentBox from './CommentBox'
import { SubmitHandler } from 'react-hook-form'

type Props = {
  comments: CommentType[]
}

type FormData = {
  comment: string;
};

const CommentCard = ({ comments }: Props) => {
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const handleFocusInput = (commentId: string, contentId: string) => {
    if (commentInputRef.current) {
      console.log(contentId, commentId)
      commentInputRef.current.focus();
    }
  }

  const handleCommentSubmit:SubmitHandler<FormData> = (data) => {
    console.log(data)
  }

  return (
    <section className="rounded-lg scrollbar-hide bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased h-[80vh] w-[60vw] overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">comments {comments.length}</h2>
        </div>

        <CommentForm
          handleCommentSubmit={handleCommentSubmit}
          ref={commentInputRef}
        />
        {comments.map((comment) => (
          <CommentBox
            onFocusInput={handleFocusInput}
            key={comment._id}
            comment={comment}
          />
        ))}

      </div>
    </section>
  )
}

export default CommentCard