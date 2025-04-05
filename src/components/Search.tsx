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
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto md:w-[500px] sm:w-60">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <input
          {...register('searchText', { required: true })}
          type="search"
          id="default-search"
          className="search-bar-input"
          placeholder="Search..."
          required
        />
        <button
          type="submit"
          className="search-bar-btn"
        >
          <CiSearch size="20px" />
        </button>
      </div>
    </form>
  )
}

export default Search