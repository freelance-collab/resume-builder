'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Resume } from '@prisma/client';
import { createContext, useContext } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

import { initialResumeData, resumeSchema, ResumeSchemaType } from '@/components/resumes-templates/schema';
import { usePersistForm } from '@/hooks/use-persist-form';
import { parseResume } from '@/lib/utils';

const FORM_DATA_KEY = 'resume-form';

interface IResumeFormContext {
  form: UseFormReturn<ResumeSchemaType>;
  isResumeUpToDate: boolean;
  resume?: Resume;
}

const ResumeFormContext = createContext<IResumeFormContext>({} as IResumeFormContext);

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

export const ResumeFormProvider = ({ resume, children }: { resume?: Resume; children: React.ReactNode }) => {
  const form = useForm<ResumeSchemaType>({
    resolver: zodResolver(resumeSchema),
    defaultValues: parseResume(resume ? JSON.parse(resume.content) : getSavedData()),
    mode: 'onChange',
  });

  usePersistForm({
    value: form.getValues(),
    localStorageKey: FORM_DATA_KEY,
    shouldPersist: !resume,
  });

  const isResumeUpToDate = !Object.keys(form.formState.dirtyFields).length;

  return <ResumeFormContext.Provider value={{ form, isResumeUpToDate, resume }}>{children}</ResumeFormContext.Provider>;
};

export const useResumeForm = () => {
  const resumeFormContext = useContext(ResumeFormContext);

  if (!resumeFormContext) {
    throw new Error('resumeFormContext has to be used within <ResumeFormProvider>');
  }

  return resumeFormContext;
};
