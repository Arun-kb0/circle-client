export type PostType = {
  _id: string,
  desc?: string
  tags?: string[]
  mediaType: 'image' | 'video' | 'text',
  media?: string[],
  authorId: string,
  status: 'active' | 'deleted' | 'blocked'
  likesCount: number
  reportsCount: number
  commentCount: number
  shareCount: number
  updatedAt: Date
  createdAt: Date
}