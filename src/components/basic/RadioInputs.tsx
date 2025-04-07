import { RadioInputDataType } from '../../constants/types'

type Props = {
  data: RadioInputDataType[]
  handleInputClick: (value: string) => void
}

const RadioInputs = ({ data, handleInputClick }: Props) => {

  return (
    <div className="flex justify-center space-y-1">
      <div className='space-y-1'>
      {data.map(({ id, name, label, value }, index) => (
        <div key={id}  className="flex items-center me-4">
          <input
            id={id}
            type="radio"
            value=""
            name={name}
            defaultChecked={index === 0}
            onClick={() => handleInputClick(value)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={id}
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {label}
          </label>
        </div>

      ))}
      </div>
    </div>

  )
}

export default RadioInputs