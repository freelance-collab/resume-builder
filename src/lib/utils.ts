import { type ClassValue, clsx } from 'clsx';
import html2canvas from 'html2canvas';
import { twMerge } from 'tailwind-merge';

import { ResumeSchemaType } from '@/components/resumes-templates/schema';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function convertToImage() {
  const element = document.getElementById('resume');
  const canvas = await html2canvas(element!, {
    scale: 2, // adjust scale as needed for your content
    width: 2480, // A4 width in pixels
    height: 3508, // A4 height in pixels
  }).then((canvas) => {
    var img = canvas.toDataURL('image/png');

    var screenshot = new Image();
    screenshot.src = img;
    document.body.appendChild(screenshot);
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
