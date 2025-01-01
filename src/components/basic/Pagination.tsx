import React from 'react'

type Props = {
  currentPage: number
  numberOfPages: number,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ currentPage, numberOfPages, page, setPage }: Props) => {

  const increment = () => {
    if (page <= numberOfPages) {
      setPage(prev => prev + 1)
    }
  }

  const decrement = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }

  return (
    <section className="flex flex-col items-center my-2" >
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing page <span className="font-semibold text-gray-900 dark:text-white"> {currentPage}</span> of <span className="font-semibold text-gray-900 dark:text-white">{numberOfPages}</span> pages
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button onClick={decrement} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
          </svg>
          Prev
        </button>
        <button onClick={increment} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default Pagination