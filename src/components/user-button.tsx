'use client';

import { ArrowRightIcon, CircleUser } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const UserButton = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Button variant='outline' size='icon' className=' rounded-full'>
        <CircleUser className='h-5 w-5' />
        <span className='sr-only'>Toggle user menu</span>
      </Button>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <Button variant='ghost' className='gap-x-2' asChild>
        <Link href='/login'>
          Login
          <ArrowRightIcon />
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className=' rounded-full'>
          {session?.user?.image ? (
            <Image src={session.user.image} alt='User' width={32} height={32} className='rounded-full' />
          ) : (
            <CircleUser className='h-5 w-5' />
          )}
          <span className='sr-only'>Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <button type='button' className='w-full text-left' onClick={() => signOut()}>
            Sign out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
