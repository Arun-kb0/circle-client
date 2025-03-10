import { createAsyncThunk, } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../config/axiosInstance";
import { AppDispatch, RootState } from "../../app/store";
import configureAxios from "../../config/configureAxios";
import errorHandler from "../../errorHandler/errorHandler";
import { CommentType, LikeType, PostType } from "../../constants/FeedTypes";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { DataStrategyFunctionArgs } from "react-router-dom";
import { ReportType } from "../../constants/types";


type GetUserCreatedPostsArgs = { userId: string, page: number }
export const getUserCreatedPosts = createAsyncThunk('/posts/user-created', async ({ userId, page }: GetUserCreatedPostsArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const params = { userId, page }
    const res = await axiosPrivate.get(`/feed/user-created-posts`, { params })
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
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

type UpdatePostArgs = { post: Partial<PostType>, isAdmin?: boolean }
export const updatePost = createAsyncThunk('/post/update', async ({ post, isAdmin = false }: UpdatePostArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const path = isAdmin ? `/admin/post/` : '/post/'
    const res = await axiosPrivate.patch(`${path}${post._id}`, { post })
    removeInterceptors()
    // toast('update post success')
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

// * nested comments
type GetChildCommentsArgs = { contentId: string, parentId: string, page: number }
export const getChildComments = createAsyncThunk('/comment-child/get', async ({ contentId, parentId, page }: GetChildCommentsArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get(`/comment/child`, {
      params: { contentId, parentId, page }
    })
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

type CreateChildCommentArg = { comment: Partial<CommentType>, contentId: string, contentType: string, parentId: string }
export const createChildComment = createAsyncThunk('/comment/create-child',
  async ({ comment, contentId, contentType, parentId }: CreateChildCommentArg, { dispatch, getState }) => {
    try {
      const state = getState() as RootState
      const accessToken = state.auth.accessToken
      const dispatchFunction = dispatch as AppDispatch
      if (!accessToken) throw new Error(' no accessToken found ')
      const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
      const res = await axiosPrivate.post(`/comment/`, { comment, contentType, contentId, parentId })
      removeInterceptors()
      toast('Reply success')
      return res.data
    } catch (error) {
      console.log(error)
      return errorHandler(error)
    }
  })

export const likeChildComment = createAsyncThunk('/like-child-comment', async ({ contentId, contentType }: LikeArgs, { dispatch, getState }) => {
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

export const unlikeChildComment = createAsyncThunk('/unlike-child-comment', async (contentId: string, { dispatch, getState }) => {
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


export const updateChildComment = createAsyncThunk('/child-comment/update', async ({ comment, commentId }: UpdateCommentArgs, { dispatch, getState }) => {
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


export const deleteChildComment = createAsyncThunk('/child-comment/delete', async (commentId: string, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state?.auth.accessToken
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

// * file upload 
export const uploadFiles = createAsyncThunk('/cloudinary/upload', async (files: File[]) => {
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


type SearchPostArgs = { page: number, startDate?: string, endDate?: string, searchText?: string, isAdmin?: boolean }
export const searchPost = createAsyncThunk('/posts/search', async ({ page, searchText, startDate, endDate, isAdmin = false }: SearchPostArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const path = isAdmin ? '/admin/post/search-post' : '/feed/search-post'
    const params = {
      page,
      searchText,
      startDate,
      endDate,
    }
    const res = await axiosPrivate.get(path, { params })
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})


export const feedCounts = createAsyncThunk('/admin/posts/feed-counts', async (_, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get('/admin/post/feed-counts')
    removeInterceptors()
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

type GetPopularPostsType = { limit: number }
export const getPopularPosts = createAsyncThunk('/admin/posts/popular', async ({ limit }: GetPopularPostsType, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get('/admin/post/popular', { params: { limit } })
    removeInterceptors()
    return res.data.posts
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

type getPostsCountByDate = { startDate: string, endDate: string }
export const getPostsCountByDate = createAsyncThunk('/admin/posts/count-by-date', async ({ startDate, endDate }: getPostsCountByDate, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const params = { startDate, endDate }
    const res = await axiosPrivate.get('/admin/post/line-chart', { params })
    removeInterceptors()
    console.log("get posts by date")
    console.log(res.data)
    return res.data.postsCountArray
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

// * save and report
type SavePostArgs = { userId: string, postId: string }
export const savePost = createAsyncThunk('/post/save', async ({ userId, postId }: SavePostArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const body = { userId, postId }
    const res = await axiosPrivate.post('/post/save', body)
    removeInterceptors()
    console.log("save post")
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

type ReportArgs = { userId: string, contentId: string, contentType: ReportType['contentType'] }
export const report = createAsyncThunk('/post/report', async ({ userId, contentId, contentType }: ReportArgs, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const body = { userId, contentId, contentType }
    const res = await axiosPrivate.post('/post/report', body)
    removeInterceptors()
    console.log("report ")
    console.log(res.data)
    return res.data.reportData
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})


export const getSavedPosts = createAsyncThunk('/post/saved', async (page: number, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const params = { page }
    const res = await axiosPrivate.get('/feed/saved', { params })
    removeInterceptors()
    console.log("get saved posts")
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
})

