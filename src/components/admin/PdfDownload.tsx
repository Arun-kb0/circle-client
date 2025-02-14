import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { PostType } from '../../constants/FeedTypes';
import { FaRegFilePdf } from 'react-icons/fa6';


type Props = {
  headers: string[][]
  data: PostType[]
}

const PdfDownload = ({ headers, data }: Props) => {


  const generatePDF = () => {
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: headers,
      body: data.map(item => [
        item.media, item.authorName, item.tags,
        item.desc, item.likesCount, item.commentCount,
        item.reportsCount, item.reportsCount,
        item.createdAt, item.status
      ]),
      columnStyles: {
        0: { cellWidth: 50 }
      }
    })
    doc.save('circle-report.pdf')
  }

  return (
    <button onClick={generatePDF} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500" >
      <FaRegFilePdf size={20} />
    </button>
  )
}

export default PdfDownload
