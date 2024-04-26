import { format } from 'date-fns';
import { Fragment } from 'react';

import { cn } from '@/lib/utils';

import { ResumeSchemaType } from './schema';

export const FONT_SIZE = {
  sm: 'text-[0.425rem]',
  base: 'text-[0.650rem]',
  lg: 'text-[0.725rem]',
  xl: 'text-[0.85rem]',
  '2xl': 'text-[1.225rem]',
};

export const FAANGTemplete = ({ data }: { data: ResumeSchemaType }) => {
  return (
    <div className={cn('p-8 font-cm', FONT_SIZE.base)}>
      {/* Heading */}
      <div className='flex flex-col items-center justify-center text-center'>
        <h1 className={cn('mb-1 font-bold uppercase tracking-wider', FONT_SIZE['2xl'])}>
          {data.personalInformation.name}
        </h1>
        <p className={cn('mb-1 font-bold uppercase tracking-wide', FONT_SIZE.lg)}>
          {data.personalInformation.jobTitle}
        </p>
        <div className={'mb-1 flex flex-row gap-2'}>
          <p>{data.personalInformation.phoneNumber}</p>
          <p>|</p>
          <p>
            {data.personalInformation.state && <>{data.personalInformation.state} ,</>}
            {data.personalInformation.country.label}
          </p>
        </div>

        <div className={'mb-7 flex flex-row gap-2'}>
          {data.personalInformation.links.map((link, i) => (
            <Fragment key={link.title}>
              <a href={link.href} className={'text-blue-600 no-underline'}>
                {link.title}
              </a>
              {i !== data.personalInformation.links.length - 1 && <p>|</p>}
            </Fragment>
          ))}
        </div>
      </div>

      {data.objective && (
        <Section title='objective'>
          <p>{data.objective}</p>
        </Section>
      )}

      {data.educations.length > 0 && (
        <Section title='education'>
          {data.educations.map((education, i) => (
            <EducationItem key={i} education={education} />
          ))}
        </Section>
      )}

      {data.skills.length > 0 && (
        <Section title='skills'>
          {data.skills.map((skill) => (
            <SkillItem key={skill.category} skill={skill} />
          ))}
        </Section>
      )}

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
  );
};

const ProjectItem = ({ project }: { project: ResumeSchemaType['projects'][number] }) => {
  return (
    <div className='mb-1'>
      <div className={cn('flex flex-row items-start gap-4')}>
        <h3 className={cn('font-bold text-blue-500', FONT_SIZE.lg)}>
          <a href={project.href}>{project.title}</a>
        </h3>
        <div>
          {project.technologies.map((tec, i) => (
            <span key={tec} className='mr-0.5 italic'>
              {tec}
              {i !== project.technologies.length - 1 && <span>,</span>}
            </span>
          ))}
        </div>
      </div>

      <p>{project.description}</p>
    </div>
  );
};

const ExperienceItem = ({ experience }: { experience: ResumeSchemaType['experiences'][number] }) => {
  return (
    <div>
      <div className={cn('flex flex-row items-start justify-between')}>
        <div className={cn('gap-0.5')}>
          <p className={cn('font-bold')}>{experience.jobTitle}</p>
          <p>{experience.company}</p>
        </div>
        <p>
          <>
            {`${format(experience.startDate, 'LLLL')}, ${experience.startDate.getFullYear()}`} -{' '}
            {experience.endDate
              ? `${format(experience.endDate, 'LLLL')}, ${experience.endDate.getFullYear()}`
              : 'Present'}
          </>
        </p>
      </div>
      <div className={cn('mt-2')}>
        <p>{experience.description}</p>
      </div>
    </div>
  );
};

const SkillItem = ({ skill }: { skill: ResumeSchemaType['skills'][number] }) => {
  return (
    <div className={cn('flex flex-row')}>
      <p className={cn('mb-0.5 w-44 font-bold')}>{skill.category}</p>
      <p>{skill.skills.join(', ')}</p>
    </div>
  );
};

const EducationItem = ({ education }: { education: ResumeSchemaType['educations'][number] }) => (
  <div>
    <div className={cn('flex flex-row items-center justify-between')}>
      <div className={cn('flex flex-row items-center')}>
        <p className={cn('mb-0.5 font-bold')}>{education.major}</p>
        {education.university && <p>, {education.university}</p>}
      </div>
      <p>
        {education.startYear}-{education.endYear ?? 'Present'}
      </p>
    </div>
    {education.grade && <p>{education.grade}</p>}
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className={'mb-6'}>
    <h2 className={cn('mb-1.5 border-b font-bold uppercase', FONT_SIZE.lg)}>{title}</h2>
    {children}
  </div>
);
