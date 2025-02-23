import React from 'react'
import AdminPostTable from '../AdminPostTable'
import { PostType } from '../../../constants/FeedTypes';


export const posts: PostType[] = [
  {
    _id: "post1",
    desc: "This is my first post!",
    tags: ["introduction", "first"],
    mediaType: "image",
    media: ["https://example.com/image1.jpg"],
    authorId: "user1",
    authorName: "Alice",
    authorImage: "https://example.com/alice.jpg",
    status: "active",
    likesCount: 120,
    reportsCount: 0,
    commentCount: 15,
    shareCount: 10,
    updatedAt: new Date("2025-02-20T12:00:00Z"),
    createdAt: new Date("2025-02-20T10:00:00Z"),
  },
  {
    _id: "post2",
    desc: "Check out this awesome video!",
    tags: ["video", "cool"],
    mediaType: "video",
    media: ["https://example.com/video1.mp4"],
    authorId: "user2",
    authorName: "Bob",
    authorImage: "https://example.com/bob.jpg",
    status: "active",
    likesCount: 300,
    reportsCount: 2,
    commentCount: 45,
    shareCount: 20,
    updatedAt: new Date("2025-02-21T08:30:00Z"),
    createdAt: new Date("2025-02-21T08:00:00Z"),
  },
  {
    _id: "post3",
    desc: "Just sharing some thoughts...",
    tags: ["text", "thoughts"],
    mediaType: "text",
    // No media provided for a text post
    authorId: "user3",
    authorName: "Charlie",
    authorImage: "https://example.com/charlie.jpg",
    status: "active",
    likesCount: 75,
    reportsCount: 0,
    commentCount: 8,
    shareCount: 5,
    updatedAt: new Date("2025-02-22T09:45:00Z"),
    createdAt: new Date("2025-02-22T09:00:00Z"),
  },
  {
    _id: "post4",
    desc: "Enjoying a beautiful sunset.",
    tags: ["sunset", "photography"],
    mediaType: "image",
    media: ["https://example.com/sunset.jpg"],
    authorId: "user4",
    authorName: "Dana",
    authorImage: "https://example.com/dana.jpg",
    status: "active",
    likesCount: 250,
    reportsCount: 1,
    commentCount: 30,
    shareCount: 12,
    updatedAt: new Date("2025-02-23T07:00:00Z"),
    createdAt: new Date("2025-02-23T06:00:00Z"),
  },
  {
    _id: "post5",
    desc: "Update: Post content revised.",
    tags: ["update", "revision"],
    mediaType: "text",
    // No media provided for a text post
    authorId: "user1",
    authorName: "Alice",
    authorImage: "https://example.com/alice.jpg",
    status: "active",
    likesCount: 180,
    reportsCount: 0,
    commentCount: 25,
    shareCount: 18,
    updatedAt: new Date("2025-02-23T10:00:00Z"),
    createdAt: new Date("2025-02-23T09:30:00Z"),
  },
];

type Props = {}

const PopularPosts = (props: Props) => {
  return (
    <section className='mt-6'>
      <h5 className='text-center text-xl text-bold capitalize'>popular posts</h5>
      <AdminPostTable
        posts={posts}
      />
    </section>
  )
}

export default PopularPosts