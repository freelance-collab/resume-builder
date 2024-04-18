import { MinusIcon, PlusIcon } from 'lucide-react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { ResumeSchemaType } from '../resumes-templates/schema';
import { Button } from '../ui/button';
import { FloatingLabelInput } from '../ui/floating-label-input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const year = new Date().getFullYear();
const years = Array.from(new Array(20), (val, index) => year - (19 - index));

export const EducationForm = ({ form }: { form: UseFormReturn<ResumeSchemaType> }) => {
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    name: 'educations',
    control: form.control,
  });

  return (
    <>
      <div className='space-y-4'>
        {educationFields.map((field, index) => (
          <div key={field.id} className='animate-fade flex items-center gap-8'>
            <div key={field.id} className='grid flex-1 grid-cols-2 gap-x-8 gap-y-4 rounded-xl border p-6'>
              {/* University */}
              <FormField
                control={form.control}
                name={`educations.${index}.university`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <FloatingLabelInput {...field} label='University' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Major */}
              <FormField
                control={form.control}
                name={`educations.${index}.major`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <FloatingLabelInput {...field} label='Major' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Start Year */}
              <FormField
                control={form.control}
                name={`educations.${index}.startYear`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Start Year</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select start year' />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Year */}
              <FormField
                control={form.control}
                name={`educations.${index}.endYear`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>End Year</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select end year' />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Grade */}
              <FormField
                control={form.control}
                name={`educations.${index}.grade`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <FloatingLabelInput {...field} label='Grade' />
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
              onClick={() => removeEducation(index)}
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
            appendEducation({
              university: '',
              major: '',
              startYear: '',
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
