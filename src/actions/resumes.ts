import { createResumeAction, getUserResumesAction } from './resumes-actions';
import { promisifyAction } from './utils';

export const getUserResumes = promisifyAction(getUserResumesAction);

export const createResume = promisifyAction(createResumeAction);
