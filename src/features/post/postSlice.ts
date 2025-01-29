import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommentPaginationRes, CommentType, LikeType, PostPaginationRes, PostType } from '../../constants/FeedTypes'
import {
  createComment, createPost, deleteComment,
  deletePost, getComments, getPosts, getUserCreatedPosts, like,
  unlike,
  updateComment, updatePost,
  uploadFiles
} from './postApi'
import { RootState } from '../../app/store'
import { StateType } from '../../constants/types'

type PostStateType = {
  selectedPost: PostType | null
  posts: PostType[],
  postStatus: StateType,
  postPage: number
  postNumberOfPages: number

  likes: LikeType[]
  commentLikes: LikeType[]
  likeState: StateType

  comments: CommentType[]
  commentStatus: StateType
  commentNumberOfPages: number
  commentCurrentPage: number

  uploadedFiles: string[]
  uploadedFilesStatus: StateType

  error: string | undefined

  userCreatedPosts: PostType[],
  userCreatedPostStatus: StateType,
  userCreatedPostsCurrentPage: number
  userCreatedPostsNumberOfPages: number

  likedUsersModelState: boolean
  commentedUsersModelState: boolean
}

const initialState: PostStateType = {
  selectedPost: null,
  posts: [],
  postNumberOfPages: 5,
  postPage: 1,
  postStatus: 'idle',

  likes: [],
  commentLikes: [],
  likeState: 'idle',

  comments: [],
  commentStatus: 'idle',
  commentNumberOfPages: 0,
  commentCurrentPage: 1,

  uploadedFiles: [],
  uploadedFilesStatus: 'idle',

  error: undefined,

  userCreatedPosts: [],
  userCreatedPostStatus: 'idle',
  userCreatedPostsCurrentPage: 0,
  userCreatedPostsNumberOfPages: 0,

  likedUsersModelState: false,
  commentedUsersModelState: false
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {

    selectPost: (state, action: PayloadAction<PostType>) => {
      state.selectedPost = action.payload
    },

    setLikedUsersModelState: (state, action: PayloadAction<boolean>) => {
      state.likedUsersModelState = action.payload
    },
    setCommentedUsersModelState: (state, action: PayloadAction<boolean>) => {
      state.commentedUsersModelState = action.payload
    },

  },

  extraReducers: (builder) => {
    builder
      // * post
      .addCase(getUserCreatedPosts.pending, (state) => {
        state.userCreatedPostStatus = 'loading'
      })
      .addCase(getUserCreatedPosts.fulfilled, (state, action: PayloadAction<PostPaginationRes>) => {
        state.userCreatedPostStatus = 'success'
        const { posts, numberOfPages, currentPage, likes } = action.payload
        const postIds = new Set(posts.map(post => post._id))
        const updatedPosts = state.userCreatedPosts.filter(post => !postIds.has(post._id))
        state.userCreatedPosts = [...posts, ...updatedPosts]
        state.userCreatedPostsNumberOfPages = numberOfPages
        state.userCreatedPostsCurrentPage = currentPage
        state.likes = [...state.likes, ...likes]

      })
      .addCase(getUserCreatedPosts.rejected, (state, action) => {
        state.userCreatedPostStatus = 'failed'
        state.error = action.error.message
      })


      .addCase(getPosts.pending, (state) => {
        state.postStatus = 'loading'
      })
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<PostPaginationRes>) => {
        state.postStatus = 'success'
        const { posts, numberOfPages, currentPage, likes } = action.payload
        const existingPostIds = new Set(state.posts.map(post => post._id));
        const newPosts = posts.filter(post => !existingPostIds.has(post._id));
        state.posts = [...state.posts, ...newPosts];
        state.postNumberOfPages = numberOfPages;
        state.postPage = currentPage;
        state.likes = [...state.likes, ...likes];
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.postStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(createPost.pending, (state) => {
        state.postStatus = 'loading'
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<{ post: PostType }>) => {
        state.postStatus = 'success'
        const { post } = action.payload
        state.posts.unshift(post)

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

      })
      .addCase(updatePost.rejected, (state, action) => {
        state.postStatus = 'failed'
        state.error = action.error.message
      })

      .addCase(deletePost.fulfilled, (state, action: PayloadAction<{ postId: string }>) => {
        state.postStatus = 'success'
        const { postId } = action.payload
        state.posts = state.posts.filter(post => post._id !== postId)

      })
      .addCase(deletePost.rejected, (state, action) => {
        state.postStatus = 'failed'
        state.error = action.error.message
      })

      // * comments
      .addCase(getComments.pending, (state) => {
        state.commentStatus = 'loading'
      })
      .addCase(getComments.fulfilled, (state, action: PayloadAction<CommentPaginationRes>) => {
        if (!state.selectedPost) return
        state.commentStatus = 'success'
        const { comments, currentPage, numberOfPages, likes } = action.payload
        state.comments = comments
        state.commentCurrentPage = currentPage
        state.commentNumberOfPages = numberOfPages
        state.commentLikes = likes
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
        if (comment.contentType === 'post') {
          const updatedPosts = state.posts.map((post) => {
            if (post._id === comment.contentId) post.commentCount++
            return post
          })
          state.posts = updatedPosts
        }
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
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<{ commentId: string, contentType: CommentType['contentType'] }>) => {
        state.commentStatus = 'success'
        const { commentId, contentType } = action.payload
        state.comments = state.comments.filter(item => item._id !== commentId)
        if (contentType === 'post' || true) {
          const updatedPosts = state.posts.map((post) => {
            if (post._id === commentId) post.commentCount--
            return post
          })
          state.posts = updatedPosts
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.commentStatus = 'failed'
        state.error = action.error.message
      })

      // * likes
      .addCase(like.fulfilled, (state, action: PayloadAction<{ like: LikeType }>) => {
        state.likeState = 'success'
        const { like } = action.payload

        if (like.contentType === 'post') {
          state.posts.map((post) => {
            if (post._id === like.contentId) post.likesCount++
            return post
          })
          state.likes.push(like)
        } else if (like.contentType === 'comment') {
          state.comments.map((comment) => {
            if (comment._id === like.contentId) comment.likesCount++
            return comment
          })
          state.commentLikes.push(like)
        }
      })
      .addCase(like.rejected, (state, action) => {
        state.likeState = 'failed'
        state.error = action.error.message
      })

      .addCase(unlike.fulfilled, (state, action: PayloadAction<{ like: LikeType }>) => {
        state.likeState = 'success'
        const { like } = action.payload

        if (like.contentType === 'post') {
          state.posts.map((post) => {
            if (post._id === like.contentId) post.likesCount--
            return post
          })
          const updatedLikes = state.likes.filter(item => item._id === like._id)
          state.likes = updatedLikes
        } else if (like.contentType === 'comment') {
          state.comments.map((comment) => {
            if (comment._id === like.contentId) comment.likesCount--
            return comment
          })
          const updatedLikes = state.commentLikes.filter(item => item._id === like._id)
          state.commentLikes = updatedLikes
        }
      })
      .addCase(unlike.rejected, (state, action) => {
        state.likeState = 'failed'
        state.error = action.error.message
      })

      // * image upload
      .addCase(uploadFiles.pending, (state) => {
        state.uploadedFilesStatus = 'loading'
      })
      .addCase(uploadFiles.fulfilled, (state, action: PayloadAction<{ urls: string[] }>) => {
        state.uploadedFilesStatus = 'success'
        state.uploadedFiles = action.payload.urls
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        state.uploadedFilesStatus = 'failed'
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

export const selectPostLikes = (state: RootState) => state.post.likes
export const selectPostCommentLikes = (state: RootState) => state.post.commentLikes
export const selectPostLikeStatus = (state: RootState) => state.post.likeState

export const selectUploadFiles = (state: RootState) => state.post.uploadedFiles
export const selectUploadFilesStatus = (state: RootState) => state.post.uploadedFilesStatus


export const selectPostUserCreatedPosts = (state: RootState) => state.post.userCreatedPosts
export const selectPostUserCreatedStatus = (state: RootState) => state.post.userCreatedPostStatus
export const selectPostUserCreatedNumberOfPages = (state: RootState) => state.post.userCreatedPostsNumberOfPages
export const selectPostUserCreatedCurrentPage = (state: RootState) => state.post.userCreatedPostsCurrentPage

export const selectLikedUsersModelState = (state: RootState) => state.post.likedUsersModelState
export const selectCommentedUsersModelState = (state: RootState) => state.post.commentedUsersModelState

export const {
  selectPost,
  setCommentedUsersModelState,
  setLikedUsersModelState,
} = postSlice.actions

export default postSlice.reducer