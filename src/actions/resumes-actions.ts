'use server';

import { Prisma } from '@prisma/client';

import prisma from '@/lib/prisma';
import { utapi } from '@/lib/uploadthing';

import { asyncAuthHandler } from './utils';

export const getUserResumesAction = asyncAuthHandler((userId, args: Omit<Prisma.ResumeFindManyArgs, 'where'>) => {
  return prisma.resume.findMany({
    ...args,
    where: {
      userId,
    },
  });
});

export const getResumeByIdAction = asyncAuthHandler((userId, id: string) => {
  return prisma.resume.findUnique({
    where: {
      id,
      userId,
    },
  });
});

export const createResumeAction = asyncAuthHandler(
  async (userId, { formData, ...data }: Omit<Prisma.ResumeCreateInput, 'user'> & { formData: FormData }) => {
    const isExisting = await prisma.resume.findUnique({
      where: {
        name_userId: {
          name: data.name,
          userId,
        },
      },
    });

    if (isExisting) {
      throw new Error('A resume with this name already exists');
    }

    const resume = await prisma.resume.create({
      data: {
        ...data,
        userId,
      },
    });

    const img = formData.get('image') as File;
    const imgFile = new File([img], `${resume.id}.jpeg`, { type: 'image/jpeg' });

    const res = await utapi.uploadFiles(imgFile);

    const updatedResume = await prisma.resume.update({
      where: {
        id: resume.id,
      },
      data: {
        previewURL: res.data?.url,
      },
    });

    return updatedResume;
  },
);

export const publishResumeAction = asyncAuthHandler(async (userId, id: string) => {
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

export const updateResumeAction = asyncAuthHandler(
  async (userId, data: { id: string; content?: string; name?: string; formData: FormData }) => {
    const newData: Prisma.ResumeUpdateInput = {};

    if (data.content) {
      newData.content = data.content;
    }

    if (data.name) {
      newData.name = data.name;
    }

    const img = data.formData.get('image') as File;
    const imgFile = new File([img], `${data.id}.jpeg`, { type: 'image/jpeg' });

    const res = await Promise.all([utapi.deleteFiles(`${data.id}.jpeg`), utapi.uploadFiles(imgFile)]);

    await prisma.resume.update({
      where: {
        id: data.id,
        userId,
      },
      data: {
        ...newData,
        previewURL: res[1].data?.url,
      },
    });
  },
);
