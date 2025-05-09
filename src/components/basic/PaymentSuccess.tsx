import SuccessAnimation from './SuccessAnimation'


const PaymentSuccess = () => {
  return (
    <div className='space-y-2'>
      <h1 className='text-lg font-semibold text-center text-green-500'>Payment Success</h1>
      <div className='flex justify-center items-center'>
        <SuccessAnimation />
      </div>
    </div>
  )
}

export default PaymentSuccess