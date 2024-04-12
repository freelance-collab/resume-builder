'use server';

import { Prisma } from '@prisma/client';

import prisma from '@/lib/prisma';

import { asyncAuthHandler } from './utils';

export const getUserResumes = asyncAuthHandler((userId, args: Omit<Prisma.ResumeFindManyArgs, 'where'>) => {
  return prisma.resume.findMany({
    ...args,
    where: {
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
