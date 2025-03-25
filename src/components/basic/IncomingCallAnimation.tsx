import Lottie from 'lottie-react'
import { useEffect, useRef } from 'react'
import callAnimation from '../../assets/lottyfiles/callAnimation.json'
import audioRingPhone from '../../assets/audio/ringPhone.mp3'

type Props = {
  state: 'ring' | 'end'
}

const IncomingCallAnimation = ({ state }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(audioRingPhone));

  useEffect(() => {
    if (!audioRef.current) {
      throw new Error('audioRef.current is undefined')
    }
    if (state === 'ring') {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [state])

  return (
    <div className='w-12 h-auto p-0'>
      <Lottie animationData={callAnimation} />
    </div>
  )
}

export default IncomingCallAnimation