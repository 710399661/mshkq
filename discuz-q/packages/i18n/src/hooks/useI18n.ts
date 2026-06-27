'use client';

import { useI18nStore } from '../store';
import type { Locale, I18nParams } from '../types';

export function useI18n() {
  const { locale, setLocale, t } = useI18nStore();

  return {
    locale,
    setLocale: (newLocale: Locale) => {
      setLocale(newLocale);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLocale;
      }
    },
    t: (key: string, params?: I18nParams) => t(key, params),
  };
}
