import { notFound } from 'next/navigation';

import { getPublishResumeByIdAction } from '@/actions/resumes-actions';
import { parseResume } from '@/lib/utils';

import { PortfolioTemplate } from './portfolio-template';

const Page = async ({ params }: { params: { subdomain: string } }) => {
  const { data: resume, serverError } = await getPublishResumeByIdAction({ id: params.subdomain });

  if (serverError) {
    throw serverError;
  }

  if (!resume) {
    return notFound();
  }

  return <PortfolioTemplate data={parseResume(resume.content, resume.picture)} />;
};

export default Page;
