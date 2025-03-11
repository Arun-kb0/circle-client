import React from 'react'
import moment from 'moment'
import { ReportAdminType } from '../../constants/types'
import Avatar from '../basic/Avatar'

type Props = {
  reportData: ReportAdminType[]
}

const AdminReportTable = ({ reportData }: Props) => {

  return (
    <section className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="Capitalize px-6 py-3">post media</th>
            <th scope="col" className="Capitalize px-6 py-3">post author</th>
            <th scope="col" className="Capitalize px-6 py-3">post description</th>
            <th scope="col" className="Capitalize px-6 py-3">status</th>
            <th scope="col" className="Capitalize px-6 py-3">reported user</th>
            <th scope="col" className="Capitalize px-6 py-3">description</th>
            <th scope="col" className="Capitalize px-6 py-3">content type</th>
            <th scope="col" className="Capitalize px-6 py-3">created at</th>
          </tr>
        </thead>

        <tbody>
          {reportData?.map((item) => (
            <tr key={item._id} className='bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:bg-gray-800'>
              <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="flex flex-wrap justify-start gap-1">
                  {item.post.mediaType !== 'text' ? (
                    item.post.media?.map(url => (
                      <img
                        key={url}
                        className="w-10 h-10 p-1 rounded-sm object-cover"
                        src={url}
                        alt=""
                      />
                    ))
                  ) : (
                    <span className="text-sm font-semibold flex-wrap truncate">
                      {item.post.media ? item.post.media[0] : ''}
                    </span>
                  )}
                </div>
              </td>

              <td className="px-6 py-4 w-auto flex justify-center items-center space-y-1">
                <div className="">
                  <Avatar
                    image={item.post.authorImage}
                    alt={item.post.authorName}
                    userId={item.post.authorName}
                    disableNavigation={true}
                  />
                  <div className="flex justify-center">
                    <span className="text-xs">{item.post.authorName}</span>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">{item.post.desc}</td>
              <td className="px-6 py-4">{item.post.status} </td>
              <td className="px-6 py-4 w-auto flex justify-center items-center space-y-1">
                <div className="">
                  <Avatar
                    image={item.userImage}
                    alt={item.userName}
                    userId={item.userName}
                    disableNavigation={true}
                  />
                  <div className="flex justify-center">
                    <span className="text-xs">{item.post.authorName}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">{item.description} </td>
              <td className="px-6 py-4">{item.contentType} </td>
              <td className="px-6 py-4">{moment(item.createdAt).fromNow()}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </section>
  )
}

export default AdminReportTable