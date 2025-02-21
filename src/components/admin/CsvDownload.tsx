import React from 'react';
import { CSVLink } from 'react-csv';
import { BsFiletypeCsv } from 'react-icons/bs';
import { PostType } from '../../constants/FeedTypes';

type Props = {
  headers: { label: string, key: string }[]
  data: PostType[]
}

const CsvDownload = ({ headers, data }: Props) => (
  <CSVLink
    data={data}
    headers={headers}
    filename="circle-report.csv"
  >
    <button className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500" >
      <BsFiletypeCsv size={20} />
    </button>

  </CSVLink>
);

export default CsvDownload;
