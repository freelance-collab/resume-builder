import { Loader, SaveIcon } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { updateResumeAction } from '@/actions/resumes-actions';
import { Button } from '@/components/ui/button';
import { useResumeForm } from '@/providers/resume-form-provider';

export const SaveChangesButton = () => {
  const { form, isResumeUpToDate, resume } = useResumeForm();
  const [loading, startTransition] = useTransition();

  if (!resume) return null;

  const handleUpdateResumeWithContent = async () => {
    const { personalInformation, ...formValues } = form.getValues();
    const { picture, ...data } = personalInformation;

    const content = JSON.stringify({ personalInformation: data, ...formValues });

    // const imageUrl = await convertToImage();
    // const formData = new FormData();
    // formData.set('imageUrl', imageUrl!);

    const { serverError } = await updateResumeAction({ id: resume.id, content, picture });

    if (serverError) {
      toast.error(serverError);
      return;
    }

    if (!resume) {
      toast.error('Something went wrong!');
      return;
    }

    toast.success('Your Resume has been saved');

    form.reset(form.getValues());
  };

  const handleSubmit = async () => {
    const res = await form.trigger();
    if (!res) return toast.error('Please Check your resume data');

    startTransition(handleUpdateResumeWithContent);
  };

  return (
    <Button variant='outline' onClick={handleSubmit} disabled={loading || isResumeUpToDate}>
      <SaveIcon className='mr-1 h-4 w-4' />
      {isResumeUpToDate ? 'Saved' : 'Save Changes'}
      {loading && <Loader className='ml-1 size-4 animate-spin' />}
    </Button>
  );
};
