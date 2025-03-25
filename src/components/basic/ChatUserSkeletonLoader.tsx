
const ChatUserSkeletonLoader = () => {
  return (
    <section className="flex items-center animate-pulse">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="flex-1 min-w-0 ms-4">
        <div className="w-24 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
      </div>
    </section>

  )
}

export default ChatUserSkeletonLoader