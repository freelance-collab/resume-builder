import Image from 'next/image';

import { Button } from '@/components/ui/button';

export const CardsTemplate = () => {
  return (
    <div className='container my-10'>
      <div className='grid grid-cols-4 gap-6'>
        <div className='col-span-2 space-y-6'>
          <div className='flex gap-6'>
            <div className='h-[300px] flex-1 '>
              <Image
                src='https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png'
                width={400}
                height={400}
                alt='avatar'
                className='h-full w-full rounded-lg grayscale'
              />
            </div>

            <div className='flex h-[300px] flex-1 flex-col space-y-6'>
              <div className='center flex-1  rounded-lg border px-2 text-center text-xl font-semibold uppercase'>
                Mahmoud Elalfy
              </div>
              <div className='center flex-1 rounded-lg border px-2 text-center text-xl font-semibold uppercase'>
                Front-End Developer
              </div>
              <div className='center flex-1 rounded-lg border px-2 text-center text-xl font-semibold uppercase'>
                Cairo, Egypt
              </div>
              <div className='flex flex-1 items-center justify-around  gap-6 rounded-lg border px-2 text-center text-xl font-semibold uppercase'>
                <Button size='icon' variant='ghost'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
                    <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
                    <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
                  </svg>
                </Button>
                <Button size='icon' variant='ghost'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
                  </svg>
                </Button>
                <Button size='icon' variant='ghost'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
                    <rect width='4' height='12' x='2' y='9' />
                    <circle cx='4' cy='4' r='2' />
                  </svg>
                </Button>
                <Button size='icon' variant='ghost'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
                    <path d='M9 18c-4.51 2-5-2-7-2' />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          <div className='space-y-6 rounded-lg border p-4'>
            <h3 className='text-lg font-semibold'>Education</h3>
            <div className='rounded-lg border p-4'>
              <div className='flex items-center justify-between '>
                <h4 className='text-lg font-semibold'>Horizon Value Expert</h4>
                <div className='flex flex-col items-end text-sm font-medium'>
                  <p>2021 — PRESENT</p>
                  <p>UI DIRECTOR</p>
                </div>
              </div>
              <p className='mt-2 text-sm'>
                Creating wireframe projects for innovative applications. Improving customer relations and creating
                recruitment campaigns for new positions. Working with a well-coordinated team as remote work.
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <div className='flex items-center justify-between '>
                <h4 className='text-lg font-semibold'>Horizon Value Expert</h4>
                <div className='flex flex-col items-end text-sm font-medium'>
                  <p>2021 — PRESENT</p>
                  <p>UI DIRECTOR</p>
                </div>
              </div>
              <p className='mt-2 text-sm'>
                Creating wireframe projects for innovative applications. Improving customer relations and creating
                recruitment campaigns for new positions. Working with a well-coordinated team as remote work.
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <div className='flex items-center justify-between '>
                <h4 className='text-lg font-semibold'>Horizon Value Expert</h4>
                <div className='flex flex-col items-end text-sm font-medium'>
                  <p>2021 — PRESENT</p>
                  <p>UI DIRECTOR</p>
                </div>
              </div>
              <p className='mt-2 text-sm'>
                Creating wireframe projects for innovative applications. Improving customer relations and creating
                recruitment campaigns for new positions. Working with a well-coordinated team as remote work.
              </p>
            </div>
          </div>
        </div>

        <div className='col-span-2 space-y-6'>
          <div className='rounded-lg border p-4'>
            <h3 className='text-lg font-semibold'>About</h3>
            <p className='text-sm'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde magni adipisci amet repudiandae dolore
              quaerat perferendis libero soluta maxime temporibus dolorem, illo laborum illum omnis rem hic quo natus
              aspernatur.
            </p>
          </div>

          <div className='space-y-6 rounded-lg border p-4'>
            <h3 className='text-lg font-semibold'>Experience</h3>
            <div className='rounded-lg border p-4'>
              <div className='flex items-center justify-between '>
                <h4 className='text-lg font-semibold'>Horizon Value Expert</h4>
                <div className='flex flex-col items-end text-sm font-medium'>
                  <p>2021 — PRESENT</p>
                  <p>UI DIRECTOR</p>
                </div>
              </div>
              <p className='mt-2 text-sm'>
                Creating wireframe projects for innovative applications. Improving customer relations and creating
                recruitment campaigns for new positions. Working with a well-coordinated team as remote work.
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <div className='flex items-center justify-between '>
                <h4 className='text-lg font-semibold'>Horizon Value Expert</h4>
                <div className='flex flex-col items-end text-sm font-medium'>
                  <p>2021 — PRESENT</p>
                  <p>UI DIRECTOR</p>
                </div>
              </div>
              <p className='mt-2 text-sm'>
                Creating wireframe projects for innovative applications. Improving customer relations and creating
                recruitment campaigns for new positions. Working with a well-coordinated team as remote work.
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <div className='flex items-center justify-between '>
                <h4 className='text-lg font-semibold'>Horizon Value Expert</h4>
                <div className='flex flex-col items-end text-sm font-medium'>
                  <p>2021 — PRESENT</p>
                  <p>UI DIRECTOR</p>
                </div>
              </div>
              <p className='mt-2 text-sm'>
                Creating wireframe projects for innovative applications. Improving customer relations and creating
                recruitment campaigns for new positions. Working with a well-coordinated team as remote work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
