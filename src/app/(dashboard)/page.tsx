import Link from 'next/link';

import { getUserResumes } from '@/actions/resumes';
import { CreateResumeDialog } from '@/components/dashboard/create-resume-dialog';

export default async function Home() {
  return (
    <div className='container'>
      <h1 className='h2'>Your Resumes</h1>
      <ResumesList />
    </div>
  );
}

const ResumesList = async () => {
  const resumes = await getUserResumes({});

  return (
    <ul className='grid grid-cols-4auto gap-20'>
      {resumes.map((resume) => (
        <Link key={resume.id} className='center h-[300px] flex-col rounded-xl border' href={`/builder/${resume.id}`}>
          <h4>{resume.name}</h4>
          <p>mahmoud@resume.com</p>
        </Link>
      ))}

      <li className='center h-[300px] rounded-xl border'>
        <CreateResumeDialog />
      </li>
    </ul>
  );
};
