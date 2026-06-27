import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const tagVariants = cva(
  'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary hover:bg-primary/20',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        success: 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20',
        danger: 'bg-red-500/10 text-red-600 hover:bg-red-500/20',
        blue: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20',
        purple: 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20',
        pink: 'bg-pink-500/10 text-pink-600 hover:bg-pink-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  closable?: boolean;
  onClose?: () => void;
}

function Tag({ className, variant, closable, onClose, children, ...props }: TagProps) {
  return (
    <span className={cn(tagVariants({ variant }), className)} {...props}>
      {children}
      {closable && (
        <button
          type="button"
          className="ml-1 -mr-0.5 hover:opacity-70"
          onClick={onClose}
          aria-label="close"
        >
          ×
        </button>
      )}
    </span>
  );
}

export { Tag, tagVariants };
