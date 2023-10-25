'use client';
import { useSettings } from '@/hooks/useSetting';
import { ModeToggle } from '../model-toggle';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { Label } from '../ui/label';
import { ReactElement } from 'react';

const SettingsModal = (): ReactElement => {
  const { onClose, isOpen } = useSettings();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className='border-b pb-3'>
          <h2 className='text-lg font-medium'>My settings</h2>
        </DialogHeader>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-y-1'>
            <Label>Appearance</Label>
            <span className='text-[0.8rem] text-muted-foreground'>
              Customize how Jotion looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
