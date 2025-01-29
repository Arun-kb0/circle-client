import React, { useState } from 'react'
import { NestedCommentsType } from '../../../constants/FeedTypes'
import CommentForm from './CommentForm'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import { SubmitHandler } from 'react-hook-form'
import { selectPostSelectedPost } from '../../../features/post/postSlice'
import ActionBtn from './ActionBtn'
import CommentSkeltonLoader from '../../basic/CommentSkeltonLoader'
import { TbUserQuestion } from 'react-icons/tb'


type Props = {
  comment: NestedCommentsType
  handleInsertNode: (commentId: string, inputText: string) => Promise<void>
  handleEditNode: (tree: NestedCommentsType, commentId: string, inputText: string) => void
  handleDeleteNode: (commentId: string) => void
}

const RecursiveComments = ({ comment, handleInsertNode, handleDeleteNode, handleEditNode }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const selectedPost = useSelector(selectPostSelectedPost)
  const [editMode, setEditMode] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [expand, setExpand] = useState(false)
  const [input, setInput] = useState('')

  const handleCommentSubmit: SubmitHandler<{ comment: string }> = (data) => {
    const id = comment?.comment ? comment.comment._id : '1'
    handleInsertNode(id, data.comment)
    setExpand(true)
    // dispatch(createComment({
    //   comment: { mediaType: 'text', media: data.comment },
    //   contentId: selectedPost._id,
    //   contentType: 'post'
    // }))
  }

  const handleNewComment = () => {
    setExpand(!expand)
    setShowInput(true)
  }
  const onAddComment = () => {
    if (!comment?.comment) return
    setExpand(true)
    handleInsertNode(comment.comment._id, input)
    setInput("")
  }
  const style = Number(comment.id) === 1 ? '' : 'bg-gray-600 my-2 rounded-lg px-3 py-1'

  return (
    <section className={`${style}`}>
      {Number(comment.id) === 1
        ? (<CommentForm handleCommentSubmit={handleCommentSubmit} />)
        : (
          <>
            <span className='break-words'>{comment?.comment?.media}</span>
            <div className='flex'>
              {editMode
                ? <>
                  <ActionBtn type='save' handleClick={() => { }} />
                  <ActionBtn type='cancel' handleClick={() => { setEditMode(true) }} />
                </>
                : <>
                  <ActionBtn type='replay' handleClick={handleNewComment} iconType={expand ? 'chev-up' : 'chev-down'} />
                  <ActionBtn type='edit' handleClick={() => { setEditMode(true) }} />
                  <ActionBtn type='delete' handleClick={() => { }} />
                </>
              }
            </div>
          </>
        )
      }

      <div className={`pl-10 ${expand ? "block" : "hidden"}`}>
        {showInput &&
          <div>
            <textarea
              className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800 rounded-lg p-2 pl-3'
              placeholder='replay to comment'
              autoFocus
              onChange={e => setInput(e.target.value)}
            />
            <div className='flex'>
              <ActionBtn type='replay' handleClick={onAddComment} />
              <ActionBtn type='cancel' handleClick={() => { setShowInput(false) }} />
            </div>
          </div>
        }
        {comment.items.map((cmt) => (
          <RecursiveComments
            key={cmt.id}
            comment={cmt}
            handleInsertNode={handleInsertNode}
            handleEditNode={handleEditNode}
            handleDeleteNode={handleDeleteNode}
          />
        ))}
      </div>

    </section>
  )
}

export default RecursiveComments