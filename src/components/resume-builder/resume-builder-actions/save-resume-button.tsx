import { Loader, SaveIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { createResume } from '@/actions/resumes';
import { useResumeForm } from '@/providers/resume-form-provider';

import { FORM_DATA_KEY } from '../../resumes-templates/schema';
import { Button } from '../../ui/button';

export const SaveResumeButton = ({ title, onUnAuthenticated }: { title: string; onUnAuthenticated: () => void }) => {
  const session = useSession();
  const router = useRouter();
  const [loading, startTransition] = useTransition();
  const { form, resume } = useResumeForm();

  if (resume) {
    return null;
  }

  const handleSaveResume = async () => {
    try {
      const content = JSON.stringify(form.getValues());

      const resume = await createResume({
        name: title,
        content,
      });

      toast.success('Your Resume has been saved');

      localStorage.removeItem(FORM_DATA_KEY);

      router.replace(`/resumes/${resume.id}/settings`);
    } catch (e) {
      let err = 'Something Went Wrong!';

      if (e instanceof Error) err = e.message;

      toast.error(err);
    }
  };

  const handleSubmit = async () => {
    const res = await form.trigger();
    if (!res) {
      return toast.error('Please Check your resume data');
    }

    if (!session.data) {
      return onUnAuthenticated();
    }

    startTransition(handleSaveResume);
  };

  return (
    <Button variant='outline' onClick={handleSubmit} disabled={loading}>
      <SaveIcon className='mr-1 h-4 w-4' />
      Save
      {loading && <Loader className='ml-1 size-4 animate-spin' />}
    </Button>
  );
};
