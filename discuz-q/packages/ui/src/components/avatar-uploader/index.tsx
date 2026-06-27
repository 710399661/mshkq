'use client';

import * as React from 'react';
import { Camera } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';

export interface AvatarUploaderProps {
  value?: string;
  onChange?: (file: File) => void;
  size?: number;
  className?: string;
  disabled?: boolean;
  fallback?: string;
}

function AvatarUploader({
  value,
  onChange,
  size = 80,
  className,
  disabled,
  fallback,
}: AvatarUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [preview, setPreview] = React.useState<string | undefined>(value);

  React.useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    onChange?.(file);
  };

  return (
    <div
      className={cn(
        'relative cursor-pointer group',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
      onClick={handleClick}
    >
      <Avatar
        style={{ width: size, height: size }}
        className="border-2 border-border"
      >
        {preview ? (
          <AvatarImage src={preview} alt="avatar" />
        ) : (
          <AvatarFallback>{fallback || '?'}</AvatarFallback>
        )}
      </Avatar>
      {!disabled && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Camera className="h-6 w-6 text-white" />
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}

export { AvatarUploader };
