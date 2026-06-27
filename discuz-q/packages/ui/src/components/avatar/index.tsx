'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import Image from 'next/image';

import { cn } from '../../lib/utils';

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

interface AvatarImageProps extends Omit<React.ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt' | 'fill'> {
  src?: string;
  alt?: string;
  loading?: 'lazy' | 'eager';
}

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  AvatarImageProps
>(({ className, src, alt = '', loading = 'lazy', ...props }, ref) => {
  if (!src) {
    return null;
  }

  return (
    <div className="relative h-full w-full">
      <Image
        ref={ref}
        src={src}
        alt={alt}
        fill
        sizes="40px"
        loading={loading}
        className={cn('aspect-square h-full w-full object-cover', className)}
        {...props}
      />
    </div>
  );
});
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;

export { Avatar, AvatarImage, AvatarFallback };
