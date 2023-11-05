import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { Loader } from 'lucide-react';
import React from 'react';

const spinnerVariant = cva('text-muted-foreground animate-spin', {
  variants: {
    size: {
      default: 'w-4 h-4',
      sm: 'h-2 w-2',
      lg: 'h-6 w-6',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariant> {}

const Spinner = ({ size }: SpinnerProps): React.ReactElement => {
  return (
    <Loader data-test='spinner' className={cn(spinnerVariant({ size }))} />
  );
};

export default Spinner;
