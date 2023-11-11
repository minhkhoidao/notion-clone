'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { type Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import {
  ChevronDown,
  ChevronRight,
  type LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type FC } from 'react';
import { toast } from 'sonner';

type ItemProps = {
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
  id?: Id<'documents'>;
  documentsIcon?: string;
  expanded?: boolean;
  isSearch?: boolean;
  onExpand?: () => void;
  active?: boolean;
  level?: number;
};

type ItemComponent = {
  Skeleton: FC<Pick<ItemProps, 'level'>>;
} & FC<ItemProps>;

const Item: ItemComponent = ({
  label,
  onClick,
  icon: Icon,
  active,
  id,
  documentsIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}): React.ReactElement => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  const create = useMutation(api.documents.create);
  const router = useRouter();
  const handleExpand = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!id) {
      return;
    }

    const promise = create({
      title: 'New Document',
      parentDocument: id,
    }).then((documentId) => {
      if (!expanded) {
        onExpand?.();
      }
      // Router.push(`/documents/${documentId}`);
    });
    toast.promise(promise, {
      loading: 'Creating document...',
      success: 'Document created!',
      error: 'Failed to create document',
    });
  };

  return (
    <div
      role='button'
      onClick={onClick}
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }}
      className={cn(
        'group min-h-[27px] test-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium',
        active && 'bg-primary/5 text-primary',
      )}
    >
      {Boolean(id) && (
        <div
          className='h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1'
          role='button'
          onClick={handleExpand}
        >
          <ChevronIcon className='h-4 w-4 shrink-0 text-muted-foreground/50' />
        </div>
      )}
      {documentsIcon ? (
        <div className='shrink-0 mr-2 text-[18px]'>{documentsIcon}</div>
      ) : (
        <Icon className='shrink-0 h-[18px] mr-2 text-muted-foreground' />
      )}
      <span className='truncate'>{label}</span>
      {isSearch && (
        <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
          <span className='text-xs'>CTRL</span>K
        </kbd>
      )}
      {Boolean(id) && <PlusComponent onCreate={onCreate} id={id} />}
    </div>
  );
};

const ItemSkeleton: FC<Pick<ItemProps, 'level'>> = ({
  level,
}): React.ReactElement => (
  <div
    style={{ paddingLeft: level ? `${level * 12 + 25}px` : '12px' }}
    className='flex gap-x-2 py-[3px]'
  >
    <Skeleton className='h-4 w-4' />
    <Skeleton className='h-4 w-[30%]' />
  </div>
);

const PlusComponent = ({
  onCreate,
  id,
}: {
  onCreate: (event: React.MouseEvent<HTMLDivElement>) => void;
  id?: Id<'documents'>;
}): React.ReactElement => {
  const { user } = useUser();
  const archive = useMutation(api.documents.archive);

  const onArchive = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!id) {
      return;
    }

    const promise = archive({ id });
    toast.promise(promise, {
      loading: 'Moving to trash',
      success: 'Note moved to trash!',
      error: 'Failed to archive note',
    });
  };

  return (
    <div className='ml-auto flex items-center gap-x-2'>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            role='button'
            className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'
          >
            <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='w-60'
          align='start'
          side='right'
          forceMount
        >
          <DropdownMenuItem onClick={onArchive}>
            <Trash className='h-4 w-4 mr-2' />
            Delete
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className='text-xs text-muted-foreground p-2'>
            Last edited by: {user?.fullName}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <div
        role='button'
        onClick={onCreate}
        className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'
      >
        <Plus className='h-4 w-4 text-muted-foreground' />
      </div>
    </div>
  );
};

Item.Skeleton = ItemSkeleton;

export default Item;
