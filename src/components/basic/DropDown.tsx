import { DropDownElementsType } from '../../constants/types'
import { motion } from 'framer-motion'

type Props = {
  open: boolean
  elements: DropDownElementsType[]
  position: string
}

const DropDown = ({ elements, open, position }: Props) => {
  return (
    <>
      {open &&
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className={`${position} z-30 absolute  bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600`}
        >
          <ul className="py-2 w-full text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
            {elements.map((item, index) => (
              <li key={index}>
                <button
                  onClick={item.handler}
                  className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>}
    </>
  )
}

export default DropDown