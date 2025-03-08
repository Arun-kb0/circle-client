import React from 'react'
import { IoWalletOutline } from 'react-icons/io5'
import Transaction from './Transaction'
import { TransactionType } from '../../../constants/types';

const transactions: TransactionType[] = [
  {
    _id: "txn001",
    userId: "user123",
    type: "credit",
    amount: 150.0,
    currency: "USD",
    status: "completed",
    createdAt: "2025-03-08T08:00:00Z",
    updatedAt: "2025-03-08T09:00:00Z",
    userName: "John Doe",
    userImage: "https://example.com/user123.jpg",
  },
  {
    _id: "txn002",
    userId: "user456",
    type: "debit",
    amount: 75.0,
    currency: "USD",
    status: "pending",
    createdAt: "2025-03-08T10:00:00Z",
    updatedAt: "2025-03-08T10:30:00Z",
    userName: "Jane Smith",
    userImage: "https://example.com/user456.jpg",
  },
  {
    _id: "txn003",
    userId: "user789",
    type: "credit",
    amount: 200.0,
    currency: "EUR",
    status: "failed",
    createdAt: "2025-03-07T12:00:00Z",
    updatedAt: "2025-03-07T12:30:00Z",
    userName: "Alice Johnson",
  },
  {
    _id: "txn004",
    userId: "user101",
    type: "debit",
    amount: 50.0,
    currency: "GBP",
    status: "completed",
    createdAt: "2025-03-06T14:00:00Z",
    updatedAt: "2025-03-06T14:30:00Z",
    userName: "Robert Brown",
    userImage: "https://example.com/user101.jpg",
  },
  {
    _id: "txn005",
    userId: "user202",
    type: "credit",
    amount: 300.0,
    currency: "USD",
    status: "completed",
    createdAt: "2025-03-05T16:00:00Z",
    updatedAt: "2025-03-05T17:00:00Z",
    userName: "Emily Davis",
  },
];


type Props = {}

const Wallet = (props: Props) => {
  return (
    <article className='space-y-6'>

      <section className="space-y-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <IoWalletOutline size={32} />
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Balance : 1000</h5>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
      </section>

      <section className='space-y-3 overflow-y-auto'>
        {transactions.map((transaction) => (
          <Transaction
            key={transaction._id}
            transaction={transaction}
          />
        ))}
      </section>

    </article>
  )
}

export default Wallet