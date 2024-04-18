'use client';

import { PlusIcon } from 'lucide-react';
import React from 'react';

import { Button } from '../ui/button';
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '../ui/credenza';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { CreateResumeForm } from './create-resume-form';

export const CreateResumeDialog = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <Tooltip>
        <CredenzaTrigger asChild>
          <TooltipTrigger asChild>
            <Button size='icon' className='rounded-full' variant='outline'>
              <PlusIcon />
            </Button>
          </TooltipTrigger>
        </CredenzaTrigger>
        <TooltipContent>Create new resume</TooltipContent>
      </Tooltip>

      <CredenzaContent className='sm:max-w-[425px]'>
        <CredenzaHeader>
          <CredenzaTitle>Create Resume</CredenzaTitle>
          <CredenzaDescription>Create a new resume here.</CredenzaDescription>
        </CredenzaHeader>
        <CreateResumeForm onSubmit={() => setOpen(false)} />
      </CredenzaContent>
    </Credenza>
  );
};
