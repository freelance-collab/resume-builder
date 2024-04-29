import { CheckIcon, PencilIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const TitleForm = ({ title, onChange }: { title: string; onChange: (title: string) => void }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='flex items-center gap-2'>
      {isEdit ? (
        <EditForm title={title} onDone={() => setIsEdit(!isEdit)} onTitleChange={onChange} />
      ) : (
        <TitleView title={title} onEdit={() => setIsEdit(!isEdit)} />
      )}
    </div>
  );
};

const TitleView = ({ title, onEdit }: { title: string; onEdit: () => void }) => (
  <>
    <h4 className='text-2xl font-semibold capitalize'>{title}</h4>
    <button onClick={onEdit}>
      <PencilIcon className='size-4' />
    </button>
  </>
);

const EditForm = ({
  title,
  onTitleChange,
  onDone,
}: {
  title: string;
  onTitleChange: (value: string) => void;
  onDone: () => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <Input className='w-[250px]  p-2 text-2xl font-semibold capitalize ' defaultValue={title} ref={ref} />
      <Button
        onClick={() => {
          if (ref.current && ref.current.value) {
            onTitleChange(ref.current.value);
          }
          onDone();
        }}
        size='icon'
        variant='outline'
        className='flex-shrink-0'
      >
        <CheckIcon className='size-4' />
      </Button>
    </>
  );
};
