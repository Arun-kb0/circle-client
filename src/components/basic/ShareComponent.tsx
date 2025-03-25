import BackdropVerifyOtp from '../backdrop/BackdropVerifyOtp';
import { motion } from 'framer-motion';
import { dropIn } from '../../constants/animationDropins';

type Props = {
  url: string
  title: string
  text: string
  handleClose: () => void
}

// ! do in app sharing if time
const ShareComponent = ({ url, title, text, handleClose }: Props) => {

  const handleWebShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ url, title, text });
        console.log('Content shared successfully!');
      } else {
        console.log('Web Share API is not supported in this browser.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }

  return (
    <BackdropVerifyOtp onClick={handleClose} >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className='nav-bg-color block max-w-sm p-6 rounded-lg shadow-sm'
      >
        <button onClick={handleWebShare} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Share to
        </button>

      </motion.div>
    </BackdropVerifyOtp>
  )
}

export default ShareComponent;
