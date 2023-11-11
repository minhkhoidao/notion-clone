'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { type Doc } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { FC, type ReactElement, useRef, useState } from 'react';

type TitleProps = {
  initialData: Doc<'documents'>;
};

type TitleComponent = {
  Skeleton: React.FC;
} & React.FC<TitleProps>;
const Title: TitleComponent = ({ initialData }): ReactElement => {
  const update = useMutation(api.documents.update);
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialData.title || 'Untitled');
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({
      id: initialData._id,
      title: event.target.value || 'Untitled',
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      disableInput();
    }
  };

  return (
    <div className='flex items-center gap-x-1'>
      {Boolean(initialData.icon) && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className='h-7 px-2 focus-visible:ring-transparent'
        />
      ) : (
        <Button
          onClick={enableInput}
          variant={'ghost'}
          size={'sm'}
          className='font-normal-auto p-1'
        >
          {initialData?.title}
        </Button>
      )}
    </div>
  );
};

const TitleSkeleton = (): ReactElement => (
  <Skeleton className='h-6 w-20 rounded-md' />
);

Title.Skeleton = TitleSkeleton;
export default Title;
