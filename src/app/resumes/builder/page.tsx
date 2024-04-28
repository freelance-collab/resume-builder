import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { LocalResumeBuilder } from '@/components/resume-builder/local-resume-builder';

const LocalBuilderPage = async () => {
  const session = await auth();

  if (session) {
    return redirect('/');
  }

  return (
    <div className='mx-10'>
      <LocalResumeBuilder />
    </div>
  );
};

export default LocalBuilderPage;
