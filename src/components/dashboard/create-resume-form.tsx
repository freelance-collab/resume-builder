'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createResume } from '@/actions/resumes';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(100).default(''),
});

export const CreateResumeForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit();

    toast.promise(createResume(values), {
      loading: 'Creating resume...',
      success: 'Resume created successfully',
      error: (e: Error) => e.message ?? 'An error occurred while creating the resume',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='My Resume' {...field} />
              </FormControl>
              <FormDescription>This is your Resume name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className='h-32 resize-none' placeholder='Your resume description' {...field} />
              </FormControl>
              <FormDescription>This is your Resume description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Submit
        </Button>
      </form>
    </Form>
  );
};
