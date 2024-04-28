'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Resume } from '@prisma/client';
import { CheckIcon, Columns2Icon, LinkIcon, Loader, PencilIcon, SaveIcon, Wand2Icon } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import Confetti from 'react-confetti';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { toast } from 'sonner';

import { publishResume, updateResume } from '@/actions/resumes';
import { CreateResumeForm } from '@/components/resume-builder/create-resume-form';
import { ResumePreview } from '@/components/resume-builder/resume-preview';
import { resumeSchema, ResumeSchemaType } from '@/components/resumes-templates/schema';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { saveResume } from '@/lib/local-resume';
import { cn } from '@/lib/utils';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';

export function ResumeBuilder({ resume, isLocal = false }: { resume: Resume; isLocal?: boolean }) {
  const resumeContent: ResumeSchemaType = JSON.parse(resume.content);

  const form = useForm<ResumeSchemaType>({
    resolver: zodResolver(resumeSchema),
    defaultValues: resumeContent,
    mode: 'onChange',
  });
  const [preview, setPreview] = useState(true);
  const [published, setIsPublished] = useState(false);

  const shareUrl = typeof window && `${window.location.origin}/resumes/${resume.id}`;

  const isResumeUpToDate = !Object.keys(form.formState.dirtyFields).length;

  return (
    <>
      {published && <PublishedDialog shareUrl={shareUrl} />}
      <div className='mb-6 flex justify-between py-3'>
        <div>
          <TitleForm title={resume.name} />
          {(published || resume.published) && (
            <Link href={`/resumes/${resume.id}`} className='flex items-center p-2'>
              {shareUrl} <LinkIcon className='ml-1 size-4' />
            </Link>
          )}
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={() => setPreview(!preview)}>
            <Columns2Icon className='mr-1 h-4 w-4' />
            {preview ? 'Hide Preview' : 'Preview'}
          </Button>

          <SaveResumeButton
            handleSubmit={form.handleSubmit}
            resumeId={resume.id}
            isUpToDate={isResumeUpToDate}
            onSuccess={form.reset}
            isLocal={isLocal}
          />

          {!resume.published && !published && (
            <PublishButton
              resumeId={resume.id}
              onSuccess={() => setIsPublished(true)}
              shouldPublish={form.trigger}
              isUpToDate={isResumeUpToDate}
              isLocal={isLocal}
            />
          )}
        </div>
      </div>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel className={cn('pb-10', !preview && 'mx-auto max-w-6xl')}>
          <CreateResumeForm form={form} />
        </ResizablePanel>
        {preview && (
          <>
            <ResizableHandle withHandle className='mx-10' />
            <ResizablePanel className='flex justify-center'>
              <ResumePreview data={form.getValues()} />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </>
  );
}

export const TitleForm = ({ title }: { title: string }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='flex items-center gap-2'>
      {!isEdit && <h4 className='text-2xl font-semibold capitalize'>{title}</h4>}
      {isEdit && <Input className='w-[250px]  p-2 text-2xl font-semibold capitalize ' defaultValue={title} />}
      {!isEdit && (
        <button onClick={() => setIsEdit(!isEdit)}>
          <PencilIcon className='size-4' />
        </button>
      )}
      {isEdit && (
        <Button onClick={() => setIsEdit(!isEdit)} size='icon' variant='outline' className='flex-shrink-0'>
          <CheckIcon className='size-4' />
        </Button>
      )}
    </div>
  );
};

const SaveResumeButton = ({
  resumeId,
  handleSubmit,
  isUpToDate,
  onSuccess,
  isLocal,
}: {
  resumeId: string;
  handleSubmit: UseFormHandleSubmit<ResumeSchemaType>;
  isUpToDate: boolean;
  onSuccess: (values: ResumeSchemaType) => void;
  isLocal: boolean;
}) => {
  const [loading, startTransition] = useTransition();

  const updateResumeWithContent = async (values: ResumeSchemaType) => {
    try {
      const content = JSON.stringify(values);

      if (isLocal) {
        saveResume(content);
      } else {
        await updateResume({ id: resumeId, content });
      }

      toast.success('Your Resume has been saved');

      onSuccess(values);
    } catch (e) {
      let err = 'Something Went Wrong!';

      if (e instanceof Error) err = e.message;

      toast.error(err);
    }
  };

  const submitHandler = (values: ResumeSchemaType) => {
    startTransition(() => updateResumeWithContent(values));
  };

  return (
    <Button variant='outline' onClick={handleSubmit(submitHandler)} disabled={loading || isUpToDate}>
      <SaveIcon className='mr-1 h-4 w-4' />
      {isUpToDate ? 'Saved' : 'Save'}
      {loading && <Loader className='ml-1 size-4 animate-spin' />}
    </Button>
  );
};

const PublishButton = ({
  resumeId,
  onSuccess,
  shouldPublish,
  isUpToDate,
  isLocal,
}: {
  resumeId: string;
  onSuccess: () => void;
  shouldPublish: () => Promise<boolean>;
  isUpToDate: boolean;
  isLocal: boolean;
}) => {
  const [loading, startTransition] = useTransition();

  const onPublish = async () => {
    try {
      await publishResume(resumeId);
      onSuccess();
    } catch (e) {
      let err = 'Something Went Wrong!';

      if (e instanceof Error) err = e.message;

      toast.error(err);
    }
  };

  const handlePublish = async () => {
    if (isLocal) {
      toast.error('You should be logged in to utilize publish feature');
      return;
    }

    if (!isUpToDate) {
      toast.error('Please save your resume first');
      return;
    }

    const res = await shouldPublish();
    if (!res) {
      toast.error('Please check your resume data');
      return;
    }

    startTransition(onPublish);
  };

  return (
    <Button
      className='bg-gradient-to-r from-green-400 to-blue-500 px-6  hover:from-green-500 hover:to-blue-500'
      disabled={loading}
      onClick={handlePublish}
    >
      <Wand2Icon className='mr-1 h-4 w-4' />
      Publish
      {loading && <Loader className='ml-1 size-4 animate-spin' />}
    </Button>
  );
};

const PublishedDialog = ({ shareUrl }: { shareUrl: string }) => {
  return (
    <Dialog defaultOpen>
      <Confetti
        width={window?.innerWidth}
        height={window?.innerHeight}
        recycle={false}
        numberOfPieces={1000}
        className='!z-[1000]'
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-xl'>Resume Published</DialogTitle>
          <DialogDescription>
            <h4 className='font-semibold'>Share the URL</h4>
            Anyone with this link can view and download your resume
          </DialogDescription>
        </DialogHeader>
        <div className='flex w-full flex-col items-center gap-2 border-b pb-4'>
          <Input className='w-full' readOnly value={shareUrl} />
          <Button
            className='mt-2 w-full'
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              toast('Copied!', {
                description: 'Link copied to clipboard',
              });
            }}
          >
            Copy link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
