import Lottie from 'lottie-react'
import messageTyping from '../../assets/lottyfiles/messageTyping.json'

const MessageTypingAnimation = () => {
  return (
    <div className='w-14 h-auto mx-2 rounded-e-xl rounded-es-xl bg-gray-600'>
      <Lottie
        animationData={messageTyping}
        loop={true}
      />
    </div>
  )
}

export default MessageTypingAnimation