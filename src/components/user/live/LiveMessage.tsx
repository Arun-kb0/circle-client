import { LiveMessageType } from '../../../constants/types'
import moment from 'moment'
import { FaUserCircle } from 'react-icons/fa'

type Props = {
  message: LiveMessageType
}

const LiveMessage = ({ message }: Props) => {
  return (
    <article className="flex items-start gap-2.5">
      {message.authorImage
        ? <img className="w-6 h-6 rounded-full object-cover" src={message.authorImage} alt={message.authorName} />
        : <FaUserCircle size={22} />}
      <div className="flex flex-col w-full max-w-[320px] leading-1.5">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-xs font-semibold text-gray-900 dark:text-white">{message.authorName}</span>
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400">{moment(message.createdAt).fromNow()}</span>
        </div>
        <p className="text-sm font-normal py-2 text-gray-900 dark:text-white">{message.message}</p>
      </div>
    </article>
  )
}

export default LiveMessage