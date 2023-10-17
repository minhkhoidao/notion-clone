'use client';

import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';
import { FC } from 'react';

interface ItemProps {
  label: string;
  onClick: () => void;
  icon: LucideIcon;
  id?: Id<'documents'>;
  documentsIcon?: string;
  expanded?: boolean;
  isSearch?: boolean;
  onExpand?: () => void;
  active?: boolean;
  level?: number;
}

const Item: FC<ItemProps> = ({
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
  console.log('re-render');
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
      {!!id && (
        <div
          className='h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1'
          role='button'
          onClick={onExpand}
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
          <span className='text-xs'>CMD</span>K
        </kbd>
      )}
    </div>
  );
};

export default Item;
