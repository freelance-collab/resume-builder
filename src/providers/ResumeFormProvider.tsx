import { ResumeSchemaType } from '@/components/resumes-templates/schema';
import { useForm } from 'react-hook-form';

const ResumeFormProvider = () => {
  const form = useForm<ResumeSchemaType>({
    resolver: zodResolver(resumeSchema),
    defaultValues: resume ? JSON.parse(resume.content) : getSavedData(),
    mode: 'onChange',
  });
};
