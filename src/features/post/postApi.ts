import { createAsyncThunk, } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../config/axiosInstance";
import { AppDispatch, RootState } from "../../app/store";
import configureAxios from "../../config/configureAxios";
import errorHandler from "../../errorHandler/errorHandler";
import { CommentType, LikeType, PostType } from "../../constants/FeedTypes";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";



export const getUserCreatedPosts = createAsyncThunk('/posts/user-created', async (page: number = 1, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get(`/feed/user-created-posts?page=${page}`)
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

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
type LikeArgs = { contentId: string, contentType: LikeType['contentType'] }
export const like = createAsyncThunk('/like', async ({ contentId, contentType }: LikeArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.post(`/like/`, { contentId, contentType })
    removeInterceptors()
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

type CreateCommentArg = { comment: Partial<CommentType>, contentId: string, contentType: string, parentId?: string }
export const createComment = createAsyncThunk('/comment/create',
  async ({ comment, contentId, contentType, parentId }: CreateCommentArg, { dispatch, getState }) => {
    try {
      const state = getState() as RootState
      const accessToken = state.auth.accessToken
      const dispatchFunction = dispatch as AppDispatch
      if (!accessToken) throw new Error(' no accessToken found ')
      const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
      const res = await axiosPrivate.post(`/comment/`, { comment, contentType, contentId, parentId })
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

export const uploadFiles = createAsyncThunk('/cloudinary/upload', async (files: FileList) => {
  try {
    // ! raeplace with this
    const PRESET = import.meta.env.VITE_CLD_UPLOAD_PRESET || ''
    const CLOUD_NAME = import.meta.env.VITE_CLD_COULD_NAME || ''

    const MAX_SIZE = 10 * 1024 * 1024;
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/ogg'];
    const fileArray = Array.from(files)

    const invalidFiles = fileArray.filter((file) =>
      !validTypes.includes(file.type) || file.size > MAX_SIZE
    )
    if (invalidFiles.length > 0) {
      invalidFiles.forEach((file: File) => {
        if (!validTypes.includes(file.type)) throw new Error(`invalid file type for ${file.name}`)
        if (file.size > MAX_SIZE) throw new Error(`file is too large ${file.name}`)
      })
    }

    // * image upload code
    const urls = await Promise.all(
      fileArray.map(async (file) => {
        const newFileName = `${file.name}-${uuid()}`;
        const newFile = new File([file], newFileName, { type: file.type });

        const formData = new FormData()
        formData.append('file', newFile)
        formData.append('upload_preset', PRESET)
        formData.append('cloud_name', CLOUD_NAME)

        const resJson = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        })
        if (!resJson.ok) throw new Error(`Failed to upload: ${file.name}`);

        const res = await resJson.json()
        console.log(res.url)
        console.log('secure url')
        console.log(res.secure_url)
        return res.secure_url as string
      })
    )

    return { urls } as any
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})