'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { getResume, saveResume } from '@/lib/local-resume';

import { initialResumeData } from '../resumes-templates/schema';
import { Button } from '../ui/button';

export const LocalResume = () => {
  const router = useRouter();
  const resume = getResume();

  const handleCreateResume = () => {
    saveResume(JSON.stringify(initialResumeData));
    router.push('/resumes/builder');
  };

  if (!resume) {
    return (
      <div className='mt-20 flex flex-col items-center justify-center space-y-6'>
        <h1 className='h2'>You Don&apos;t have any resumes</h1>
        <Button size='lg' onClick={handleCreateResume}>
          Create Resume Now!
        </Button>
      </div>
    );
  }

  return (
    <ul className='grid grid-cols-4auto gap-20'>
      <Link className='center h-[300px] flex-col rounded-xl border' href={`/resumes/builder`}>
        <h4>Resume1</h4>
      </Link>

      <li className='center h-[300px]'>
        <Button>Create New Resume</Button>
      </li>
    </ul>
  );
};
