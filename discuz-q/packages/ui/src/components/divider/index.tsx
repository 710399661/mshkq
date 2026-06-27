import * as React from 'react';
import { cn } from '../../lib/utils';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', variant = 'solid', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn(
          'shrink-0 bg-border',
          orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
          variant === 'dashed' && 'bg-transparent border-t border-dashed border-border',
          variant === 'dotted' && 'bg-transparent border-t border-dotted border-border',
          orientation === 'vertical' && variant === 'dashed' && 'border-l border-t-0',
          orientation === 'vertical' && variant === 'dotted' && 'border-l border-t-0',
          className,
        )}
        {...props}
      />
    );
  },
);
Divider.displayName = 'Divider';

export { Divider };
