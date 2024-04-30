import { type ClassValue, clsx } from 'clsx';
import html2canvas from 'html2canvas';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function convertToImage() {
  const element = document.getElementById('resume');
  const canvas = await html2canvas(element!);
  const dataBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));

  return dataBlob;
}
