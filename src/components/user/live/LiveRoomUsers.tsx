import { ChatUserType } from "../../../constants/types"
import UserListCard from "../../basic/UserListCard"

type Props = {
  liveRoomUsers: ChatUserType[]
}

const LiveRoomUsers = ({ liveRoomUsers }: Props) => {
  return (
    <section className='absolute top-16 right-0 space-y-1 bg-slate-600 rounded-lg scrollbar-hide bg-gary-500 py-3 lg:py-5 px-4 antialiased h-[80vh] w-[40vh] overflow-y-auto'>
      {liveRoomUsers.map((item) => (
        <UserListCard
          key={item.userId}
          name={item.name}
          image={item.image || ''}
        />
      ))}
    </section>
  )
}

export default LiveRoomUsers