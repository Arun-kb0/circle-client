type Props = {}

const PostSkeletonLoader = (props: Props) => {
  return (

    <article className="nav-bg-color lg:w-[50vw] overflow-hidden animate-pulse">
      <div className="flex items-center justify-between m-2 relative">
        <div className="flex justify-start items-center">
          <div className="flex items-center mr-3">
            <div className="mr-2 w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>

      <div className="h-60 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

      <div className="p-5">
        <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
        <div className="flex flex-wrap justify-start items-center gap-2">
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded my-4"></div>
        <div className="flex justify-start space-x-5 items-center">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="h-4 w-10 bg-gray-300 dark:bg-gray-700 rounded ml-2"></div>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="h-4 w-10 bg-gray-300 dark:bg-gray-700 rounded ml-2"></div>
          </div>
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </article>

  )
}

export default PostSkeletonLoader