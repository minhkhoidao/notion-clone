import ConfirmModal from '@/components/modals/confirm';
import Spinner from '@/components/spinner';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { type Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { Search, Trash, Undo } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const document = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState('');

  const filterDocuments = document?.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase()),
  );

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLButtonElement>,
    documentId: Id<'documents'>,
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: 'Restoring note...',
      success: 'Note restored',
      error: 'Error restore note',
    });
  };

  const onRemove = (
    event: React.MouseEvent<HTMLButtonElement>,
    documentId: Id<'documents'>,
  ) => {
    event?.stopPropagation();
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: 'Deleting note...',
      success: 'Note deteled',
      error: 'Error delete note',
    });

    if (params.documentId === documentId) {
      router.push('/documents');
    }
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  if (document === undefined) {
    return (
      <div className='h-full flex items-center justify-center p-4'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <div className='text-sm'>
      <div className='flex items-center gap-x-1 p-2'>
        <Search className='h-4 w-4' />
        <Input
          value={search}
          onChange={onSearch}
          className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
          placeholder='Filter by page title...'
        />
      </div>
      <div className='mt-2 px-1 pb-1'>
        <p className='hidden last:block text-xs text-center text-muted-foreground pb-2'>
          No Document Found.
        </p>
        {filterDocuments?.map((doc) => (
          <div
            key={doc._id}
            role='button'
            onClick={() => {
              onClick(doc._id);
            }}
            className='text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between'
          >
            <span className='truncate pl-2'>{doc.title}</span>
            <div className='flex items-center'>
              <div
                className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                onClick={(e: any) => {
                  onRestore(e, doc._id);
                }}
                role='button'
              >
                <Undo className='h-4 w-4 text-muted-foreground' />
              </div>
              <ConfirmModal
                onConfirm={(e?: any) => {
                  onRemove(e, doc._id);
                }}
              >
                <div
                  className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                  role='button'
                >
                  <Trash className='h-4 w-4 text-muted-foreground' />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
