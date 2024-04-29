import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';

export const UnauthenticatedAlert = ({ open, setIsOpen }: { open: boolean; setIsOpen: (val: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className='text-xl'>Your Are not Logged In</DialogTitle>
          <DialogDescription>To access this feature, you need to be logged in.</DialogDescription>
          <Image src='/login.svg' width={300} height={300} alt='avatar' className='mx-auto' />
        </DialogHeader>
        <DialogFooter>
          <Button className='w-full' asChild>
            <Link href='/login?callback=/resumes/builder'>Login</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
