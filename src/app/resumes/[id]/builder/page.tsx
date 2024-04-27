import { getResumeById } from '@/actions/resumes';
import { ResumeBuilder } from '@/components/resume-builder/resume-builder';

export default async function ResumeBuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  const resume = await getResumeById(id);

  if (!resume) {
    throw new Error('Resume Not Found');
  }

  return <ResumeBuilder resume={resume} />;
}
