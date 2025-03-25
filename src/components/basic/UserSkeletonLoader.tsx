
const UserSkeletonLoader = () => {
  return (
    <article className="max-w-sm w-52 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 animate-pulse">
      <div className="flex justify-end px-4 pt-4">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      <div className="flex flex-col items-center pb-10">
        <div className="w-24 h-24 mb-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="h-5 w-32 mb-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="flex mt-4 md:mt-6 space-x-2">
          <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </article>

  )
}

export default UserSkeletonLoader