
type Props = {
  isSend : boolean
}

const ChatSkeltonLoader = ({isSend}: Props) => {
  return (
    <article className={`flex items-start gap-2.5 ${isSend ? 'justify-end' : 'justify-start'}  relative animate-pulse`}>
      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-ss-xl rounded-t-xl dark:bg-gray-800">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded-md"></span>
          <span className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded-md"></span>
        </div>
        <p className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded-md my-2.5"></p>
        <span className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></span>
      </div>
      <div className="lg:w-8 lg:h-8 h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="inline-flex self-center items-center p-2 bg-gray-300 dark:bg-gray-700 rounded-lg">
        <div className="h-6 w-6"></div>
      </div>
    </article>
  )
}

export default ChatSkeltonLoader