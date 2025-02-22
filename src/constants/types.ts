
export type CallStatusType = 'idle' | 'incoming-call' | 'call-end' | 'call-active'
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
  receiverId: string
  mediaType: 'text' | 'audio' | 'photo'
  message: string
  createdAt: Date
  updatedAt: Date
  status: 'sent' | 'received' | 'seen'
}

export type ChatUserType = {
  userId: string
  name: string,
  image?: string
}


export type NotificationType<T = any> = {
  id: string
  status: 'read' | 'unread'
  authorName: string
  message: string
  time: Date,
  data?: T
}


export type DropDownElementsType = {
  handler: () => void
  name: string
}

export type ChatRoomType = {
  _id: string,
  roomId: string
  userId: string
  targetId: string
  createdAt: Date
  updatedAt: Date
}

export type PaginationMessages = {
  messages: MessageType[],
  numberOfPages: number,
  currentPage: number
}

export type SignalDataType = {
  type: string;
  roomId: string;
  caller: string;
  receiverId: string
  offer?: RTCSessionDescription;
  answer?: RTCSessionDescription;
  candidate?: RTCIceCandidate;
}


export type UserRoomNotificationType = {
  type: 'incoming-call'
  roomId: string
  caller: string
  chatUser?: ChatUserType
}

export type AuthenticationResponseType = {
  user: UserType
  accessToken: string
  friendsRoomId: string
}


export type CallUserEventDataType = {
  signal: any
  from: string
  name: string
  userToCall: string
}

export type LiveUserDataType = {
  signal: any
  from: string
  name: string
  userId: string
}

export type AnsweredLiveDataType = {
  signal: any
  userId: string
}

export type LiveMessageType = {
  id: string
  streamerId: string
  authorId: string
  authorName: string
  authorImage?: string
  message: string
  createdAt: Date
  updatedAt: Date
}

