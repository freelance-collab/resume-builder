import Image from 'next/image';
import Confetti from 'react-confetti';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';

export const PublishedResumeAlert = ({ shareUrl }: { shareUrl: string }) => {
  return (
    <Dialog defaultOpen>
      <Confetti
        width={window?.innerWidth}
        height={window?.innerHeight}
        recycle={false}
        numberOfPieces={1000}
        className='!z-[1000]'
      />
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className='text-xl'>Resume Published</DialogTitle>

          <Image src='/celeb.svg' width={300} height={300} alt='celeb' className='mx-auto' />
          <DialogDescription>
            <h4 className='font-semibold'>Share the URL</h4>
            Anyone with this link can view and download your resume
          </DialogDescription>
        </DialogHeader>
        <div className='flex w-full flex-col items-center gap-2 pb-2'>
          <Input className='w-full' readOnly value={shareUrl} />
          <Button
            className='mt-2 w-full'
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              toast('Copied!', {
                description: 'Link copied to clipboard',
              });
            }}
          >
            Copy link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
