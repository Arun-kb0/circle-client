import React from 'react'
import Avatar from '../../basic/Avatar'
import { TransactionType } from '../../../constants/types'
import moment from 'moment'

type Props = {
  transaction: TransactionType
}

const Transaction = ({ transaction }: Props) => {
  return (

    <div className="flex items-start gap-2.5 p-3 nav-bg-color lg:w-[50vw] rounded-lg shadow overflow-hidden ">
      <Avatar
        image={transaction.userImage}
        alt={transaction.userName}
        userId={transaction.senderId}
      />
      <div className="flex flex-col w-full leading-1.5">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{transaction.userName}</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{moment(transaction.createdAt).fromNow()}</span>
        </div>
        <div className="text-lg font-normal py-2 flex justify-between ">
          <span className={transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'} >
            {transaction.type === 'credit' ? `+ ${transaction.amount}` : `- ${transaction.amount}`}
          </span>
          <span className={transaction.status === 'completed' ? 'text-green-400 text-sm' : 'text-red-400 text-sm'}>{transaction.status}</span>
        </div>

      </div>
    </div>

  )
}

export default Transaction