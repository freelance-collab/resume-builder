import { Document, Font, Link, Page, Text, View } from '@react-pdf/renderer';
import { Fragment } from 'react';
import { createTw } from 'react-pdf-tailwind';

import { ResumeSchemaType } from './schema';

Font.register({
  family: 'CM',
  fonts: [
    {
      src: '/fonts/cm.ttf',
      fontWeight: 400,
    },
    {
      src: '/fonts/cm2.ttf',
      fontWeight: 700,
    },
  ],
});

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ['CM'],
    },
    fontSize: {
      sm: '0.625rem',
      base: '0.875rem',
      lg: '1rem',
      xl: '1.125rem',
      '2xl': '1.5rem',
    },
  },
});

export const FAANGDocument = ({ data }: { data: ResumeSchemaType }) => (
  <Document>
    <Page size='A4' style={tw('p-12 font-sans text-base')}>
      {/* Heading */}
      <View style={tw('items-center justify-center text-center')}>
        <Text style={tw('mb-1 text-2xl font-bold uppercase tracking-wider')}>{data.personalInformation.name}</Text>
        <Text style={tw('mb-1 text-lg font-bold uppercase tracking-wide')}>{data.personalInformation.jobTitle}</Text>
        <View style={tw('mb-1 flex-row gap-2')}>
          <Text>{data.personalInformation.phoneNumber}</Text>
          <Text>|</Text>
          <Text>
            <>
              {data.personalInformation.state}, {data.personalInformation.country.value}
            </>
          </Text>
        </View>
        <View style={tw('mb-7 flex-row gap-2')}>
          {data.personalInformation.links.map((link, i) => (
            <Fragment key={link.title}>
              <Link href={link.href} style={tw('no-underline')}>
                {link.title}
              </Link>
              {i !== data.personalInformation.links.length - 1 && <Text>|</Text>}
            </Fragment>
          ))}
        </View>
      </View>

      <Section title='objective'>
        <Text>{data.objective}</Text>
      </Section>

      <Section title='education'>
        {data.educations.map((education, i) => (
          <EducationItem key={i} education={education} />
        ))}
      </Section>

      <Section title='skills'>
        {data.skills.map((skill) => (
          <SkillItem key={skill.category} skill={skill} />
        ))}
      </Section>

      <Section title='EXPERIENCE'>
        {data.experiences.map((experience, i) => (
          <ExperienceItem key={i} experience={experience} />
        ))}
      </Section>
    </Page>
  </Document>
);

const ExperienceItem = ({ experience }: { experience: ResumeSchemaType['experiences'][number] }) => {
  return (
    <View>
      <View style={tw('flex-row items-start justify-between')}>
        <View style={tw('gap-0.5')}>
          <Text style={tw('font-bold')}>{experience.jobTitle}</Text>
          <Text>{experience.company}</Text>
        </View>
        <Text>
          <>
            {experience.startDate} - {experience.endDate ?? 'Present'}
          </>
        </Text>
      </View>
      <View style={tw('mt-2')}>
        <Text>{experience.description}</Text>
      </View>
    </View>
  );
};

const SkillItem = ({ skill }: { skill: ResumeSchemaType['skills'][number] }) => {
  return (
    <View style={tw('flex-row')}>
      <Text style={tw('mb-0.5 w-44 font-bold')}>{skill.category}</Text>
      <Text>{skill.skills.join(', ')}</Text>
    </View>
  );
};

const EducationItem = ({ education }: { education: ResumeSchemaType['educations'][number] }) => (
  <View>
    <View style={tw('flex-row items-center justify-between')}>
      <View style={tw('flex-row items-center')}>
        <Text style={tw('mb-0.5 font-bold')}>{education.major}</Text>
        <Text>, {education.university}</Text>
      </View>
      <Text>
        {education.startYear}-{education.endYear ?? 'Present'}
      </Text>
    </View>
    {education.grade && <Text>{education.grade}</Text>}
  </View>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={tw('mb-8')}>
    <Text style={tw('mb-1.5 border-b text-lg font-bold uppercase')}>{title}</Text>
    {children}
  </View>
);
