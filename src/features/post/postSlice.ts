import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostType, StateType } from '../../constants/types'
import { getPosts } from './postApi'
import { RootState } from '../../app/store'

type PostStateType = {
  posts: PostType[] | [],
  postStatus: StateType,
  error: string | undefined
}

const initialState: PostStateType = {
  posts: [],
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
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<PostType[]>) => {
        state.postStatus = 'success'
        state.posts = action.payload
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.postStatus = 'failed'
        state.error = action.error.message
      })

  }
})


export const selectPostPosts = (state: RootState) => state.post.posts
export const selectPostStatus = (state: RootState) => state.post.postStatus
export const selectPostError = (state: RootState) => state.post.error


export const {

} = postSlice.actions

export default postSlice.reducer