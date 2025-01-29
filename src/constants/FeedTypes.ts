export type PostType = {
  _id: string,
  desc?: string
  tags?: string[]
  mediaType: 'image' | 'video' | 'text',
  media?: string[],
  authorId: string,
  authorName: string,
  authorImage: string,
  status: 'active' | 'deleted' | 'blocked'
  likesCount: number
  reportsCount: number
  commentCount: number
  shareCount: number
  updatedAt: Date
  createdAt: Date
}


export type CommentType = {
  _id: string
  media: string
  mediaType: 'gif' | 'text'
  status: 'active' | 'deleted' | 'blocked'
  authorId: string
  authorImage: string
  authorName: string
  parentId: string
  likesCount: number
  replayCount: number
  contentId: string
  contentType: 'post' | 'story' | 'comment'
  updatedAt: Date
  createdAt: Date
}

export type NestedCommentsType = {
  id: string,
  comment?: CommentType
  items: NestedCommentsType[]
}

export type PostPaginationRes = {
  posts: PostType[],
  numberOfPages: number
  currentPage: number
  likes: LikeType[]
}

export type CommentPaginationRes = {
  comments: CommentType[],
  numberOfPages: number
  currentPage: number
  likes: LikeType[]
}


export type LikeType = {
  _id: string
  authorId: string
  contentId: string
  contentType: 'post' | 'story' | 'comment'
  updatedAt: Date
  createdAt: Date
  authorName?: string
  authorImage?: string
}