import { useFieldArray, type UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { type ResumeSchemaType } from '../resumes-templates/schema';
import { FloatingLabelInput } from '../ui/floating-label-input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { PhoneInput } from '../ui/phone-input';
import { CountryDropdown } from './country-input';
import { AddFieldButton, RemoveFieldButton } from './form-buttons';
import { StateDropdown } from './state-input';

export const PersonalInformationForm = ({ form }: { form: UseFormReturn<ResumeSchemaType> }) => {
  return (
    <>
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
                <CountryDropdown country={field.value} setCountry={field.onChange} />
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
