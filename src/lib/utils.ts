import { type ClassValue, clsx } from 'clsx';
import html2canvas from 'html2canvas';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import { ResumeSchemaType } from '@/components/resumes-templates/schema';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function convertToImage() {
  const element = document.getElementById('resume');
  const canvas = await html2canvas(element!).then((canvas) => {
    var img = canvas.toDataURL('image/png');

    // var screenshot = new Image();
    // screenshot.src = img;
    // document.body.appendChild(screenshot);
  });
  // const dataBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));

  // return dataBlob;
}

export const parseResume = (resume: ResumeSchemaType): ResumeSchemaType => {
  return {
    ...resume,
    experiences: resume.experiences.map((experience) => ({
      ...experience,
      startDate: new Date(experience.startDate),
      endDate: experience.endDate ? new Date(experience.endDate) : undefined,
    })),
  };
};

const MAX_FILE_SIZE = 3000000; // 3MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const imageSchema = z
  .any()
  .refine((file) => file, 'Image is required.')
  .refine((file) => file && file.size <= MAX_FILE_SIZE, `Max file size is 3MB.`)
  .refine(
    (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
    '.jpg, .jpeg, .png and .webp files are accepted.',
  );

const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const imageUpload = async (file: File) => {
  const dataImage = (await getBase64(file)) as string;

  return {
    fileInBase64: dataImage,
  };
};
