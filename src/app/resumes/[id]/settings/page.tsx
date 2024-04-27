import { getResumeById } from '@/actions/resumes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ResumeSettingsPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;

  const resume = await getResumeById(id);

  if (!resume) {
    throw new Error('Resume Not Found');
  }

  return (
    <div className='max-w-4xl space-y-6'>
      <div className='flex flex-col space-y-4 rounded-xl border p-8'>
        <h2 className='h4'>Name</h2>
        <Input type='text' />
        <Button className='self-end'>Save</Button>
      </div>
      <div className='flex flex-col space-y-4 rounded-xl border p-8'>
        <h2 className='h4'>Subdomain</h2>
        <Input type='text' />
        <Button className='self-end'>Save</Button>
      </div>
    </div>
  );
};

export default ResumeSettingsPage;
