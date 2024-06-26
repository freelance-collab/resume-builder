'use client';

import { PDFViewer } from '@react-pdf/renderer';

import { FAANGDocument } from '@/components/resumes-templates/FAANG';
import { data } from '@/components/resumes-templates/schema';

const ResumePage = () => {
  return (
    <PDFViewer className='h-[800px] w-full'>
      <FAANGDocument data={data} />
    </PDFViewer>
  );
};

export default ResumePage;
