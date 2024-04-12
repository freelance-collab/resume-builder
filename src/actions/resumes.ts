import { createResumeAction } from './resumes-actions';
import { promisifyAction } from './utils';

export const createResume = promisifyAction(createResumeAction);
