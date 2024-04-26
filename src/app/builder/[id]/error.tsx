'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';

import { Button } from '@/components/ui/button';

function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex w-full flex-1 flex-col items-center justify-center gap-4'>
      <h2 className='text-4xl text-destructive'>{error.message ?? 'Something went wrong!'}</h2>
      <Button asChild>
        <Link href={'/'}>Go back to home</Link>
      </Button>
    </div>
  );
}

export default ErrorPage;
