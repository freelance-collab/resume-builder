'use client';

import Autoplay from 'embla-carousel-autoplay';
import { MailIcon, PhoneIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Textarea } from '@/components/ui/textarea';

function LandingPage() {
  return (
    <div>
      <section className='h-screen snap-start bg-red-200'>
        <SectionOne />
      </section>
      <section className='h-screen snap-start'>
        <SectionTwo />
      </section>
      <section className='h-screen snap-start'>
        <SectionThree />
      </section>
      <section className='h-screen snap-start'>
        <SectionFour />
      </section>
    </div>
  );
}

export default LandingPage;

const SectionOne = () => {
  return (
    <div className='h-full overflow-hidden bg-white px-5 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40'>
      <div className='mx-auto flex h-full max-w-7xl flex-col items-center justify-between lg:flex-row'>
        <div className='flex-shrink-0 sm:max-w-lg'>
          <h1 className='font animate-fade-up text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl'>
            Build Resume Was Never Easier!
          </h1>
          <p className='mt-4 animate-fade-up text-xl text-gray-500 animate-delay-200'>
            Build and publish your resume as a website in less than 2 minutes
          </p>
          <Button asChild className='my-6 animate-fade-up px-8 py-3 animate-delay-[400ms]' size='lg'>
            <Link href='/dashboard'>Start Now</Link>
          </Button>
        </div>
        <div className='mt-10 flex animate-fade-down items-center space-x-6 lg:space-x-8'>
          <div className='space-y-6 lg:space-y-8'>
            <div className='h-64 w-44 overflow-hidden border shadow-sm'>
              <img
                src='https://marketplace.canva.com/EAFSLI7n6x4/1/0/566w/canva-minimalist-white-and-grey-professional-resume-gZsEJNnf4UY.jpg'
                alt=''
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div className='h-64 w-44 overflow-hidden border shadow-sm'>
              <img
                src='https://marketplace.canva.com/EAFfKk6Kmck/1/0/1131w/canva-gray-and-white-simple-clean-resume-C_dNdg7kOQg.jpg'
                alt=''
                className='h-full w-full object-cover object-center'
              />
            </div>
          </div>
          <div className='flex flex-col items-center space-y-6 lg:space-y-8'>
            <div className='h-64 w-44 overflow-hidden border shadow-sm'>
              <img
                src='https://marketplace.canva.com/EAE4mb3_yUs/1/0/283w/canva-elegant-minimalist-cv-resume-L1GhwjK0HPE.jpg'
                alt=''
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div className='h-72 w-52 overflow-hidden border shadow-sm'>
              <img
                src='https://marketplace.canva.com/EAFOl9gdm4M/1/0/283w/canva-white-blue-modern-clean-professional-marketing-resume-7tje4efJvmg.jpg'
                alt=''
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div className='h-64 w-44 overflow-hidden border shadow-sm'>
              <img
                src='https://marketplace.canva.com/EAE55pQxDl8/1/0/283w/canva-white-gold-elegant-minimalist-data-analyst-resume-cv-a4-printable-DdYKXvDWiJE.jpg'
                alt=''
                className='h-full w-full object-cover object-center'
              />
            </div>
          </div>
          <div className='space-y-6 lg:space-y-8'>
            <div className='h-64 w-44 overflow-hidden border shadow-sm'>
              <img
                src='https://marketplace.canva.com/EAF0xMTCI-k/2/0/283w/canva-purple-and-white-clean-and-professional-resume-PuuMF16yxSM.jpg'
                alt=''
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div className='h-64 w-44 overflow-hidden border shadow-sm'>
              <img
                src='https://marketplace.canva.com/EAFE01yyFdU/1/0/283w/canva-entry-level-tech-professional-resume-k7NYb9OvWFI.jpg'
                alt=''
                className='h-full w-full object-cover object-center'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionTwo = () => {
  return (
    <div className='flex flex-col items-center justify-center py-40'>
      <h1 className='h1 max-w-6xl text-center'>
        Pick one of many world-class templates and build your resume in minutes
      </h1>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          align: 'start',
          loop: true,
        }}
        className='mt-20 w-full max-w-[60%] lg:max-w-[90%]'
      >
        <CarouselContent className='-ml-10'>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className='pl-10 md:basis-1/2 lg:basis-1/5'>
              <div className='rounded-md border bg-slate-100 p-4 shadow-md'>
                <img
                  src='https://marketplace.canva.com/EAFSLI7n6x4/1/0/566w/canva-minimalist-white-and-grey-professional-resume-gZsEJNnf4UY.jpg'
                  alt=''
                  className='h-full w-full object-cover object-center'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

const SectionThree = () => {
  return (
    <div className='mx-auto flex h-full max-w-7xl flex-col items-center justify-center py-40'>
      <div className='mx-auto mb-12 max-w-[510px] text-center'>
        <span className='mb-2 block text-lg font-semibold text-primary'>Our Services</span>
        <h2 className='text-dark mb-3 text-3xl font-bold leading-[1.2] dark:text-white sm:text-4xl md:text-[40px]'>
          What We Offer
        </h2>
        <p className='text-body-color dark:text-dark-6 text-base'>
          There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in
          some form.
        </p>
      </div>

      <div className='flex flex-wrap'>
        <ServiceCard
          title='Build Resume'
          details='We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics.'
          icon={
            <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M21.0375 1.2374C11.8125 -0.393851 2.92503 5.7374 1.29378 14.9624C0.450029 19.4061 1.46253 23.9624 4.05003 27.6749C6.63753 31.4436 10.5188 33.9186 14.9625 34.7624C15.975 34.9311 16.9875 35.0436 18 35.0436C26.0438 35.0436 33.2438 29.2499 34.7625 21.0374C36.3938 11.8124 30.2625 2.9249 21.0375 1.2374ZM32.2313 20.5874C32.175 21.0374 32.0625 21.4874 31.95 21.8811L19.2375 17.0999V3.5999C19.6875 3.65615 20.1375 3.7124 20.5313 3.76865C28.4063 5.1749 33.6375 12.7124 32.2313 20.5874ZM16.7063 3.5999V16.7624H3.60003C3.65628 16.3124 3.71253 15.8624 3.76878 15.4124C4.95003 8.83115 10.4063 4.10615 16.7063 3.5999ZM15.4125 32.2311C11.5875 31.5561 8.32503 29.4186 6.13128 26.2124C4.66878 24.1311 3.82503 21.7124 3.60003 19.2374H17.775L31.05 24.2436C28.2938 29.9811 21.9375 33.4686 15.4125 32.2311Z'
                fill='white'
              />
            </svg>
          }
        />
        <ServiceCard
          title='Publish as a website'
          details='We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics.'
          icon={
            <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M9.89195 14.625C10.9995 10.1252 13.769 7.875 18.1996 7.875C24.8458 7.875 25.6765 12.9375 28.9996 13.7812C31.2151 14.3439 33.1535 13.5002 34.815 11.25C33.7075 15.7498 30.9379 18 26.5073 18C19.8611 18 19.0304 12.9375 15.7073 12.0938C13.4918 11.5311 11.5535 12.3748 9.89195 14.625ZM1.58423 24.75C2.69174 20.2502 5.46132 18 9.89195 18C16.5381 18 17.3689 23.0625 20.692 23.9062C22.9075 24.4689 24.8458 23.6252 26.5073 21.375C25.3998 25.8748 22.6302 28.125 18.1996 28.125C11.5535 28.125 10.7227 23.0625 7.39963 22.2188C5.18405 21.6561 3.24576 22.4998 1.58423 24.75Z'
                fill='white'
              />
            </svg>
          }
        />
        <ServiceCard
          title='Custom Domain'
          details='We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics.'
          icon={
            <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12.2063 1.9126H5.0625C3.15 1.9126 1.575 3.4876 1.575 5.4001V12.5438C1.575 14.4563 3.15 16.0313 5.0625 16.0313H12.2063C14.1188 16.0313 15.6938 14.4563 15.6938 12.5438V5.45635C15.75 3.4876 14.175 1.9126 12.2063 1.9126ZM13.2188 12.6001C13.2188 13.1626 12.7688 13.6126 12.2063 13.6126H5.0625C4.5 13.6126 4.05 13.1626 4.05 12.6001V5.45635C4.05 4.89385 4.5 4.44385 5.0625 4.44385H12.2063C12.7688 4.44385 13.2188 4.89385 13.2188 5.45635V12.6001Z'
                fill='white'
              />
              <path
                d='M30.9375 1.9126H23.7937C21.8812 1.9126 20.3062 3.4876 20.3062 5.4001V12.5438C20.3062 14.4563 21.8812 16.0313 23.7937 16.0313H30.9375C32.85 16.0313 34.425 14.4563 34.425 12.5438V5.45635C34.425 3.4876 32.85 1.9126 30.9375 1.9126ZM31.95 12.6001C31.95 13.1626 31.5 13.6126 30.9375 13.6126H23.7937C23.2312 13.6126 22.7812 13.1626 22.7812 12.6001V5.45635C22.7812 4.89385 23.2312 4.44385 23.7937 4.44385H30.9375C31.5 4.44385 31.95 4.89385 31.95 5.45635V12.6001Z'
                fill='white'
              />
              <path
                d='M12.2063 19.8564H5.0625C3.15 19.8564 1.575 21.4314 1.575 23.3439V30.4877C1.575 32.4002 3.15 33.9752 5.0625 33.9752H12.2063C14.1188 33.9752 15.6938 32.4002 15.6938 30.4877V23.4002C15.75 21.4314 14.175 19.8564 12.2063 19.8564ZM13.2188 30.5439C13.2188 31.1064 12.7688 31.5564 12.2063 31.5564H5.0625C4.5 31.5564 4.05 31.1064 4.05 30.5439V23.4002C4.05 22.8377 4.5 22.3877 5.0625 22.3877H12.2063C12.7688 22.3877 13.2188 22.8377 13.2188 23.4002V30.5439Z'
                fill='white'
              />
              <path
                d='M30.9375 19.8564H23.7937C21.8812 19.8564 20.3062 21.4314 20.3062 23.3439V30.4877C20.3062 32.4002 21.8812 33.9752 23.7937 33.9752H30.9375C32.85 33.9752 34.425 32.4002 34.425 30.4877V23.4002C34.425 21.4314 32.85 19.8564 30.9375 19.8564ZM31.95 30.5439C31.95 31.1064 31.5 31.5564 30.9375 31.5564H23.7937C23.2312 31.5564 22.7812 31.1064 22.7812 30.5439V23.4002C22.7812 22.8377 23.2312 22.3877 23.7937 22.3877H30.9375C31.5 22.3877 31.95 22.8377 31.95 23.4002V30.5439Z'
                fill='white'
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, details }: { icon: React.ReactNode; title: string; details: string }) => {
  return (
    <>
      <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
        <div className='shadow-2 dark:bg-dark-2 mb-9 rounded-[20px] bg-white p-10 md:px-7'>
          <div className='mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary'>{icon}</div>
          <h4 className='text-dark mb-[14px] text-2xl font-semibold dark:text-white'>{title}</h4>
          <p className='text-body-color dark:text-dark-6'>{details}</p>
        </div>
      </div>
    </>
  );
};

const SectionFour = () => {
  return (
    <div className='relative h-full bg-white'>
      <div className='absolute inset-0'>
        <div className='absolute inset-y-0 left-0 w-1/2 bg-gray-50' />
      </div>
      <div className='relative mx-auto flex h-full max-w-7xl lg:grid lg:grid-cols-5'>
        <div className='flex flex-1 items-center bg-gray-50 px-4 py-16 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12'>
          <div className='mx-auto max-w-lg'>
            <h2 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>Get in touch</h2>
            <p className='mt-3 text-lg leading-6 text-gray-500'>
              Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus
              arcu.
            </p>
            <dl className='mt-8 text-base text-gray-500'>
              <div>
                <dt className='sr-only'>Postal address</dt>
                <dd>
                  <p>742 Evergreen Terrace</p>
                  <p>Springfield, OR 12345</p>
                </dd>
              </div>
              <div className='mt-6'>
                <dt className='sr-only'>Phone number</dt>
                <dd className='flex'>
                  <PhoneIcon className='h-6 w-6 flex-shrink-0 text-gray-400' aria-hidden='true' />
                  <span className='ml-3'>+1 (555) 123-4567</span>
                </dd>
              </div>
              <div className='mt-3'>
                <dt className='sr-only'>Email</dt>
                <dd className='flex'>
                  <MailIcon className='h-6 w-6 flex-shrink-0 text-gray-400' aria-hidden='true' />
                  <span className='ml-3'>support@example.com</span>
                </dd>
              </div>
            </dl>
            <p className='mt-6 text-base text-gray-500'>
              Looking for careers?{' '}
              <a href='#' className='font-medium text-gray-700 underline'>
                View all job openings
              </a>
              .
            </p>
          </div>
        </div>
        <div className='flex flex-1  items-center bg-white px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8 lg:py-24 xl:pl-12'>
          <div className='mx-auto max-w-lg flex-1 lg:max-w-none'>
            <form action='#' method='POST' className='grid grid-cols-1 gap-y-6'>
              <div>
                <label htmlFor='full-name' className='sr-only'>
                  Full name
                </label>
                <Input
                  type='text'
                  name='full-name'
                  id='full-name'
                  autoComplete='name'
                  className='h-12 placeholder-gray-500'
                  placeholder='Full name'
                />
              </div>
              <div>
                <label htmlFor='email' className='sr-only'>
                  Email
                </label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  className='h-12 placeholder-gray-500'
                  placeholder='Email'
                />
              </div>
              <div>
                <label htmlFor='phone' className='sr-only'>
                  Phone
                </label>
                <PhoneInput
                  name='phone'
                  id='phone'
                  autoComplete='tel'
                  className='h-12 placeholder-gray-500'
                  placeholder='Phone'
                  defaultCountry='EG'
                />
              </div>
              <div>
                <label htmlFor='message' className='sr-only'>
                  Message
                </label>
                <Textarea id='message' name='message' rows={4} placeholder='Message' defaultValue={''} />
              </div>
              <div>
                <Button type='submit' className='px-6 py-3'>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
