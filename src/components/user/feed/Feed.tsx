import React from 'react'
import PostCard from './PostCard'
import { PostType } from '../../../constants/FeedTypes'


const posts: PostType[] = [
  {
    _id: '1',
    desc: 'A beautiful sunset view at the beach!',
    tags: ['sunset', 'nature', 'beach'],
    mediaType: 'image',
    media: [
      'https://i.pinimg.com/736x/7b/09/6a/7b096a018911e8186890877e0de4cff0.jpg',
      'https://i.pinimg.com/236x/46/2d/a8/462da81163457e1a2edd682c00ed5e31.jpg'
    ],
    authorId: 'user123',
    status: 'active',
    likesCount: 123,
    reportsCount: 0,
    commentCount: 10,
    shareCount: 5,
    updatedAt: new Date(),
    createdAt: new Date('2025-01-01T10:00:00Z'),
  },
  {
    _id: '2',
    desc: 'Check out this amazing recipe tutorial!',
    tags: ['cooking', 'recipe', 'food'],
    mediaType: 'image',
    media: [
      'https://i.pinimg.com/736x/b9/a6/70/b9a67049bf4fd0db1afcb733c97c8492.jpg',
      "https://i.pinimg.com/736x/8b/e9/19/8be9195cb73fe725ec469f38dcad0f67.jpg"
    ],
    authorId: 'user456',
    status: 'active',
    likesCount: 250,
    reportsCount: 2,
    commentCount: 25,
    shareCount: 12,
    updatedAt: new Date(),
    createdAt: new Date('2025-01-02T14:30:00Z'),
  },
  {
    _id: '3',
    desc: 'Motivational quote of the day!',
    tags: ['motivation', 'quotes', 'life'],
    mediaType: 'text',
    media: ["new post by me"],
    authorId: 'user789',
    status: 'active',
    likesCount: 300,
    reportsCount: 0,
    commentCount: 50,
    shareCount: 30,
    updatedAt: new Date(),
    createdAt: new Date('2025-01-03T08:15:00Z'),
  },
];


type Props = {}

const Feed = (props: Props) => {
  return (
    <main className='space-y-3'>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
        />
      ))}
    </main>
  )
}

export default Feed