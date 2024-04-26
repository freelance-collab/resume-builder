'use server';

import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

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

interface CreateResumeData {
  name: string;
  description?: string;
}
export const createResumeAction = asyncAuthHandler(async (userId, data: CreateResumeData) => {
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
      userId,
      ...data,
    },
  });
});

// export const nativeCreateResume = async (data: CreateResumeData) => {
//   const session = await auth();

//   if (!session) {
//     throw new Error('Unauthorized');
//   }

//   return prisma.resume.create({
//     data: {
//       ...data,
//       userId: session.user.id,
//     },
//   });
// };
