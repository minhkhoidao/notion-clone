'use client';
import {
  type FC,
  MouseEvent,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

type ConfirmModalProps = {
  children: ReactNode;
  onConfirm: () => void;
};

const ConfirmModal: FC<ConfirmModalProps> = ({
  children,
  onConfirm,
}): ReactElement => {
  const handleConfirm: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onConfirm();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
