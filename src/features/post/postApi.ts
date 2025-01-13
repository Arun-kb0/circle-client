import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../config/axiosInstance";
import { AppDispatch, RootState } from "../../app/store";
import configureAxios from "../../config/configureAxios";
import errorHandler from "../../errorHandler/errorHandler";
import { CommentType, LikeType, PostType } from "../../constants/FeedTypes";
import { toast } from "react-toastify";


export const getPosts = createAsyncThunk('/posts/all', async (page: number = 1, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get(`/feed/global-posts?page=${page}`)
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const createPost = createAsyncThunk('/post/create', async (post: Partial<PostType>, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.post(`/post/`, { post })
    removeInterceptors()
    toast('create post success')
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const updatePost = createAsyncThunk('/post/update', async (post: Partial<PostType>, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.patch(`/post/`, { post })
    removeInterceptors()
    toast('update post success')
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const deletePost = createAsyncThunk('/post/delete', async (postId: string, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.delete(`/post/${postId}`)
    removeInterceptors()
    toast('delete post success')
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

// * like
type LikeArgs = { contentId: string, contentType: Pick<LikeType, 'contentType'> }
export const like = createAsyncThunk('/like', async ({ contentId, contentType }: LikeArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.post(`/like/`, { contentId, contentType })
    removeInterceptors()
    toast('like post success')
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const unlike = createAsyncThunk('/unlike', async (contentId: string, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.delete(`/like/${contentId}`)
    removeInterceptors()
    toast('like post success')
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

// * comment
type GetCommentArgs = { contentId: string, page: number }
export const getComments = createAsyncThunk('/comment/get', async ({ contentId, page }: GetCommentArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get(`/comment`, {
      params: { contentId, page }
    })
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

type CreateCommentArg = { comment: Partial<CommentType>, contentId: string, contentType: string }
export const createComment = createAsyncThunk('/comment/create',
  async ({ comment, contentId, contentType }: CreateCommentArg, { dispatch, getState }) => {
    try {
      const state = getState() as RootState
      const accessToken = state.auth.accessToken
      const dispatchFunction = dispatch as AppDispatch
      if (!accessToken) throw new Error(' no accessToken found ')
      const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
      const res = await axiosPrivate.post(`/comment/`, { comment, contentType, contentId })
      removeInterceptors()
      toast('create comment success')
      return res.data
    } catch (error) {
      console.log(error)
      return errorHandler(error)
    }
  })

type UpdateCommentArgs = { comment: CommentType, commentId: string }
export const updateComment = createAsyncThunk('/comment/update', async ({ comment, commentId }: UpdateCommentArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.patch(`/comment`, { comment, commentId })
    removeInterceptors()
    toast('update comment success')
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

export const deleteComment = createAsyncThunk('/comment/delete', async (commentId: string, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.delete(`/comment/${commentId}`)
    removeInterceptors()
    toast('delete comment success')
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

