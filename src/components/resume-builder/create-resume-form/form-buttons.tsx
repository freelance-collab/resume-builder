import { MinusIcon, PlusIcon } from 'lucide-react';

import { Button } from '../../ui/button';

interface FormButtonProps {
  onClick: () => void;
}

export const AddFieldButton = ({ onClick }: FormButtonProps) => {
  return (
    <Button type='button' variant='outline' className='mt-4 h-8 w-8 rounded-full' size='icon' onClick={onClick}>
      <PlusIcon className='h-4 w-4' />
    </Button>
  );
};

export const RemoveFieldButton = ({ onClick }: FormButtonProps) => {
  return (
    <Button type='button' variant='destructive' className='h-8 w-8 flex-shrink-0' size='icon' onClick={onClick}>
      <MinusIcon className='h-4 w-4' />
    </Button>
  );
};
