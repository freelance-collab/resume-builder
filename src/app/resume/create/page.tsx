'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { CreateResumeForm } from '@/components/create-resume/create-resume-form';
// import { ResumePreview } from '@/components/create-resume/resume-preview';
import { data, resumeSchema, ResumeSchemaType } from '@/components/resumes-templates/schema';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { cn } from '@/lib/utils';

export default function ResumePage() {
  const form = useForm<ResumeSchemaType>({
    resolver: zodResolver(resumeSchema),
    defaultValues: data,
    mode: 'onChange',
  });
  const [preview, setPreview] = useState(false);

  return (
    <div className='px-10'>
      <div className='mb-6 flex justify-between py-3'>
        <h4>Resume</h4>
        <div>
          <Button onClick={() => setPreview(!preview)}>Preview</Button>
        </div>
      </div>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel className={cn('pb-10', !preview && 'mx-auto max-w-6xl')}>
          <CreateResumeForm form={form} />
        </ResizablePanel>
        {preview && (
          <>
            <ResizableHandle withHandle className='mx-10' />
            <ResizablePanel>{/* <ResumePreview data={form.getValues()} /> */}</ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
