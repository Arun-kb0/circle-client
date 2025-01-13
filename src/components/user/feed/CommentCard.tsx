import React, { useEffect, useRef, useState } from 'react'
import { CommentType } from '../../../constants/FeedTypes'
import CommentForm from './CommentForm'
import CommentBox from './CommentBox'
import { SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, getComments } from '../../../features/post/postApi'
import { selectPostComment, selectPostSelectedPost } from '../../../features/post/postSlice'
import { AppDispatch } from '../../../app/store'

type Props = {
}

type FormData = {
  comment: string;
};

const CommentCard = () => {
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch<AppDispatch>()
  const comments = useSelector(selectPostComment)
  const selectedPost = useSelector(selectPostSelectedPost)

  const [page, setPage] = useState(1)

  const handleFocusInput = (commentId: string, contentId: string, comment?: CommentType) => {
    if (commentInputRef.current) {
      console.log("comment")
      console.log(comment)
      // if (comment) {
      //   commentInputRef.current.value = comment.media[0]
      // }
      commentInputRef.current.focus();
    }
  }

  const handleCommentSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    if (!selectedPost) return
    dispatch(createComment({
      comment: { mediaType: 'text', media: data.comment },
      contentId: selectedPost._id,
      contentType: 'post'
    }))
  }

  useEffect(() => {
    if (!selectedPost) return
    dispatch(getComments({ contentId: selectedPost._id, page }))
  }, [])

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