import { MinusIcon, PlusIcon } from 'lucide-react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { ResumeSchemaType } from '../resumes-templates/schema';
import { Button } from '../ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import MultipleSelector from '../ui/multiple-selector';

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
          <div key={field.id} className='animate-fade flex items-center gap-8'>
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
                        value={field.value.map((item) => ({ value: item, label: item }))}
                        onChange={(value) => {
                          field.onChange(value.map((item) => item.value));
                        }}
                        defaultOptions={skills.map((item) => ({ value: item, label: item }))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type='button'
              variant='destructive'
              className='h-8 w-8 flex-shrink-0'
              size='icon'
              onClick={() => removeSkills(index)}
            >
              <MinusIcon className='h-4 w-4' />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type='button'
        variant='outline'
        className='mt-4 h-8 w-8 rounded-full'
        size='icon'
        onClick={async () => {
          const res = await form.trigger('educations');

          if (res) {
            appendSkills({
              category: '',
              skills: [],
            });
          } else {
            toast.error('Please fill previous fields');
          }
        }}
      >
        <PlusIcon className='h-4 w-4' />
      </Button>
    </>
  );
};

const skills = [
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
  'Webpack',
  'Firebase',
];
