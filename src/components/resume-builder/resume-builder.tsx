'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Resume } from '@prisma/client';
import { CheckIcon, Columns2Icon, PencilIcon, SaveIcon, Wand2Icon, WandIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { CreateResumeForm } from '@/components/resume-builder/create-resume-form';
import { ResumePreview } from '@/components/resume-builder/resume-preview';
import { data, resumeSchema, ResumeSchemaType } from '@/components/resumes-templates/schema';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { cn } from '@/lib/utils';

import { Input } from '../ui/input';

export function ResumeBuilder({ resume }: { resume: Resume }) {
  const form = useForm<ResumeSchemaType>({
    resolver: zodResolver(resumeSchema),
    defaultValues: data,
    mode: 'onChange',
  });
  const [preview, setPreview] = useState(true);

  return (
    <div className='px-10'>
      <div className='mb-6 flex justify-between py-3'>
        <TitleForm title={resume.name} />
        <div className='flex gap-2'>
          <Button variant='outline' onClick={() => setPreview(!preview)}>
            <Columns2Icon className='mr-1 h-4 w-4' />
            {preview ? 'Hide Preview' : 'Preview'}
          </Button>
          <Button variant='outline'>
            <SaveIcon className='mr-1 h-4 w-4' />
            Save
          </Button>
          <Button className='bg-gradient-to-r from-green-400 to-blue-500 px-6  hover:from-green-500 hover:to-blue-500'>
            <Wand2Icon className='mr-1 h-4 w-4' />
            Publish
          </Button>
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
    </div>
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
