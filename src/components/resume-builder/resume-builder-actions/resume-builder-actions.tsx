import { Columns2Icon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { UnauthenticatedAlert } from './not-logged-alert';
import { PublishButton } from './publish-button';
import { SaveChangesButton } from './save-changes-button';
import { SaveResumeButton } from './save-resume-button';

interface ResumeBuilderActionsProps {
  preview: boolean;
  onPreview: () => void;
  published: boolean;
  setIsPublished: () => void;
  title: string;
}

export const ResumeBuilderActions = ({
  preview,
  onPreview,
  published,
  setIsPublished,
  title,
}: ResumeBuilderActionsProps) => {
  const [open, setIsOpen] = useState(false);

  return (
    <>
      <UnauthenticatedAlert open={open} setIsOpen={setIsOpen} />
      <div className='flex gap-2'>
        <Button variant='outline' onClick={onPreview}>
          <Columns2Icon className='mr-1 h-4 w-4' />
          {preview ? 'Hide Preview' : 'Preview'}
        </Button>
        <SaveChangesButton />
        <SaveResumeButton title={title} onUnAuthenticated={() => setIsOpen(true)} />
        <PublishButton
          onUnAuthenticated={() => setIsOpen(true)}
          published={published}
          setIsPublished={setIsPublished}
        />
      </div>
    </>
  );
};
