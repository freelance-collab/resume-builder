import Link from 'next/link';

import { Button } from '@/components/ui/button';

const links = [
  {
    title: 'Builder',
    href: 'builder',
  },
  {
    title: 'Settings',
    href: 'settings',
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className='mb-2 border-b py-2'>
        <ul className='mx-10 flex gap-2'>
          {links.map((link) => (
            <Button key={link.href} variant='ghost' asChild>
              <Link href={link.href}>{link.title}</Link>
            </Button>
          ))}
        </ul>
      </div>
      <div className='mx-10'>{children}</div>
    </div>
  );
};

export default Layout;
