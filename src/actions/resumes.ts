import { createResumeAction, getUserResumesAction } from './resumes-actions';
import { callAction } from './utils';

export const getUserResumes = callAction(getUserResumesAction);

export const createResume = callAction(createResumeAction);
