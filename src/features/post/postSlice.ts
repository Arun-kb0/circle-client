import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommentType, LikeType, PostPaginationRes, PostType } from '../../constants/FeedTypes'
import {
  createComment, createPost, deleteComment,
  deletePost, getComments, getPosts, like,
  unlike,
  updateComment, updatePost
} from './postApi'
import { RootState } from '../../app/store'
import { StateType } from '../../constants/types'

type PostStateType = {
  selectedPost: PostType | null
  posts: PostType[],
  postStatus: StateType,
  postPage: number
  postNumberOfPages: number

  likes: Record<string, LikeType[]> | null
  likeState: StateType

  comments: CommentType[]
  commentStatus: StateType
  commentNumberOfPages: number
  commentCurrentPage: number

  error: string | undefined
}

const initialState: PostStateType = {
  selectedPost: null,
  posts: JSON.parse(sessionStorage.getItem('posts') || '[]'),
  postNumberOfPages: 0,
  postPage: 1,
  postStatus: 'idle',

  likes: null,
  likeState: 'idle',

  comments: [],
  commentStatus: 'idle',
  commentNumberOfPages: 0,
  commentCurrentPage: 1,

  error: undefined
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<PostType>) => {
      state.selectedPost = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      // * post
      .addCase(getPosts.pending, (state) => {
        state.postStatus = 'loading'
      })
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<PostPaginationRes>) => {
        state.postStatus = 'success'
        const { posts, numberOfPages, currentPage } = action.payload
        state.posts.push(...posts)
        state.postNumberOfPages = numberOfPages
        state.postPage = currentPage
        sessionStorage.setItem('user-posts', JSON.stringify(state.posts))
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.postStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(createPost.pending, (state) => {
        state.postStatus = 'loading'
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<PostType>) => {
        state.postStatus = 'success'
        const newPost = action.payload
        state.posts.unshift(newPost)
        sessionStorage.setItem('user-posts', JSON.stringify(state.posts))
      })
      .addCase(createPost.rejected, (state, action) => {
        state.postStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(updatePost.pending, (state) => {
        state.postStatus = 'loading'
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<PostType>) => {
        state.postStatus = 'success'
        const updatedPost = action.payload
        state.posts.map(post => post._id === updatedPost._id ? updatedPost : post)
        sessionStorage.setItem('user-posts', JSON.stringify(state.posts))
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.postStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(deletePost.fulfilled, (state, action: PayloadAction<{ postId: string }>) => {
        state.postStatus = 'success'
        const { postId } = action.payload
        state.posts = state.posts.filter(post => post._id !== postId)
        sessionStorage.setItem('user-posts', JSON.stringify(state.posts))
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.postStatus = 'failed'
        state.error = action.error.message
      })

      // * comments
      .addCase(getComments.pending, (state) => {
        state.commentStatus = 'loading'
      })
      .addCase(getComments.fulfilled, (state, action: PayloadAction<{ comments: CommentType[], numberOfPages: number, currentPage: number }>) => {
        if (!state.selectedPost) return
        state.commentStatus = 'success'
        const { comments, currentPage, numberOfPages } = action.payload
        // comments.length > 0 && state.selectedPost._id !== comments[0].contentId
        //   ? state.comments = [...comments]
        //   : state.comments = [...comments, ...state.comments]
        state.comments = comments
        state.commentCurrentPage = currentPage
        state.commentNumberOfPages = numberOfPages
        sessionStorage.setItem('user-comments', JSON.stringify(state.comments))
      })
      .addCase(getComments.rejected, (state, action) => {
        state.commentStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(createComment.pending, (state) => {
        state.commentStatus = 'loading'
      })
      .addCase(createComment.fulfilled, (state, action: PayloadAction<{ comment: CommentType }>) => {
        state.commentStatus = 'success'
        const { comment } = action.payload
        state.comments.unshift(comment)
        sessionStorage.setItem('user-comments', JSON.stringify(state.comments))
      })
      .addCase(createComment.rejected, (state, action) => {
        state.commentStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(updateComment.pending, (state) => {
        state.commentStatus = 'loading'
      })
      .addCase(updateComment.fulfilled, (state, action: PayloadAction<{ comment: CommentType }>) => {
        state.commentStatus = 'success'
        const { comment } = action.payload
        const updatedComments = state.comments.filter(item => item._id !== comment._id)
        updatedComments.unshift(comment)
        state.comments = updatedComments
        sessionStorage.setItem('user-comments', JSON.stringify(state.comments))
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.commentStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(deleteComment.pending, (state) => {
        state.commentStatus = 'loading'
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<{ commentId: string, }>) => {
        state.commentStatus = 'success'
        const { commentId } = action.payload
        state.comments = state.comments.filter(item => item._id !== commentId)
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.commentStatus = 'failed'
        state.error = action.error.message
      })

      // * likes
      // ! not finished
      .addCase(like.fulfilled, (state, action: PayloadAction<{ like: LikeType }>) => {
        state.likeState = 'success'
        const { like } = action.payload
        console.log(like)
      })
      .addCase(like.rejected, (state, action) => {
        state.likeState = 'failed'
        state.error = action.error.message
      })

      .addCase(unlike.fulfilled, (state, action: PayloadAction<{ like: LikeType }>) => {
        state.likeState = 'success'
        const { like } = action.payload
        console.log(like)
      })
      .addCase(unlike.rejected, (state, action) => {
        state.likeState = 'failed'
        state.error = action.error.message
      })

  }
})


export const selectPostPosts = (state: RootState) => state.post.posts
export const selectPostStatus = (state: RootState) => state.post.postStatus
export const selectPostNumberOfPages = (state: RootState) => state.post.postNumberOfPages
export const selectPostPage = (state: RootState) => state.post.postPage
export const selectPostError = (state: RootState) => state.post.error

export const selectPostSelectedPost = (state: RootState) => state.post.selectedPost

export const selectPostComment = (state: RootState) => state.post.comments
export const selectPostCommentStatus = (state: RootState) => state.post.commentStatus
export const selectPostCommentNumberOfPages = (state: RootState) => state.post.commentNumberOfPages
export const selectPostCommentCurrentPage = (state: RootState) => state.post.commentCurrentPage

export const {
  selectPost
} = postSlice.actions

export default postSlice.reducer