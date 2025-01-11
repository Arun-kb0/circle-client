import React from 'react'
import CommentCard from './CommentCard'
import BackdropVerifyOtp from '../../backdrop/BackdropVerifyOtp'
import { motion } from 'framer-motion'
import { CommentType } from '../../../constants/FeedTypes';
import { dropIn } from '../../../constants/animationDropins';


const comments: CommentType[] = [
  {
    _id: "cmt1",
    media: "https://example.com/media1.gif",
    mediaType: "gif", // Must match the literal type 'gif' | 'text'
    status: "active", // Must match the literal type 'active' | 'deleted' | 'blocked'
    authorId: "user1",
    parentId: "post1",
    likesCount: 5,
    replayCount: 2,
    contentId: "post1",
    contentType: "post", // Must match the literal type 'post' | 'story' | 'comment'
    updatedAt: new Date("2025-01-01T10:00:00Z"),
    createdAt: new Date("2025-01-01T09:00:00Z"),
  },
  {
    _id: "cmt2",
    media: "awsom",
    mediaType: "text",
    status: "active",
    authorId: "user2",
    parentId: "cmt1",
    likesCount: 12,
    replayCount: 0,
    contentId: "post1",
    contentType: "comment",
    updatedAt: new Date("2025-01-02T14:30:00Z"),
    createdAt: new Date("2025-01-02T14:00:00Z"),
  },
  {
    _id: "cmt3",
    media: "😂😂😂",
    mediaType: "text",
    status: "deleted",
    authorId: "user3",
    parentId: "post2",
    likesCount: 0,
    replayCount: 0,
    contentId: "post2",
    contentType: "post",
    updatedAt: new Date("2025-01-03T08:45:00Z"),
    createdAt: new Date("2025-01-03T08:30:00Z"),
  },
  {
    _id: "cmt4",
    media: "https://example.com/media2.gif",
    mediaType: "gif",
    status: "active",
    authorId: "user4",
    parentId: "post3",
    likesCount: 30,
    replayCount: 5,
    contentId: "post3",
    contentType: "post",
    updatedAt: new Date("2025-01-04T16:15:00Z"),
    createdAt: new Date("2025-01-04T15:45:00Z"),
  },
  {
    _id: "cmt5",
    media: "new one",
    mediaType: "text",
    status: "blocked",
    authorId: "user5",
    parentId: "cmt4",
    likesCount: 0,
    replayCount: 0,
    contentId: "post3",
    contentType: "comment",
    updatedAt: new Date("2025-01-05T12:20:00Z"),
    createdAt: new Date("2025-01-05T12:00:00Z"),
  },
];


type Props = {
  handleClose: () => void
}

const Comments = ({ handleClose }: Props) => {

  return (
    <BackdropVerifyOtp onClick={handleClose}>

      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <CommentCard
          comments={comments}
        />
      </motion.div>

    </BackdropVerifyOtp>
  )
}

export default Comments