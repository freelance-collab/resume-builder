import Link from 'next/link';

import { Button } from '../ui/button';

export const LocalResumeView = () => {
  return (
    <div className='mt-20 flex flex-col items-center justify-center space-y-6'>
      <h1 className='h2'>You Don&apos;t have any resumes</h1>
      <Button asChild>
        <Link href='/resumes/builder'>Create New Resume</Link>
      </Button>
    </div>
  );
};
