import Image from 'next/image';
import Link from 'next/link';

import { getUserResumes } from '@/actions/resumes';

import { Button } from '../ui/button';

export const ResumesListView = async () => {
  const resumes = await getUserResumes({});

  if (resumes.length === 0) {
    return (
      <div className='mt-20 flex flex-col items-center justify-center space-y-6'>
        <h1 className='h2'>You Don&apos;t have any resumes</h1>
        <Button asChild>
          <Link href='/resumes/builder'>Create New Resume</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <h1 className='h2'>Your Resumes</h1>

      <ul className='grid grid-cols-4auto gap-20'>
        {resumes.map((resume) => (
          <div key={resume.id}>
            <div className='overflow-hidden  rounded-xl border'>
              <Image
                src={resume.previewURL ?? '/resume-preview.jpg'}
                width={400}
                height={600}
                alt='preview'
                className='h-full w-full object-contain'
              />
            </div>
            <Link href={`/resumes/${resume.id}/builder`} className='ml-2 mt-1 text-xl font-semibold'>
              {resume.name}
            </Link>
          </div>
        ))}

        <li className='center h-full'>
          <Button asChild>
            <Link href='/resumes/builder'>Create New Resume</Link>
          </Button>
        </li>
      </ul>
    </>
  );
};
