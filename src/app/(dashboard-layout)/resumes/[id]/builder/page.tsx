import { LoaderCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { getResumeByIdAction } from '@/actions/resumes-actions';
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

export default async function ResumeBuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  const { data: resume, serverError } = await getResumeByIdAction({ id });

  if (serverError) {
    throw serverError;
  }

  if (resume === null) {
    return notFound();
  }

  if (!resume) {
    throw new Error('Something went wrong');
  }

  return (
    <ResumeFormProvider resume={resume}>
      <ResumeBuilder />
    </ResumeFormProvider>
  );
}
