import { auth } from '@/auth';
import { LocalResumeView } from '@/components/dashboard/local-resume-view';
import { ResumesListView } from '@/components/dashboard/resumes-list-view';

export default async function Home() {
  const session = await auth();

  const ResumesView = session ? ResumesListView : LocalResumeView;

  return (
    <div className='container'>
      <ResumesView />
    </div>
  );
}
