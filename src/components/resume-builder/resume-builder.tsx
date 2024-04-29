'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Resume } from '@prisma/client';
import { CheckIcon, Columns2Icon, LinkIcon, Loader, PencilIcon, SaveIcon, Wand2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { toast } from 'sonner';

import { createResume, publishResume, updateResume } from '@/actions/resumes';
import { CreateResumeForm } from '@/components/resume-builder/create-resume-form';
import { ResumePreview } from '@/components/resume-builder/resume-preview';
import { initialResumeData, resumeSchema, ResumeSchemaType } from '@/components/resumes-templates/schema';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { usePersistForm } from '@/hooks/use-persist-form';
import { getRandomName } from '@/lib/random-name';
import { cn } from '@/lib/utils';

import { Input } from '../ui/input';
import { UnauthenticatedAlert } from './not-logged-alert';
import { PublishedResumeAlert } from './published-resume-alert';

const FORM_DATA_KEY = 'resume-form';

const getSavedData = () => {
  if (typeof window !== 'undefined') {
    let data = localStorage.getItem(FORM_DATA_KEY);
    if (data) {
      // Parse it to a javaScript object
      try {
        data = JSON.parse(data);
      } catch (err) {
        console.log(err);
      }
      return data;
    }
  }
  return initialResumeData;
};

export function ResumeBuilder({ resume }: { resume?: Resume }) {
  const [title, setTitle] = useState(resume?.name || getRandomName());

  const form = useForm<ResumeSchemaType>({
    resolver: zodResolver(resumeSchema),
    defaultValues: resume ? JSON.parse(resume.content) : getSavedData(),
    mode: 'onChange',
  });

  usePersistForm({
    value: form.getValues(),
    localStorageKey: FORM_DATA_KEY,
    shouldPersist: !resume,
  });

  const [preview, setPreview] = useState(true);
  const [published, setIsPublished] = useState(false);
  const [open, setIsOpen] = useState(false);

  let shareUrl = '';
  if (typeof window !== undefined && resume) {
    shareUrl = `${window.location.origin}/resumes/${resume.id}`;
  }

  const isResumeUpToDate = !Object.keys(form.formState.dirtyFields).length;

  return (
    <>
      <UnauthenticatedAlert open={open} setIsOpen={setIsOpen} />
      {published && <PublishedResumeAlert shareUrl={shareUrl} />}
      <div className='mb-6 flex justify-between py-3'>
        <div>
          <TitleForm title={title} onChange={setTitle} />
          {resume && (published || resume.published) && (
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

          {resume && (
            <SaveChangesButton
              handleSubmit={form.handleSubmit}
              resumeId={resume.id}
              isUpToDate={isResumeUpToDate}
              onSuccess={form.reset}
            />
          )}

          {!resume && (
            <SaveResumeButton
              isFormValid={form.trigger}
              title={title}
              values={form.getValues()}
              onUnAuthenticated={() => setIsOpen(true)}
            />
          )}

          {resume && !resume.published && !published && (
            <PublishButton
              resumeId={resume.id}
              onSuccess={() => setIsPublished(true)}
              shouldPublish={form.trigger}
              isUpToDate={isResumeUpToDate}
            />
          )}

          {!resume && (
            <Button
              className='bg-gradient-to-r from-green-400 to-blue-500 px-6  hover:from-green-500 hover:to-blue-500'
              onClick={() => setIsOpen(true)}
            >
              <Wand2Icon className='mr-1 h-4 w-4' />
              Publish
            </Button>
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

export const TitleForm = ({ title, onChange }: { title: string; onChange: (title: string) => void }) => {
  const [isEdit, setIsEdit] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div className='flex items-center gap-2'>
      {!isEdit && <h4 className='text-2xl font-semibold capitalize'>{title}</h4>}
      {isEdit && <Input className='w-[250px]  p-2 text-2xl font-semibold capitalize ' defaultValue={title} ref={ref} />}

      {!isEdit && (
        <button onClick={() => setIsEdit(!isEdit)}>
          <PencilIcon className='size-4' />
        </button>
      )}
      {isEdit && (
        <Button
          onClick={() => {
            if (ref.current && ref.current.value) {
              onChange(ref.current.value);
            }
            setIsEdit(!isEdit);
          }}
          size='icon'
          variant='outline'
          className='flex-shrink-0'
        >
          <CheckIcon className='size-4' />
        </Button>
      )}
    </div>
  );
};

const SaveResumeButton = ({
  isFormValid,
  title,
  values,
  onUnAuthenticated,
}: {
  isFormValid: () => Promise<boolean>;
  title: string;
  values: ResumeSchemaType;
  onUnAuthenticated: () => void;
}) => {
  const session = useSession();
  const router = useRouter();

  const [loading, startTransition] = useTransition();

  const handleSaveResume = async () => {
    try {
      const content = JSON.stringify(values);

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

  const submitHandler = async () => {
    const res = await isFormValid();
    if (!res) {
      return toast.error('Please Check your resume data');
    }

    if (!session.data) {
      return onUnAuthenticated();
    }

    startTransition(() => handleSaveResume());
  };

  return (
    <Button variant='outline' onClick={submitHandler} disabled={loading}>
      <SaveIcon className='mr-1 h-4 w-4' />
      Save
      {loading && <Loader className='ml-1 size-4 animate-spin' />}
    </Button>
  );
};

const SaveChangesButton = ({
  resumeId,
  handleSubmit,
  isUpToDate,
  onSuccess,
}: {
  resumeId: string;
  handleSubmit: UseFormHandleSubmit<ResumeSchemaType>;
  isUpToDate: boolean;
  onSuccess: (values: ResumeSchemaType) => void;
}) => {
  const [loading, startTransition] = useTransition();

  const updateResumeWithContent = async (values: ResumeSchemaType) => {
    try {
      const content = JSON.stringify(values);

      await updateResume({ id: resumeId, content });

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
      {isUpToDate ? 'Saved' : 'Save Changes'}
      {loading && <Loader className='ml-1 size-4 animate-spin' />}
    </Button>
  );
};

const PublishButton = ({
  resumeId,
  onSuccess,
  shouldPublish,
  isUpToDate,
}: {
  resumeId: string;
  onSuccess: () => void;
  shouldPublish: () => Promise<boolean>;
  isUpToDate: boolean;
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
