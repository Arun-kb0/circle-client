import { PostType } from "./FeedTypes"

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
  mediaType: 'text' | 'audio' | 'photo' | 'gif'
  message: string
  createdAt: string
  updatedAt: string
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

export type NotificationDataType = {
  _id: string
  authorId: string
  receiverId: string
  type: 'call' | 'message' | 'follow' | 'like' | 'comment' | 'replay'
  message: string
  read: boolean
  createdAt: string
  updatedAt: string,
  authorName: string
  authorImage?: string
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

export type LineChartDatum = {
  x: string; // ISO date string (e.g., "2020-01-01")
  y: number;
}
export type LineChartDataType = {
  id: string;
  color: string;
  data: LineChartDatum[];
}

export type PieChartType = {
  id: string,
  label: string,
  value: number,
  color: string
}

export type FeedCountsType = {
  totalPostsCount: number;
  totalCommentsCount: number
  totalLikesCount: number
}

export type UsersCountTypes = {
  usersCount: number
  femaleUsersCount: number
  maleUsersCount: number
  otherUsersCount: number
}

export type CountByDataType = {
  date: string
  count: number
}

export type PaginationNotification = {
  numberOfPages: number,
  currentPage: number,
  notifications: NotificationDataType[],
}

export type TransactionType = {
  _id: string;
  userId: string;
  senderId: string
  receiverId: string
  type: 'credit' | 'debit'
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string
  updatedAt: string
  userName: string
  userImage?: string
}

export type SubscriptionsType = {
  _id: string
  merchantTransactionId: string
  subscriberUserId: string
  subscriberToUserId: string
  plan: 'monthly' | 'yearly' | 'lifetime'
  status: 'inactive' | 'active' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export type WalletType = {
  _id: string
  userId: string,
  balance: number
  currency: string
  createdAt: string
  updatedAt: string
}

export type TransactionPagination = {
  transactions: TransactionType[];
  numberOfPages: number;
  currentPage: number;
}

export type SubscriptionPagination = {
  subscriptions: SubscriptionsType[];
  numberOfPages: number;
  currentPage: number;
}

export type SavedType = {
  _id: string;
  userId: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export type ReportType = {
  _id: string;
  userId: string;
  contentId: string;
  contentType: 'post' | 'story' | 'user' | 'comment';
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type PaginationSavedPost = {
  savedPosts: PostType[];
  numberOfPages: number;
  currentPage: number;
}

export type ReportAdminType = {
  _id: string
  userId: string
  contentId: string
  contentType: 'post' | 'story' | 'user' | 'comment'
  description?: string
  createdAt: string
  updatedAt: string
  userName: string
  userImage?: string
  post: PostType
}


export type SubscriptionWithUserType = {
  _id: string
  merchantTransactionId: string
  subscriberUserId: string
  subscriberToUserId: string
  plan: 'monthly' | 'yearly' | 'lifetime'
  status: 'inactive' | 'active' | 'cancelled'
  createdAt: string
  updatedAt: string
  subscriberUserName: string
  subscriberUserImage: string
  subscriberToUserName: string
  subscriberToUserImage: string
}


export type TransactionWithUsersType = {
  _id: string;
  userId: string;
  senderId: string
  receiverId: string
  type: 'credit' | 'debit'
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string
  updatedAt: string
  senderName: string
  senderImage?: string
  receiverName: string
  receiverImage?: string
}


export type PaginationReportFiltered = {
  reports: ReportAdminType[]
  numberOfPages: number
  currentPage:number
}

export type PaginationSubscriptionFiltered = {
  subscriptions: SubscriptionWithUserType[]
  numberOfPages: number
  currentPage:number
}