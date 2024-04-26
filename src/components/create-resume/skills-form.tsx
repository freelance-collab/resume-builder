import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { ResumeSchemaType } from '../resumes-templates/schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { MultipleSelector } from '../ui/multiple-selector';
import { AddFieldButton, RemoveFieldButton } from './form-buttons';

export const SkillsForm = ({ form }: { form: UseFormReturn<ResumeSchemaType> }) => {
  const {
    fields: skillsFields,
    append: appendSkills,
    remove: removeSkills,
  } = useFieldArray({
    name: 'skills',
    control: form.control,
  });

  return (
    <>
      <div className='space-y-4'>
        {skillsFields.map((field, index) => (
          <div key={field.id} className='flex animate-fade items-center gap-8'>
            <div key={field.id} className='grid flex-1 grid-cols-2 gap-x-8 gap-y-4 rounded-xl border p-6'>
              {/* Category */}
              <FormField
                control={form.control}
                name={`skills.${index}.category`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`skills.${index}.skills`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Skills</FormLabel>
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
            </div>
            <RemoveFieldButton onClick={() => removeSkills(index)} />
          </div>
        ))}
      </div>
      <AddFieldButton
        onClick={async () => {
          const res = await form.trigger('skills');

          if (res) {
            appendSkills({
              category: '',
              skills: [],
            });
          } else {
            toast.error('Please fill previous fields');
          }
        }}
      />
    </>
  );
};

export const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'React.js',
  'Angular.js',
  'Vue.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'SQL',
  'Git',
  'Responsive Design',
  'Sass/Less',
  'Webpack',
  'RESTful APIs',
  'GraphQL',
  'TypeScript',
  'UI/UX Design Principles',
  'Testing (Jest, Mocha, Chai)',
  'Firebase',
];
