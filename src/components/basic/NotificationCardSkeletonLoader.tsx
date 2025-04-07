const NotificationCardSkeletonLoader = () => {
  return (
    <li className="py-3 sm:py-4 w-64">
      <div className="flex items-center animate-pulse">
        <div className="rounded-full bg-gray-500 h-8 w-8"></div>
        <div className="flex-1 min-w-0 ms-4">
          <div className="h-4 bg-gray-500 rounded w-3/4 mb-2"></div>
          <div className="flex gap-2">
            <div className="h-3 bg-gray-500 rounded w-1/4"></div>
            <div className="h-3 bg-gray-500 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </li>

  )
}

export default NotificationCardSkeletonLoader