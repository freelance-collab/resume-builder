import { LoaderCircle } from 'lucide-react';
import React from 'react';

function Loading() {
  return (
    <div className='flex w-full flex-1 items-center justify-center'>
      <LoaderCircle className='h-12 w-12 animate-spin text-primary' />
    </div>
  );
}

export default Loading;
