import React, { useEffect, useRef, useState } from 'react'
import { CommentType, NestedCommentsType } from '../../../constants/FeedTypes'
import CommentForm from './CommentForm'
import CommentBox from './CommentBox'
import { SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, getComments } from '../../../features/post/postApi'
import {
  selectCommentedUsersModelState, selectPostComment,
  selectPostCommentCurrentPage, selectPostCommentNumberOfPages, selectPostCommentStatus, selectPostSelectedPost
} from '../../../features/post/postSlice'
import { AppDispatch } from '../../../app/store'
import InfiniteScroll from 'react-infinite-scroll-component'
import CommentSkeltonLoader from '../../basic/CommentSkeltonLoader'
import RecursiveComments from './RecursiveComments'

type FormData = {
  comment: string;
};


const commentObj: NestedCommentsType = {
  id: '1',
  comment: {
    _id: 'string',
    media: 'string',
    mediaType: 'text',
    status: 'active',
    authorId: 'string',
    authorImage: 'string',
    authorName: 'string',
    parentId: 'string',
    likesCount: 1,
    replayCount: 1,
    contentId: 'string',
    contentType: 'post',
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  items: [
    {
      id: '2',
      comment: {
        _id: 'string',
        media: 'string',
        mediaType: 'text',
        status: 'active',
        authorId: 'string',
        authorImage: 'string',
        authorName: 'string',
        parentId: 'string',
        likesCount: 1,
        replayCount: 1,
        contentId: 'string',
        contentType: 'post',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      items: []
    },
    {
      id: '3',
      comment: {
        _id: 'string',
        media: 'string',
        mediaType: 'text',
        status: 'active',
        authorId: 'string',
        authorImage: 'string',
        authorName: 'string',
        parentId: 'string',
        likesCount: 1,
        replayCount: 1,
        contentId: 'string',
        contentType: 'post',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      items: [
        {
          id: '4',
          comment: {
            _id: 'string',
            media: 'string',
            mediaType: 'text',
            status: 'active',
            authorId: 'string',
            authorImage: 'string',
            authorName: 'string',
            parentId: 'string',
            likesCount: 1,
            replayCount: 1,
            contentId: 'string',
            contentType: 'post',
            updatedAt: new Date(),
            createdAt: new Date(),
          },
          items: []
        }
      ]
    },
    {
      id: '5',
      comment: {
        _id: 'string',
        media: 'string',
        mediaType: 'text',
        status: 'active',
        authorId: 'string',
        authorImage: 'string',
        authorName: 'string',
        parentId: 'string',
        likesCount: 1,
        replayCount: 1,
        contentId: 'string',
        contentType: 'post',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      items: [
        {
          id: '6',
          comment: {
            _id: 'string',
            media: 'string',
            mediaType: 'text',
            status: 'active',
            authorId: 'string',
            authorImage: 'string',
            authorName: 'string',
            parentId: 'string',
            likesCount: 1,
            replayCount: 1,
            contentId: 'string',
            contentType: 'post',
            updatedAt: new Date(),
            createdAt: new Date(),
          },
          items: []
        }
      ]
    },
  ]
}





const CommentCard = () => {
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch<AppDispatch>()
  const comments = useSelector(selectPostComment)
  const page = useSelector(selectPostCommentCurrentPage)
  const numberOfPages = useSelector(selectPostCommentNumberOfPages)
  const status = useSelector(selectPostCommentStatus)
  const [hasMore, setHasMore] = useState<boolean>(() => page <= numberOfPages)


  const selectedPost = useSelector(selectPostSelectedPost)

  const handleFocusInput = (commentId: string, contentId: string, comment?: CommentType) => {
    if (commentInputRef.current) {
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
    if (status === 'loading' || !selectedPost) return
    dispatch(getComments({ contentId: selectedPost._id, page }))
  }, [dispatch, comments.length])

  useEffect(() => {
    setHasMore(page <= numberOfPages)
  }, [page, numberOfPages])


  const loadMorePosts = () => {
    console.log('waypoint triggered !!')
    if (page > numberOfPages || !selectedPost) return
    dispatch(getComments({ contentId: selectedPost._id, page }))
  }



  return (
    <section className="rounded-lg bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased h-[80vh] w-[60vw] overflow-hidden ">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">comments {comments.length}</h2>
        </div>

        <CommentForm
          handleCommentSubmit={handleCommentSubmit}
          ref={commentInputRef}
        />

        <InfiniteScroll
          className='space-y-4 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-400'
          scrollableTarget='home'
          dataLength={comments.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={
            <div className='space-y-4'>
              {Array.from({ length: 3 }).map((_, index) => (
                <CommentSkeltonLoader key={index} />
              ))}
            </div>
          }
          height={window.innerHeight - 440}
        >
          {comments.map((comment) => (
            <CommentBox
              onFocusInput={handleFocusInput}
              key={comment._id}
              comment={comment}
            />
          ))}
        </InfiniteScroll>

        {/* * nested comments not working */}
        {/* <RecursiveComments/> */}

      </div>
    </section>
  )
}

export default CommentCard