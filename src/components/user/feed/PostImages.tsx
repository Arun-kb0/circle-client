import React, { useEffect, useState } from 'react'
import { FaCircleChevronRight } from 'react-icons/fa6'
import { FaCircleChevronLeft } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'framer-motion'


type Props = {
  media: string[]
}

const PostImages = ({ media }: Props) => {
  const [direction, setDirection] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrev = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % media.length)
  }

  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100, // Coming in from right or left
    }),
    center: {
      opacity: 1,
      x: 0, // Center position
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100, // Exiting to left or right
    }),
  };

  return (
    <section
      id="gallery"
      className="relative w-full"
      data-carousel="slide"
    >
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        <AnimatePresence custom={direction}>
          {media.map((image, index) =>
            index === activeIndex ? (
              <motion.div
                key={`${index}${image}`}
                className="absolute top-0 left-0 w-full h-full"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction} 
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <img src={image} className="block w-full h-full p-1 object-contain" alt={`Slide ${index + 1}`} />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Previous Button */}
      <button
        onClick={handlePrev}
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <FaCircleChevronLeft size={22} />
          <span className="sr-only">Previous</span>
        </span>
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <FaCircleChevronRight size={22} />
          <span className="sr-only">Next</span>
        </span>
      </button>

    </section>
  )
}

export default PostImages
