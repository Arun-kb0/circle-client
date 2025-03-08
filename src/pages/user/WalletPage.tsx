import React from 'react'
import Wallet from '../../components/user/wallet/Wallet'
import PageTitle from '../../components/basic/PageTitle'

type Props = {}

const WalletPage = (props: Props) => {
  return (
    <main className='main-section justify-center relative h-screen overflow-y-auto' >
      <div className="p-4 sm:ml-64" >
        <div className="p-4 mt-14">

          <PageTitle firstWord='' secondWord='Wallet' />
          <Wallet />

        </div>
      </div>
    </main>
  )
}

export default WalletPage