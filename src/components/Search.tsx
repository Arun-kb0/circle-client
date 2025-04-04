import { FieldValues, useForm } from 'react-hook-form';
import { CiSearch } from "react-icons/ci";
import debounce from 'lodash.debounce'
import { useEffect, useMemo } from 'react';

type Props = {
  handleSearch: (data: FieldValues) => void
}

const Search = ({ handleSearch }: Props) => {
  const { register, handleSubmit, watch } = useForm()
  const searchText = watch('searchText', '')

  const debounceSearch = useMemo(() => (
    debounce((value: string) => {
      handleSearch({ searchText: value })
    }, 2000)
  ), [handleSearch])

  useEffect(() => {
    // if (searchText) debounceSearch(searchText)
    return () => debounceSearch.cancel()
  }, [searchText, debounceSearch])

  const onSubmit = (data: FieldValues) => {
    debounceSearch(data.searchText)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto md:w-[500px] sm:w-60">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <input
          {...register('searchText', { required: true })}
          type="search"
          id="default-search" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search users ...."
          required
        />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <CiSearch size="20px" />
        </button>
      </div>
    </form>

  )
}

export default Search