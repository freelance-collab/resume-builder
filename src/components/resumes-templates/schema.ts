import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const resumeSchema = z.object({
  personalInformation: z.object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters',
    }),
    jobTitle: z.string().min(2, {
      message: 'Job title must be at least 2 characters',
    }),
    phoneNumber: z.string().refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
    country: z.object({
      label: z.string(),
      value: z.string(),
    }),
    state: z.string().optional(),
    address: z.string().optional(),
    links: z.array(
      z.object({
        title: z.string().min(2, {
          message: 'Title must be at least 2 characters',
        }),
        href: z.string().url('Invalid URL, URL must start with http, https or mailto'),
      }),
    ),
  }),
  objective: z.string().optional(),
  educations: z.array(
    z.object({
      university: z.string(),
      major: z.string(),
      startYear: z.string(),
      endYear: z.string().optional(),
      grade: z.string().optional(),
    }),
  ),
  skills: z.array(
    z.object({
      category: z.string(),
      skills: z.array(z.string()),
    }),
  ),
  experiences: z.array(
    z.object({
      jobTitle: z.string(),
      company: z.string(),
      startDate: z.date(),
      endDate: z.date().optional(),
      description: z.string(),
    }),
  ),
  projects: z.array(
    z.object({
      title: z.string().min(2),
      href: z.string().url(),
      technologies: z.array(z.string()),
      description: z.string(),
    }),
  ),
});

export type ResumeSchemaType = z.infer<typeof resumeSchema>;

export const initialResumeData: ResumeSchemaType = {
  personalInformation: {
    name: '',
    jobTitle: '',
    country: {
      label: 'Egypt',
      value: 'EG',
    },
    phoneNumber: '',
    links: [
      // {
      //   title: 'mahmoudelalfy13@gmail.com',
      //   href: 'mailto:mahmoudelalfy13@gmail.com',
      // },
      // {
      //   title: 'linkedin',
      //   href: 'mailto:mahmoudelalfy13@gmail.com',
      // },
      // {
      //   title: 'github',
      //   href: 'mailto:mahmoudelalfy13@gmail.com',
      // },
      // {
      //   title: 'Portfolio',
      //   href: 'mailto:mahmoudelalfy13@gmail.com',
      // },
    ],
  },
  objective: '',

  educations: [
    // {
    //   major: 'Bachelor of Computers and Systems Engineering',
    //   university: 'Zagazig University',
    //   startYear: '2017',
    //   grade: 'Very Good 82%',
    // },
  ],
  skills: [
    // {
    //   category: 'Languages',
    //   skills: ['Javascript', 'Typescript', 'SQL'],
    // },
    // {
    //   category: 'Frameworks',
    //   skills: ['React', 'Nextjs', 'Angular', 'Nodejs', 'Nestjs'],
    // },
    // {
    //   category: 'Libraries',
    //   skills: ['Redux', 'Zustand', 'React Query', 'tailwindcss', 'MUI'],
    // },
  ],
  experiences: [
    // {
    //   jobTitle: 'Front-End Developer',
    //   company: 'Freelancing',
    //   startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    //   description:
    //     'However, if you arent manually creating the list and instead are just pasting it in from some dynamic data source... you will need to parse the html string so that each ul and li looks like the snippet above (<View style=, etc.)  I had to use this module for parsing my html: react-html-parser And then parse my string like this: ',
    // },
  ],
  projects: [],
};
