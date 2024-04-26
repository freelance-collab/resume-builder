import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { ResumeSchemaType } from '../resumes-templates/schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { MultipleSelector } from '../ui/multiple-selector';
import { Textarea } from '../ui/textarea';
import { AddFieldButton, RemoveFieldButton } from './form-buttons';
import { skills } from './skills-form';

export const ProjectsForm = ({ form }: { form: UseFormReturn<ResumeSchemaType> }) => {
  const {
    fields: projectsFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    name: 'projects',
    control: form.control,
  });

  return (
    <>
      <div className='space-y-4'>
        {projectsFields.map((field, index) => (
          <div key={field.id} className='flex animate-fade items-center gap-8'>
            <div className='flex-1 space-y-4 rounded-xl border p-6'>
              <div key={field.id} className='grid flex-1 grid-cols-2 gap-x-8 gap-y-4'>
                {/* title */}
                <FormField
                  control={form.control}
                  name={`projects.${index}.title`}
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`projects.${index}.href`}
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Href</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`projects.${index}.technologies`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Technologies</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        creatable
                        defaultOptions={skills.map((item) => ({ value: item, label: item }))}
                        onChange={(value) => {
                          field.onChange(value.map((item) => item.value));
                        }}
                        value={field.value.map((item) => ({ value: item, label: item }))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`projects.${index}.description`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} className='h-[100px]' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <RemoveFieldButton onClick={() => removeProject(index)} />
          </div>
        ))}
      </div>
      <AddFieldButton
        onClick={async () => {
          const res = await form.trigger('projects');

          if (res) {
            appendProject({
              title: '',
              href: '',
              description: '',
              technologies: [],
            });
          } else {
            toast.error('Please fill previous fields');
          }
        }}
      />
    </>
  );
};
