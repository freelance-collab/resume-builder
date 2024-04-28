import { Package2, Search } from 'lucide-react';
import Link from 'next/link';

import { ThemeSwitcher } from './theme-switcher';
import { Input } from './ui/input';
import { UserButton } from './user-button';

export const Header = () => {
  return (
    <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
      <nav className='flex flex-col gap-6 text-lg font-medium md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <Link href='/' className='flex items-center gap-2 text-lg font-semibold md:text-base'>
          <Package2 className='h-6 w-6' />
          <span className='sr-only'>Acme Inc</span>
        </Link>
      </nav>

      <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <form className='ml-auto flex-1 sm:flex-initial'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search products...'
              className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
            />
          </div>
        </form>
        <ThemeSwitcher />
        <UserButton />
      </div>
    </header>
  );
};
