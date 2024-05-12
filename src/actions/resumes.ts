import {
  createResumeAction,
  getResumeByIdAction,
  getUserResumesAction,
  publishResumeAction,
  updateResumeAction,
} from './resumes-actions';
import { callAction } from './utils';

export const getUserResumes = callAction(getUserResumesAction);

// export const getResumeById = callAction(getResumeByIdAction);

// export const createResume = callAction(createResumeAction);

// export const publishResume = callAction(publishResumeAction);

// export const updateResume = callAction(updateResumeAction);
