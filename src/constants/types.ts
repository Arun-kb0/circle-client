

export type StateType = 'loading' | 'success' | 'failed' | 'idle'

export type UserType = {
  _id: string
  name: string
  email: string
  password: string
  age?: number
  location?: string
  state?: string
  gender?: string
  role: 'admin' | 'user'
  followeeCount: number
  followerCount: number
  refreshToken: string
  status: 'blocked' | 'deleted' | 'active'
  isOnline: boolean
  image?: {
    url?: string
    name?: string
  }
  createdAt: Date
  updatedAt: Date
}


export type PaginationUsers = {
  users: UserType[];
  numberOfPages: number;
  currentPage: number;
}

export type MessageType = {
  id: string
  roomId: string
  authorId: string
  authorName: string
  authorImage?: string
  message: string
  time: Date
  status: 'sent' | 'received' | 'seen'
}

export type ChatUserType = {
  userId: string
  name: string,
  image?: string 
}

