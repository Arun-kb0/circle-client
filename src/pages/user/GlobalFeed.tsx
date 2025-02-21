import React from 'react'
import Feed from '../../components/user/feed/Feed'

type Props = {}

const GlobalFeed = (props: Props) => {
  return (
    <div className=''>
      <h1>global feed</h1>
      <Feed/>
    </div>
  )
}

export default GlobalFeed