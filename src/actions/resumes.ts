import { createResumeAction, getResumeByIdAction, getUserResumesAction } from './resumes-actions';
import { callAction } from './utils';

export const getUserResumes = callAction(getUserResumesAction);

export const getResumeById = callAction(getResumeByIdAction);

export const createResume = callAction(createResumeAction);
