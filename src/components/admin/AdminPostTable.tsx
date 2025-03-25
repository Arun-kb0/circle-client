import { PostType } from '../../constants/FeedTypes'
import moment from 'moment'
import { MdBlock } from 'react-icons/md'
import { TiTickOutline } from "react-icons/ti"
import Avatar from '../basic/Avatar'

type Props = {
  posts: PostType[]
  handleBlock?: (post: PostType) => void
  handleUnblock?: (post: PostType) => void
}

const AdminPostTable = ({ posts, handleBlock, handleUnblock, }: Props) => {

  return (
    <section className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="Capitalize px-6 py-3">media</th>
            <th scope="col" className="Capitalize px-6 py-3">author</th>
            <th scope="col" className="Capitalize px-6 py-3">tags</th>
            <th scope="col" className="Capitalize px-6 py-3">description</th>
            <th scope="col" className="Capitalize px-6 py-3">likes</th>
            <th scope="col" className="Capitalize px-6 py-3">comments</th>
            <th scope="col" className="Capitalize px-6 py-3">reports</th>
            <th scope="col" className="Capitalize px-6 py-3">created at</th>
            <th scope="col" className="Capitalize px-6 py-3">status</th>
            {handleBlock && handleUnblock && <th scope="col" className="Capitalize px-6 py-3">block</th>}
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post._id} className={`bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${post.reportsCount > 5 ? 'dark:bg-red-900' : 'dark:bg-gray-800'}`}>
              <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="flex flex-wrap justify-start gap-1 max-w-40 overflow-hidden">
                  {post.mediaType !== 'text' ? (
                    post.media?.map(url => (
                      <img
                        key={url}
                        className="w-10 h-10 p-1 rounded-sm object-cover"
                        src={url}
                        alt=""
                      />
                    ))
                  ) : (
                    <span className="text-sm font-semibold flex-wrap truncate">
                      {post.media ? post.media[0] : ''}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 w-auto flex justify-center items-center space-y-1">
                <div className="">
                  <Avatar
                    image={post.authorImage}
                    alt={post.authorName}
                    userId={post.authorName}
                    disableNavigation={true}
                  />
                  <div className="flex justify-center">
                    <span className="text-xs">{post.authorName}</span>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4"> {post.tags?.map(tag => `#${tag} `)} </td>
              <td className="px-6 py-4">{post.desc}</td>
              <td className="px-6 py-4">{post.likesCount} </td>
              <td className="px-6 py-4">{post.commentCount} </td>
              <td className="px-6 py-4">{post.reportsCount} </td>
              <td className="px-6 py-4">{moment(post.createdAt).fromNow()}</td>
              <td className="px-6 py-4">{post.status}</td>

              {handleBlock && handleUnblock &&
                <td className="px-6 py-4">
                  {post.status === 'active'
                    ? <button onClick={() => handleBlock(post)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <MdBlock size={17} />
                      </span>
                    </button>
                    : <button onClick={() => handleUnblock(post)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <TiTickOutline size={17} />
                      </span>
                    </button>
                  }
                </td>}
            </tr>
          ))}
        </tbody>

      </table>
    </section>
  )
}

export default AdminPostTable