import moment from 'moment'
import { Link } from 'react-router-dom'

type Props = {
  name: string,
  image: string
  time: Date
}

const UserListCard = ({ name, image, time }: Props) => {
  return (
    <Link to='/profile' className="flex items-center gap-4 shadow-md bg-gray-800 p-4 rounded-lg w-full">
      <img className="w-10 h-10 rounded-full object-cover" src={image} alt="" />
      <div className="font-medium dark:text-white">
        <p>{name}</p>
        <p className='text-sm font-normal'>{ moment(time).fromNow()}</p>
      </div>
    </Link>
  )
}

export default UserListCard