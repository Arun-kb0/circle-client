import BackdropVerifyOtp from '../../backdrop/BackdropVerifyOtp'
import { motion } from 'framer-motion'
import { dropIn } from '../../../constants/animationDropins'
import { FieldValues, useForm } from 'react-hook-form'
import { PostType } from '../../../constants/FeedTypes'

type Props = {
  handleClose: () => void
  handlePost: (data: Partial<PostType>) => void
}


const AddText = ({ handleClose, handlePost }: Props) => {

  const {
    register,
    handleSubmit,
    formState: {  },
  } = useForm();

  const onSubmit = (formData: FieldValues) => {
    const content = formData.message.replace(/#[a-zA-Z0-9_]+/g, "").replace(/\n/g, " ").trim();
    const hashtags = formData.message.match(/#[a-zA-Z0-9_]+/g);
    const data: Partial<PostType> = {
      mediaType: 'text',
      media: [content],
      tags: hashtags,
    }
    handlePost(data)
  };


  return (
    <BackdropVerifyOtp onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >

        <form className="mx-auto w-96 space-y-5" onSubmit={handleSubmit(onSubmit)} >
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create a text post</label>
          <textarea
            id="message"
            {...register("message", { required: "Message is required" })}
            className="block p-2.5 w-full text-MD text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-64"
            placeholder="Write something..."
          ></textarea>

          <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800" >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"> Post </span>
          </button>
        </form>

      </motion.div>
    </BackdropVerifyOtp>
  )
}

export default AddText