import React, { useState } from 'react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import type { IGif } from '@giphy/js-types';

type Props = {
  onGifSelect: (gifUrl: string) => void;
}
const API_KEY = import.meta.env.VITE_GIPHY_API_KEY
const gf = new GiphyFetch(API_KEY)

const GifPicker = ({ onGifSelect }:Props) => {
  const [selectedGif, setSelectedGif] = useState<IGif | null>(null);

  const fetchGifs = (offset: number) => gf.trending({ offset, limit: 12 });

  const handleGifClick = (gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>) => {
    e.preventDefault()
    setSelectedGif(gif)
    if (onGifSelect) {
      onGifSelect(gif.images.fixed_width.url)
    }
  }

  return (
    <section className="absolute right-5 top-10 h-[500px] overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 z-30">
      <h3 className='text-center font-semibold capitalize p-2'>GIF picker</h3>
      <Grid
        fetchGifs={fetchGifs}
        width={300} 
        columns={3}
        gutter={6}
        onGifClick={handleGifClick} 
      />
      {selectedGif && (
        <div style={{ marginTop: '20px' }}>
          <h4>Selected GIF:</h4>
          <img
            src={selectedGif.images.fixed_width.url}
            alt={selectedGif.title}
            style={{ border: '1px solid #ccc' }}
          />
        </div>
      )}
    </section>
  )
}

export default GifPicker
