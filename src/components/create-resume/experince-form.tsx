import { MinusIcon, PlusIcon } from 'lucide-react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { ResumeSchemaType } from '../resumes-templates/schema';
import { Button } from '../ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export const ExperienceForm = ({ form }: { form: UseFormReturn<ResumeSchemaType> }) => {
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    name: 'experiences',
    control: form.control,
  });

  return (
    <>
      <div className='space-y-4'>
        {experienceFields.map((field, index) => (
          <div key={field.id} className='animate-fade flex items-center gap-8'>
            <div key={field.id} className='grid flex-1 grid-cols-2 gap-x-8 gap-y-4 rounded-xl border p-6'>
              {/* Category */}
              <FormField
                control={form.control}
                name={`experiences.${index}.jobTitle`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`experiences.${index}.company`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`experiences.${index}.startDate`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`experiences.${index}.endDate`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`experiences.${index}.description`}
                render={({ field }) => (
                  <FormItem className='col-span-2 flex-1'>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
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
              onClick={() => removeExperience(index)}
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
            appendExperience({
              jobTitle: '',
              company: '',
              startDate: '',
              endDate: '',
              description: '',
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
