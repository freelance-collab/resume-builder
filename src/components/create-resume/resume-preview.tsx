'use client';

import { usePDF } from '@react-pdf/renderer';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';

import { FAANGTemplete } from '../resumes-templates/FAANG';
import { FAANGDocument } from '../resumes-templates/FAANG.pdf';
import { ResumeSchemaType } from '../resumes-templates/schema';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

export const ResumePreview = ({ data }: { data: ResumeSchemaType }) => {
  // const [instance] = usePDF({
  //   document: <FAANGDocument data={data} />,
  // });

  // if (instance.loading || instance.error) return null;

  return (
    <div className='h-fit min-h-[842px] w-[595px] border bg-white text-black'>
      <FAANGTemplete data={data} />
      {/* 
      <Document file={URL.createObjectURL(instance.blob!)}>
        <Page pageNumber={1} />
      </Document> */}
    </div>
  );
};

// export const ResumePreview = ({ data }: { data: ResumeSchemaType }) => {
//   const [instance] = usePDF({
//     document: <FAANGDocument data={data} />,
//   });

//   if (instance.loading || instance.error) return null;

//   return (
//     <Document file={URL.createObjectURL(instance.blob!)}>
//       <Page pageNumber={1} />
//     </Document>
//   );
// };
