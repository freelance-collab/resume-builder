import { notFound } from 'next/navigation';

import { getResumeById } from '@/actions/resumes';
import { parseResume } from '@/lib/utils';

import { PortfolioTemplate } from './portfolio-template';

const Page = async ({ params }: { params: { subdomain: string } }) => {
  const resume = await getResumeById(params.subdomain);

  if (!resume) {
    return notFound();
  }

  return <PortfolioTemplate data={parseResume(JSON.parse(resume.content))} />;
};

export default Page;
