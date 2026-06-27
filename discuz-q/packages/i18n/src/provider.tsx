'use client';

import * as React from 'react';
import { useI18nStore } from './store';
import type { Locale } from './types';

interface I18nProviderProps {
  children: React.ReactNode;
  defaultLocale?: Locale;
}

export function I18nProvider({ children, defaultLocale }: I18nProviderProps) {
  const initialized = React.useRef(false);

  React.useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const state = useI18nStore.getState();
    if (!state.locale && defaultLocale) {
      state.setLocale(defaultLocale);
    }

    if (typeof document !== 'undefined') {
      document.documentElement.lang = state.locale;
    }
  }, [defaultLocale]);

  React.useEffect(() => {
    return useI18nStore.subscribe((state) => {
      if (typeof document !== 'undefined') {
        document.documentElement.lang = state.locale;
      }
    });
  }, []);

  return <>{children}</>;
}
