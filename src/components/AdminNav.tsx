import { Link } from 'react-router-dom'
import Search from './Search'

type Props = {
  handleLogout: () => void
}

const AdminNav = ({ handleLogout }: Props) => {
  return (
    <nav className='sm:text-lg text-sm  my-2 w-full px-4 flex justify-center items-center gap-4 capitalize text-green-500 font-semibold '>
      <h1 className='sm:flex hidden text-orange-400 text-x'>Admin Panel</h1>
      <Search/>
      <Link to="/admin">Home</Link>
      <Link to="/admin/create">create</Link>
      <button onClick={handleLogout}> Logout</button>
    </nav>
  )
}

export default AdminNav