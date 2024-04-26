'use server';

import { Prisma } from '@prisma/client';

import prisma from '@/lib/prisma';

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

export const createResumeAction = asyncAuthHandler(async (userId, data: Omit<Prisma.ResumeCreateInput, 'user'>) => {
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

  return prisma.resume.create({
    data: {
      ...data,
      userId,
    },
  });
});

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
  async (userId, data: { id: string; content?: string; name?: string }) => {
    const newData: Prisma.ResumeUpdateInput = {};

    if (data.content) {
      newData.content = data.content;
    }

    if (data.name) {
      newData.name = data.name;
    }

    await prisma.resume.update({
      where: {
        id: data.id,
        userId,
      },
      data: newData,
    });
  },
);
