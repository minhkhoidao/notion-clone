'use client';
import { api } from '@/convex/_generated/api';
import { type Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { MenuIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { type FC, type ReactElement } from 'react';
import Title from './Title';

type NavbarProps = {
  isCollapsed: boolean;
  onResetWitdh: () => void;
};

const Navbar: FC<NavbarProps> = ({
  isCollapsed,
  onResetWitdh,
}): ReactElement => {
  const { documentId } = useParams();
  let cleanedDocumentId: string;
  if (Array.isArray(documentId)) {
    cleanedDocumentId = documentId.join('').replace('%7D', '');
  } else {
    cleanedDocumentId = documentId.replace('%7D', '');
  }

  const document = useQuery(api.documents.getById, {
    documentId: cleanedDocumentId as Id<'documents'>,
  });
  if (document === undefined) {
    return (
      <nav className='bg-background dark:bg-[#f1f1f] px-3 py-2 w-full flex items-center gap-x-4'>
        <Title.Skeleton />
      </nav>
    );
  }

  if (document === null) {
    return <></>;
  }

  return (
    <>
      <nav className='bg-background dark:bg-[#f1f1f] px-3 py-2 w-full flex items-center gap-x-4'>
        {isCollapsed && (
          <MenuIcon
            role='button'
            onClick={onResetWitdh}
            className='h-6 w-6 text-muted-foreground'
          />
        )}
        <div className='flex items-center justify-between w-full'>
          <Title initialData={document} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
