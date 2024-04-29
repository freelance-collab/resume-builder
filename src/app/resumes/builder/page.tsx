import { LoaderCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

import { ResumeFormProvider } from '@/providers/resume-form-provider';

const ResumeBuilder = dynamic(
  () => import('@/components/resume-builder/resume-builder').then((mod) => mod.ResumeBuilder),
  {
    ssr: false,
    loading() {
      return (
        <div className='mt-32 flex w-full flex-1 items-center justify-center'>
          <LoaderCircle className='h-12 w-12 animate-spin text-primary' />
        </div>
      );
    },
  },
);

const BuilderPage = async () => {
  return (
    <div className='mx-10'>
      <ResumeFormProvider>
        <ResumeBuilder />
      </ResumeFormProvider>
    </div>
  );
};

export default BuilderPage;
