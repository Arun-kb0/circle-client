import React from 'react'
import moment from 'moment'
import { SubscriptionWithUserType } from '../../constants/types'
import Avatar from '../basic/Avatar'

type Props = {
  subscriptions: SubscriptionWithUserType[]
}

const SubscriptionTable = ({ subscriptions }: Props) => {

  return (
    <section className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="Capitalize px-6 py-3">subscriber</th>
            <th scope="col" className="Capitalize px-6 py-3">plan</th>
            <th scope="col" className="Capitalize px-6 py-3">status</th>
            <th scope="col" className="Capitalize px-6 py-3">subscribe to</th>
            <th scope="col" className="Capitalize px-6 py-3">created at</th>
          </tr>
        </thead>

        <tbody>
          {subscriptions.map((item) => (
            <tr key={item._id} className='bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:bg-gray-800'>

              <td className="flex justify-center items-center">
                <div className="">
                  <Avatar
                    image={item.subscriberUserImage}
                    alt={item.subscriberUserName}
                    userId={item.subscriberUserId}
                    disableNavigation={true}
                  />
                  <div className="flex justify-center">
                    <span className="text-xs">{item.subscriberToUserName}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">{item.plan}</td>
              <td className="px-6 py-4">{item.status} </td>
              <td className="px-6 py-4 w-auto flex justify-center items-center space-y-1">
                <div className="">
                  <Avatar
                    image={item.subscriberToUserImage}
                    alt={item.subscriberToUserName}
                    userId={item.subscriberToUserId}
                    disableNavigation={true}
                  />
                  <div className="flex justify-center">
                    <span className="text-xs">{item.subscriberToUserName}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">{moment(item.createdAt).fromNow()}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </section>
  )
}

export default SubscriptionTable