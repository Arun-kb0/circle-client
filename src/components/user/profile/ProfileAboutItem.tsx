import React, { useState } from 'react'
import SpringButton from '../../basic/SpringButton'
import { TbEdit } from 'react-icons/tb'

type Props = {
  fieldName: string
  fieldData: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  inputValue: string
}

const ProfileAboutItem = ({ fieldData, fieldName, setInputValue, inputValue }: Props) => {
  return (
    <article className="flex items-center ">
      <div className="flex-1 min-w-0 ms-4"> <p className="text-sm font-medium text-gray-900 truncate dark:text-white"> {fieldName} </p></div>
      <div className="flex-1 min-w-0 ms-4 items-center">
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          className=" bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </article>
  )
}

export default ProfileAboutItem