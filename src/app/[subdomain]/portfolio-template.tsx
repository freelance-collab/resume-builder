'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { ResumeSchemaType } from '@/components/resumes-templates/schema';
import { Button } from '@/components/ui/button';

export const PortfolioTemplate = ({ data }: { data: ResumeSchemaType }) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Button onClick={handlePrint} className='mx-auto'>
        Print
      </Button>
      <div className='container my-10 flex flex-wrap gap-10' id='resume' ref={componentRef}>
        <div className='h-fit flex-1 basis-[300px]'>
          {data.personalInformation.picture && (
            <div className='h-[200px] w-[200px] rounded-full'>
              <Image
                src={data.personalInformation.picture}
                width={300}
                height={300}
                alt='avatar'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
          )}
          <h1 className='my-4 text-xl font-bold uppercase'>{data.personalInformation.name}</h1>
          <p className='text-sm tracking-widest'>{data.objective}</p>

          <div className='my-4 divide-y-2 divide-black border-b-2 border-t-2 border-black text-sm font-semibold'>
            <div className='flex items-center justify-between py-3'>
              <h2>PROFESSION</h2>
              <p>{data.personalInformation.jobTitle}</p>
            </div>
            <div className='flex items-center justify-between py-3'>
              <h2>Phone Number</h2>
              <p>{data.personalInformation.phoneNumber}</p>
            </div>
            <div className='flex items-center justify-between py-3'>
              <h2>Location</h2>
              <p>
                {data.personalInformation.country.label}
                {data.personalInformation.state && <>, {data.personalInformation.state}</>}
              </p>
            </div>
            <div className='py-3'>
              <h2>Links</h2>
              <div className='mt-1 flex flex-wrap gap-2'>
                {data.personalInformation.links.map((link, i) => (
                  <a href={link.href} key={i} className='capitalize text-blue-600 no-underline'>
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {data.educations.length > 0 && (
            <Section title='Education' className='mt-10'>
              {data.educations.map((education, i) => (
                <EducationItem key={i} education={education} />
              ))}
            </Section>
          )}

          {data.skills.length > 0 && (
            <Section title='Skills'>
              {data.skills.map((skill, i) => (
                <SkillItem key={i} skill={skill} />
              ))}
            </Section>
          )}
        </div>

        <div className='h-fit flex-[3] basis-[400px]'>
          {data.experiences.length > 0 && (
            <Section title='EXPERIENCE'>
              {data.experiences.map((experience, i) => (
                <ExperienceItem key={i} experience={experience} />
              ))}
            </Section>
          )}

          {data.projects.length > 0 && (
            <Section title='Projects'>
              {data.projects.map((project, i) => (
                <ProjectItem key={i} project={project} />
              ))}
            </Section>
          )}
        </div>
      </div>
    </>
  );
};

const ProjectItem = ({ project }: { project: ResumeSchemaType['projects'][number] }) => (
  <div className='py-4'>
    <div className='mb-3 flex items-center justify-between'>
      <h2 className='text-lg font-semibold'>
        <a href={project.href}>{project.title}</a>
      </h2>
      <p className='rounded-full border px-3 py-1 text-sm font-semibold'>{project.technologies.join(', ')}</p>
    </div>
    <p className='text-sm'>{project.description}</p>
  </div>
);

const ExperienceItem = ({ experience }: { experience: ResumeSchemaType['experiences'][number] }) => (
  <div className='py-4'>
    <div className='mb-3 flex items-center justify-between'>
      <h2 className='text-lg font-semibold'>{experience.company}</h2>
      <div className='text-right text-sm font-semibold'>
        <p>
          {`${format(experience.startDate, 'LLLL')}, ${experience.startDate.getFullYear()}`} -{' '}
          {experience.endDate
            ? `${format(experience.endDate, 'LLLL')}, ${experience.endDate.getFullYear()}`
            : 'Present'}
        </p>
        <p>{experience.jobTitle}</p>
      </div>
    </div>
    <p className='text-sm'>{experience.description}</p>
  </div>
);

const SkillItem = ({ skill }: { skill: ResumeSchemaType['skills'][number] }) => (
  <div className='py-2'>
    <p className='w-44 font-semibold'>{skill.category}</p>
    <p className='text-sm'>{skill.skills.join(', ')}</p>
  </div>
);

const EducationItem = ({ education }: { education: ResumeSchemaType['educations'][number] }) => (
  <div className='py-4'>
    <div className='mb-3'>
      <h2 className='font-semibold'>{education.major}</h2>
      <p className='text-sm font-medium'>{education.university}</p>
      <p className='py-1 text-sm italic'>
        {education.startYear} - {education.endYear ?? 'Present'}
      </p>
      <p className='text-sm'>{education.grade}</p>
    </div>
  </div>
);

const Section = ({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) => (
  <div className={className}>
    <h1 className='text-right text-2xl font-bold uppercase'>{title}</h1>
    <div className='mt-4 h-[1px] bg-black dark:bg-slate-100'></div>
    <div className='mt-1 h-1 bg-black dark:bg-slate-100'></div>

    <div className='mt-4 divide-y'>{children}</div>
  </div>
);
