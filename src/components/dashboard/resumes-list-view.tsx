import Link from 'next/link';

import { getUserResumes } from '@/actions/resumes';

import { Button } from '../ui/button';

export const ResumesListView = async () => {
  const resumes = await getUserResumes({});

  return (
    <>
      <h1 className='h2'>Your Resumes</h1>

      <ul className='grid grid-cols-4auto gap-20'>
        {resumes.map((resume) => (
          <Link
            key={resume.id}
            className='center h-[300px] flex-col rounded-xl border'
            href={`/resumes/${resume.id}/builder`}
          >
            <h4>{resume.name}</h4>
            <p>mahmoud@resume.com</p>
          </Link>
        ))}

        <li className='center h-[300px]'>
          <Button asChild>
            <Link href='/resumes/builder'>Create New Resume</Link>
          </Button>
        </li>
      </ul>
    </>
  );
};
