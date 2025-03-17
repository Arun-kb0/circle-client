import React from 'react'
import moment from 'moment'
import { TransactionWithUsersType } from '../../constants/types'
import Avatar from '../basic/Avatar'

type Props = {
  transactions: TransactionWithUsersType[]
}

const TransactionsTable = ({ transactions }: Props) => {

  return (
    <section className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="Capitalize px-6 py-3">sender</th>
            <th scope="col" className="Capitalize px-6 py-3">amount</th>
            <th scope="col" className="Capitalize px-6 py-3">status</th>
            <th scope="col" className="Capitalize px-6 py-3">receiver</th>
            <th scope="col" className="Capitalize px-6 py-3">created at</th>
          </tr>
        </thead>

        <tbody>
          {transactions?.map((item) => (
            <tr key={item._id} className='bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:bg-gray-800'>
              <td className="px-6 py-4 w-auto flex justify-center items-center space-y-1">
                <div className="">
                  <Avatar
                    image={item.senderImage}
                    alt={item.senderName}
                    userId={item.senderId}
                    disableNavigation={true}
                  />
                  <div className="flex justify-center">
                    <span className="text-xs">{item.senderName}</span>
                  </div>
                </div>
              </td>
              <td className={`px-6 py-4 ${item.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>{item.amount} {item.currency}</td>
              <td className="px-6 py-4">{item.status} </td>
              <td className="px-6 py-4 w-auto flex justify-center items-center space-y-1">
                <div className="">
                  <Avatar
                    image={item.receiverImage}
                    alt={item.receiverName}
                    userId={item.receiverId}
                    disableNavigation={true}
                  />
                  <div className="flex justify-center">
                    <span className="text-xs">{item.receiverName}</span>
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

export default TransactionsTable