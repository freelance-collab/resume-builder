'use client';

import { LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { PortfolioTemplate } from '@/app/[subdomain]/portfolio-template';
import { CreateResumeForm } from '@/components/resume-builder/create-resume-form/create-resume-form';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { getRandomName } from '@/lib/random-name';
import { cn } from '@/lib/utils';
import { useResumeForm } from '@/providers/resume-form-provider';

import { PublishedResumeAlert } from './published-resume-alert';
import { ResumeBuilderActions } from './resume-builder-actions/resume-builder-actions';
import { TitleForm } from './title-form';

export function ResumeBuilder() {
  const { form, resume } = useResumeForm();

  const [title, setTitle] = useState(resume?.name || getRandomName());
  const [preview, setPreview] = useState(true);
  const [published, setIsPublished] = useState(false);

  const shareUrl = `${window.location.origin}/resumes/${resume?.id}`;

  return (
    <>
      {published && <PublishedResumeAlert shareUrl={shareUrl} />}
      {/* Header */}
      <div className='mb-6 flex justify-between py-3'>
        <div>
          <TitleForm title={title} onChange={setTitle} />
          {resume && (resume.published || published) && (
            <Link href={`/resumes/${resume.id}`} className='flex items-center p-2'>
              {shareUrl} <LinkIcon className='ml-1 size-4' />
            </Link>
          )}
        </div>

        <ResumeBuilderActions
          preview={preview}
          onPreview={() => setPreview(!preview)}
          published={published}
          setIsPublished={() => setIsPublished(true)}
          title={title}
        />
      </div>

      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel className={cn('pb-10', !preview && 'mx-auto max-w-6xl')}>
          <CreateResumeForm />
        </ResizablePanel>
        {preview && (
          <>
            <ResizableHandle withHandle className='mx-10' />
            <ResizablePanel className='flex flex-col justify-center'>
              {/* <ResumePreview data={form.getValues()} /> */}
              <PortfolioTemplate data={form.getValues()} />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </>
  );
}
