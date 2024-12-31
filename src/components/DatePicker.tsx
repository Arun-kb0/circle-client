import React  from 'react'
import ReactDatePicker from 'react-datepicker'


type Props = {
  startDate: Date
  setStartDate: React.Dispatch<React.SetStateAction<Date>>
  endDate: Date
  setEndDate: React.Dispatch<React.SetStateAction<Date>>
}

const DatePicker = ({ startDate, setStartDate, endDate, setEndDate }: Props) => {

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date)
    }
  }
  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      setEndDate(date)
    }
  }

  return (
    <section className='flex space-x-3'>

      <div className='space-y-3'>
        <label htmlFor="datePicker" className="block text-sm text-gray-300">
          start date
        </label>
        <ReactDatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          showTimeSelect
          dateFormat="Pp"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div className='space-y-3'>
        <label htmlFor="datePicker" className="block text-sm font-medium text-gray-300">
          end date
        </label>
        <ReactDatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          showTimeSelect
          dateFormat="Pp"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
    </section>
  )
}

export default DatePicker