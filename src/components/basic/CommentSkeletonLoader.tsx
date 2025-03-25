

const CommentSkeletonLoader = () => {
  return (
    <article className="relative p-5 text-base bg-white rounded-lg dark:bg-gray-800 animate-pulse">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="w-6 h-6 mr-3 bg-gray-300 rounded-full dark:bg-gray-700"></div>
          <div className="w-24 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
          <div className="ml-3 w-16 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
        </div>

        <div className="w-6 h-6 bg-gray-300 rounded dark:bg-gray-700"></div>
      </footer>

      <div className="w-full h-5 mt-2 bg-gray-300 rounded dark:bg-gray-700"></div>
      <div className="w-3/4 h-5 mt-2 bg-gray-300 rounded dark:bg-gray-700"></div>

      <div className="flex items-center mt-4 space-x-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-300 rounded-full dark:bg-gray-700"></div>
          <div className="w-10 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-300 rounded-full dark:bg-gray-700"></div>
          <div className="w-10 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
        </div>
        <div className="w-16 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
      </div>
    </article>
  )
}

export default CommentSkeletonLoader