'use client';

import { notFound } from 'next/navigation';

import { getResume } from '@/lib/local-resume';

import { ResumeBuilder } from './resume-builder';

export const LocalResumeBuilder = () => {
  const resume = getResume();

  if (!resume) {
    return notFound();
  }

  return (
    <ResumeBuilder
      resume={{
        name: 'New Resume',
        id: new Date().toISOString(),
        content: resume,
        createdAt: new Date(),
        description: '',
        published: false,
        shareURL: '',
        updatedAt: new Date(),
        userId: '',
      }}
      isLocal={true}
    />
  );
};
