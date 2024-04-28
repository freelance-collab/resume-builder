import { auth } from '@/auth';
import { LocalResume } from '@/components/dashboard/local-resume';
import { ResumesList } from '@/components/dashboard/resumes-list';

export default async function Home() {
  const session = await auth();

  const ResumesView = session ? ResumesList : LocalResume;

  return (
    <div className='container'>
      <ResumesView />
    </div>
  );
}
