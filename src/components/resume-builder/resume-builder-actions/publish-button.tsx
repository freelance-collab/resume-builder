import { Loader, Wand2Icon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { publishResume } from '@/actions/resumes';
import { useResumeForm } from '@/providers/resume-form-provider';

import { Button } from '../../ui/button';

export const PublishButton = ({
  published,
  setIsPublished,
  onUnAuthenticated,
}: {
  published: boolean;
  setIsPublished: () => void;
  onUnAuthenticated: () => void;
}) => {
  const session = useSession();
  const [loading, startTransition] = useTransition();
  const { form, resume, isResumeUpToDate } = useResumeForm();

  if (resume && (resume.published || published)) {
    return null;
  }

  const handlePublish = async (resumeId: string) => {
    try {
      await publishResume(resumeId);
      setIsPublished();
    } catch (e) {
      let err = 'Something Went Wrong!';

      if (e instanceof Error) err = e.message;

      toast.error(err);
    }
  };

  const handleSubmit = async () => {
    if (!isResumeUpToDate) {
      return toast.error('Please save your resume first');
    }

    const res = await form.trigger();
    if (!res) {
      return toast.error('Please check your resume data');
    }

    if (!session.data) {
      return onUnAuthenticated();
    }

    if (!resume) {
      return toast.error('You must save your resume first!');
    }

    startTransition(() => handlePublish(resume.id));
  };

  return (
    <>
      <Button
        className='bg-gradient-to-r from-green-400 to-blue-500 px-6  hover:from-green-500 hover:to-blue-500'
        disabled={loading}
        onClick={handleSubmit}
      >
        <Wand2Icon className='mr-1 h-4 w-4' />
        Publish
        {loading && <Loader className='ml-1 size-4 animate-spin' />}
      </Button>
    </>
  );
};
