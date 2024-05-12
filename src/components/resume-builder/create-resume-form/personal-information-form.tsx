import { PencilIcon, XIcon } from 'lucide-react';
import { useFieldArray, type UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { imageUpload } from '@/lib/utils';

import { type ResumeSchemaType } from '../../resumes-templates/schema';
import { FloatingLabelInput } from '../../ui/floating-label-input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { PhoneInput } from '../../ui/phone-input';
import { CountryDropdown } from './country-input';
import { AddFieldButton, RemoveFieldButton } from './form-buttons';
import { StateDropdown } from './state-input';

export const PersonalInformationForm = ({ form }: { form: UseFormReturn<ResumeSchemaType> }) => {
  return (
    <>
      <FormField
        control={form.control}
        name='personalInformation.picture'
        render={({ field: { onChange, value, ...rest } }) => (
          <>
            <FormItem>
              <FormControl>
                <div className='relative h-16 w-16 rounded-full'>
                  <Avatar className='h-full w-full'>
                    <AvatarImage src={value} className='object-cover' />
                    <AvatarFallback />
                  </Avatar>
                  <Input
                    type='file'
                    className='hidden'
                    id='image'
                    onChange={async (e) => {
                      if (!e.target.files) return;
                      const { fileInBase64 } = await imageUpload(e.target.files[0]);

                      onChange(fileInBase64);
                    }}
                    onClick={(e) => ((e.target as HTMLInputElement).value = '')}
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant='outline'
                        size='icon'
                        className='group absolute right-0 top-0 size-7 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full border-none
                  drop-shadow-lg hover:bg-background'
                        asChild
                      >
                        <Label htmlFor='image'>
                          <PencilIcon className='size-3 text-gray-400 duration-100 group-hover:text-primary' />
                        </Label>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Change Avatar</TooltipContent>
                  </Tooltip>

                  {value && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant='outline'
                          size='icon'
                          className='group absolute bottom-0 right-0 size-7 translate-x-1/2 translate-y-1/2 cursor-pointer rounded-full border-none
                    drop-shadow-lg hover:bg-background'
                          onClick={() => onChange('')}
                          type='button'
                        >
                          <XIcon className='size-3 text-gray-400 duration-100 group-hover:text-primary' />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Cancel Avatar</TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </>
        )}
      />

      {/* Name */}
      <FormField
        control={form.control}
        name='personalInformation.name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Job Title */}
      <FormField
        control={form.control}
        name='personalInformation.jobTitle'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Phone Number */}
      <FormField
        control={form.control}
        name='personalInformation.phoneNumber'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <PhoneInput {...field} defaultCountry='EG' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Country and State */}
      <div className='flex w-full gap-8'>
        <FormField
          control={form.control}
          name='personalInformation.country'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <CountryDropdown
                  country={field.value}
                  setCountry={(value) => {
                    form.resetField('personalInformation.state');

                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='personalInformation.state'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>State</FormLabel>
              <FormControl>
                <StateDropdown
                  state={field.value}
                  setState={field.onChange}
                  countryCode={form.getValues('personalInformation.country')?.value}
                  disabled={!form.getValues('personalInformation.country')?.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <LinksForm form={form} />
    </>
  );
};

export const LinksForm = ({ form }: { form: UseFormReturn<ResumeSchemaType> }) => {
  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    name: 'personalInformation.links',
    control: form.control,
  });

  return (
    <div className='space-y-4'>
      <FormLabel className='block'>Links</FormLabel>
      {linkFields.map((field, index) => (
        <div key={field.id} className='flex animate-fade gap-8'>
          <FormField
            control={form.control}
            name={`personalInformation.links.${index}.title`}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormControl>
                  <FloatingLabelInput {...field} label='Title' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`personalInformation.links.${index}.href`}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormControl>
                  <FloatingLabelInput {...field} label='Href' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <RemoveFieldButton onClick={() => removeLink(index)} />
        </div>
      ))}

      <AddFieldButton
        onClick={async () => {
          const res = await form.trigger('personalInformation.links');

          if (res) {
            appendLink({
              title: '',
              href: '',
            });
          } else {
            toast.error('Please fill previous fields');
          }
        }}
      />
    </div>
  );
};
