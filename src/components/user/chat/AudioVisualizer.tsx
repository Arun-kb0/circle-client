import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

type Props = {
  audioBlob: Blob
}

const AudioVisualizer = ({ audioBlob }: Props) => {
  const waveformRef = useRef<HTMLDivElement>(null)
  const waveSurferRef = useRef<WaveSurfer | null>(null)

  useEffect(() => {
    if (!waveformRef.current) return;

    waveSurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#4F4A85',
      progressColor: '#383351',
      cursorColor: '#000',
      width: "50%",
      height: 50,
      barWidth: 3,
      barGap: 0,
    })

    return () => {
      waveSurferRef.current?.destroy();
    }
  }, [])

  useEffect(() => {
    if (audioBlob && waveSurferRef.current) {
      const blobUrl = URL.createObjectURL(audioBlob)
      waveSurferRef.current.load(blobUrl)
    }
  }, [audioBlob])

  return <article
    ref={waveformRef}
    className='absolute bottom-4 h-10 w-full'
  />
}

export default AudioVisualizer;

