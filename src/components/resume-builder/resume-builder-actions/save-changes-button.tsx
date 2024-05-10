import { Loader, SaveIcon } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { updateResume } from '@/actions/resumes';
import { Button } from '@/components/ui/button';
import { convertToImage } from '@/lib/utils';
import { useResumeForm } from '@/providers/resume-form-provider';

export const SaveChangesButton = () => {
  const { form, isResumeUpToDate, resume } = useResumeForm();
  const [loading, startTransition] = useTransition();

  if (!resume) return null;

  const handleUpdateResumeWithContent = async () => {
    try {
      const content = JSON.stringify(form.getValues());

      const imageUrl = await convertToImage();
      const formData = new FormData();
      formData.set('imageUrl', imageUrl!);

      await updateResume({ id: resume.id, content, formData });

      toast.success('Your Resume has been saved');

      form.reset(form.getValues());
    } catch (e) {
      let err = 'Something Went Wrong!';

      if (e instanceof Error) err = e.message;

      toast.error(err);
    }
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
