'use client';

import { type ThemeProviderProps } from 'next-themes/dist/types';
import { Fragment } from 'react';
import { Toaster } from 'sonner';

export function ToastProvider ({ children, ...props }: ThemeProviderProps) {
  return (
    <Fragment {...props}>
      {children}
      <Toaster richColors closeButton />
    </Fragment>
  );
}
