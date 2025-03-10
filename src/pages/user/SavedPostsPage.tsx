import React from 'react'
import SavedPosts from '../../components/user/createPost/SavedPosts'
import PageTitle from '../../components/basic/PageTitle'

type Props = {}

const SavedPostsPage = (props: Props) => {
  return (
    <main className='main-section justify-center relative overflow-hidden ' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14">

          <PageTitle firstWord='Saved' secondWord='Posts' />

          <SavedPosts />

        </div>
      </div>
    </main>

  )
}

export default SavedPostsPage