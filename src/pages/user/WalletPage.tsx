import React from 'react'
import Wallet from '../../components/user/wallet/Wallet'
import PageTitle from '../../components/basic/PageTitle'
import { selectUserNavOpen } from '../../features/user/userSlice'
import { useSelector } from 'react-redux'

type Props = {}

const WalletPage = (props: Props) => {
  const userNavOpen = useSelector(selectUserNavOpen)

  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className={`p-4 ${userNavOpen ? 'sm:ml-64 ' : ''}`}>
        <div className="p-4 mt-14">

          <PageTitle firstWord='' secondWord='Wallet' />
          <Wallet />

        </div>
      </div>
    </main>
  )
}

export default WalletPage