import { Loader, SaveIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { createResumeAction } from '@/actions/resumes-actions';
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
    const { personalInformation, ...formValues } = form.getValues();
    const { picture, ...data } = personalInformation;

    const content = JSON.stringify({ personalInformation: data, ...formValues });

    // const imageUrl = await convertToImage();
    // const formData = new FormData();
    // formData.set('image', imageUrl!);

    const { data: resume, serverError } = await createResumeAction({
      name: title,
      content,
      picture,
    });

    if (serverError) {
      toast.error(serverError);
      return;
    }

    if (!resume) {
      toast.error('Something went wrong!');
      return;
    }

    toast.success('Your Resume has been saved');
    localStorage.removeItem(FORM_DATA_KEY);
    router.replace(`/resumes/${resume.id}/builder`);
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
