import React from 'react'
import AdminCard from './AdminCard'

type Props = {}

const AdminHomeTop = (props: Props) => {
  return (
    <section className='flex gap-4 justify-center items-center'>

      <AdminCard
        title={'total People'}
        count={10}
        diff={20}
      />
      <AdminCard
        title={'total likes'}
        count={10}
        diff={20}
      />
      <AdminCard
        title={'total comment'}
        count={10}
        diff={20}
      />
      <AdminCard
        title={'total saved'}
        count={10}
        diff={20}
      />

    </section>
  )
}

export default AdminHomeTop