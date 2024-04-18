// 'use client';

// import { usePDF } from '@react-pdf/renderer';
// import { pdfjs } from 'react-pdf';
// import { Document, Page } from 'react-pdf';

// import { FAANGDocument } from '../resumes-templates/FAANG';
// import { ResumeSchemaType } from '../resumes-templates/schema';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

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
