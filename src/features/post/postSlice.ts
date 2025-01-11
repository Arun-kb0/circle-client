import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostPaginationRes, PostType } from '../../constants/FeedTypes'
import { getPosts } from './postApi'
import { RootState } from '../../app/store'
import { StateType } from '../../constants/types'

type PostStateType = {
  posts: PostType[] | [],
  postStatus: StateType,
  postPage: number
  postNumberOfPages: number
  error: string | undefined
}

const initialState: PostStateType = {
  posts: [],
  postNumberOfPages: 0,
  postPage: 1,
  postStatus: 'idle',
  error: undefined
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.postStatus = 'loading'
      })
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<PostPaginationRes>) => {
        state.postStatus = 'success'
        const { posts, numberOfPages, currentPage } = action.payload
        state.posts = posts
        state.postNumberOfPages = numberOfPages
        state.postPage = currentPage
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.postStatus = 'failed'
        state.error = action.error.message
      })

  }
})


export const selectPostPosts = (state: RootState) => state.post.posts
export const selectPostStatus = (state: RootState) => state.post.postStatus
export const selectPostNumberOfPages = (state: RootState) => state.post.postNumberOfPages
export const selectPostPage = (state: RootState) => state.post.postPage
export const selectPostError = (state: RootState) => state.post.error


export const {

} = postSlice.actions

export default postSlice.reducer