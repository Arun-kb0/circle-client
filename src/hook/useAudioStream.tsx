import { useState, useEffect, useRef } from 'react';

const useAudioStream = (timeslice = 100, combineInterval = 1000) => {
  const [audioBlob, setAudioBlob] = useState<Blob | undefined>(undefined)
  const [stream, setStream] = useState<MediaStream | undefined>()
  const chunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    if (!stream) return

    let mediaRecorder: MediaRecorder;
    try {
      // Create the recorder without specifying MIME options so that the browser uses a supported type.
      mediaRecorder = new MediaRecorder(stream);
    } catch (error) {
      console.error('Error creating MediaRecorder:', error);
      return;
    }

    mediaRecorder.ondataavailable = (event: BlobEvent) => {
      if (event.data && event.data.size > 0) {
        chunksRef.current.push(event.data);
        // setAudioBlob(event.data);
      }
    };

    try {
      // Start the recorder with a timeslice for continuous updates.
      mediaRecorder.start(timeslice);
    } catch (error) {
      console.error("Error starting MediaRecorder:", error);
    }

    const interval = setInterval(() => {
      if (chunksRef.current.length > 0) {
        // Combine chunks into one Blob.
        const combinedBlob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType });
        setAudioBlob(combinedBlob);
        // Clear the chunks for the next interval.
        chunksRef.current = [];
      }
    }, combineInterval);

    return () => {
      clearInterval(interval);
      if (mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      }
    };
  }, [stream, timeslice, combineInterval]);

  return { audioBlob, setStream }
}

export default useAudioStream;
