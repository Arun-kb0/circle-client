import React from 'react'
import { IconType } from 'react-icons/lib';
import { IoChevronUpCircle } from "react-icons/io5";
import { IoChevronDownCircle } from "react-icons/io5";

type Props = {
  handleClick: () => void
  type: 'replay' | 'edit' | 'delete' | 'save' | 'cancel',
  iconType?: 'chev-down' | 'chev-up'
}

const ActionBtn = ({ handleClick, type, iconType }: Props) => {
  return (
    <button className='flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={handleClick}>
      {iconType === 'chev-down' && <IoChevronDownCircle size={15} />}
      {iconType === 'chev-up' && <IoChevronUpCircle size={15} />}
      {type}
    </button>
  )
}

export default ActionBtn
