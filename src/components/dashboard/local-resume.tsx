import Link from 'next/link';

import { Button } from '../ui/button';

export const LocalResume = () => {
  return (
    <div className='mt-20 flex flex-col items-center justify-center space-y-6'>
      <h1 className='h2'>You Don&apos;t have any resumes</h1>
      <Button asChild>
        <Link href='/resumes/builder'>Create New Resume</Link>
      </Button>
    </div>
  );

  // return (
  //   <ul className='grid grid-cols-4auto gap-20'>
  //     <Link className='center h-[300px] flex-col rounded-xl border' href={`/resumes/builder`}>
  //       <h4>Resume1</h4>
  //     </Link>

  //     <li className='center h-[300px]'>
  //       <Button asChild>
  //         <Link href='/resumes/builder'>Create New Resume</Link>
  //       </Button>
  //     </li>
  //   </ul>
  // );
};
