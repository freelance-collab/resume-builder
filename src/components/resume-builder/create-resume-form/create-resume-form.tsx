'use client';

import { ResumeSchemaType } from '@/components/resumes-templates/schema';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useResumeForm } from '@/providers/resume-form-provider';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Textarea } from '../../ui/textarea';
import { EducationForm } from './education-form';
import { ExperienceForm } from './experience-form';
import { PersonalInformationForm } from './personal-information-form';
import { ProjectsForm } from './projects-form';
import { SkillsForm } from './skills-form';

export function CreateResumeForm() {
  const { form } = useResumeForm();

  const onSubmit = (values: ResumeSchemaType) => {
    console.log(values);
  };

  return (
    <div>
      <h1 className='mb-4 text-2xl font-semibold'>Create Your Resume</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <Accordion type='single' collapsible className='w-full' defaultValue='personalInformation'>
            <AccordionItem value='personalInformation'>
              <AccordionTrigger>Personal Information</AccordionTrigger>
              <AccordionContent className='space-y-4 p-2'>
                <PersonalInformationForm form={form} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='objective'>
              <AccordionTrigger>Objective</AccordionTrigger>
              <AccordionContent className='p-2'>
                <FormField
                  control={form.control}
                  name='objective'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='educations'>
              <AccordionTrigger>Education</AccordionTrigger>
              <AccordionContent className='px-1 py-2'>
                <EducationForm form={form} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='skills'>
              <AccordionTrigger>Skills</AccordionTrigger>
              <AccordionContent className='px-1 py-2'>
                <SkillsForm form={form} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='experience'>
              <AccordionTrigger>Experience</AccordionTrigger>
              <AccordionContent className='px-1 py-2'>
                <ExperienceForm form={form} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='projects'>
              <AccordionTrigger>Projects</AccordionTrigger>
              <AccordionContent className='px-1 py-2'>
                <ProjectsForm form={form} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </Form>
    </div>
  );
}
