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
  parentId: string
  likesCount: number
  replayCount: number
  contentId: string
  contentType: 'post' | 'story' | 'comment'
  updatedAt: Date
  createdAt: Date
}

export type PostPaginationRes = {
  posts: PostType[],
  numberOfPages: number
  currentPage: number
}

export type CommentPaginationRes = {
  posts: PostType[],
  numberOfPages: number
  currentPage: number
}
