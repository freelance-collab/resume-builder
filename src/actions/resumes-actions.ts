'use server';

import { Prisma } from '@prisma/client';
import { z } from 'zod';

import prisma from '@/lib/prisma';
import { action, ActionError, authAction } from '@/lib/safe-action';
import { utapi } from '@/lib/uploadthing';
import { getPhoto } from '@/lib/utils';

import { asyncAuthHandler } from './utils';

export const getUserResumesAction = asyncAuthHandler((userId, args: Omit<Prisma.ResumeFindManyArgs, 'where'>) => {
  return prisma.resume.findMany({
    ...args,
    where: {
      userId,
    },
  });
});

const getPublishResumeByIdSchema = z.object({
  id: z.string().cuid(),
});
export const getResumeByIdAction = authAction(getPublishResumeByIdSchema, ({ id }, { userId }) => {
  return prisma.resume.findUnique({
    where: {
      id,
      userId,
    },
  });
});
export const getPublishResumeByIdAction = action(getPublishResumeByIdSchema, async ({ id }) => {
  return prisma.resume.findUnique({
    where: {
      id,
      published: true,
    },
  });
});

const createResumeSchema = z.object({
  picture: z.string().optional(),
  name: z.string().trim().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  description: z.string().trim().optional(),
  content: z.string().trim(),
});
export const createResumeAction = authAction(createResumeSchema, async ({ picture, ...data }, { userId }) => {
  const isExisting = await prisma.resume.findUnique({
    where: {
      name_userId: {
        name: data.name,
        userId,
      },
    },
  });

  if (isExisting) {
    throw new ActionError('A resume with this name already exists');
  }

  let pictureUrl: string | null = null;

  if (picture) {
    const pictureFile = await getPhoto(picture, 'picture');
    const res = await utapi.uploadFiles(pictureFile);
    pictureUrl = res.data?.url ?? null;
  }

  const resume = await prisma.resume.create({
    data: {
      ...data,
      picture: pictureUrl,
      userId,
    },
  });
  return resume;

  // const img = formData.get('image') as File;
  // const imgFile = new File([img], `${resume.id}.jpeg`, { type: 'image/jpeg' });

  // const res = await utapi.uploadFiles(imgFile);

  // const updatedResume = await prisma.resume.update({
  //   where: {
  //     id: resume.id,
  //   },
  //   data: {
  //     previewURL: res.data?.url,
  //   },
  // });

  // return updatedResume;
});

const publishResumeSchema = z.object({
  id: z.string().cuid(),
});
export const publishResumeAction = authAction(publishResumeSchema, async ({ id }, { userId }) => {
  await prisma.resume.update({
    where: {
      id,
      userId,
    },
    data: {
      published: true,
    },
  });
});

const updateResumeSchema = z.object({
  id: z.string().cuid(),
  picture: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(2, {
      message: 'Name must be at least 2 characters',
    })
    .optional(),
  description: z.string().trim().optional(),
  content: z.string().trim().optional(),
});
export const updateResumeAction = authAction(updateResumeSchema, async ({ id, picture, ...data }, { userId }) => {
  const isExisting = await prisma.resume.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!isExisting) {
    throw new ActionError('Resume not found');
  }

  const newData: Prisma.ResumeUpdateInput = {};

  Object.keys(data).forEach((key) => {
    const k = key as keyof typeof data;
    if (data[k] !== undefined) {
      newData[k] = data[k];
    }
  });

  // const img = data.formData.get('image') as File;
  // const imgFile = new File([img], `${data.id}.jpeg`, { type: 'image/jpeg' });

  // const res = await Promise.all([utapi.deleteFiles(`${data.id}.jpeg`), utapi.uploadFiles(imgFile)]);

  let pictureUrl: string | null = null;

  if (picture) {
    const pictureFile = await getPhoto(picture, 'picture');
    const res = await utapi.uploadFiles(pictureFile);
    pictureUrl = res.data?.url ?? null;
  }

  await prisma.resume.update({
    where: {
      id,
      userId,
    },
    data: {
      ...newData,
      picture: pictureUrl,
    },
  });
});
