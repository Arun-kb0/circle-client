import FailedAnimation from './FailedAnimation'

type Props = {}

const PaymentFailed = (props: Props) => {
  return (
    <div>
      <h1 className='text-lg font-semibold text-center text-red-400 '>Payment Failed</h1>
      <div className='flex justify-center items-center'>
        <FailedAnimation />
      </div>
    </div>
  )
}

export default PaymentFailed