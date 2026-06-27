import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Locale, LocaleMessages, I18nParams } from './types';
import { zhCN } from './locales/zh-CN';
import { enUS } from './locales/en-US';

const messages: Record<Locale, LocaleMessages> = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

function getNestedValue(obj: unknown, path: string): string | undefined {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

function interpolate(template: string, params?: I18nParams): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    return params[key] !== undefined ? String(params[key]) : `{${key}}`;
  });
}

function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return 'zh-CN';
  const lang = navigator.language || navigator.languages?.[0] || 'zh-CN';
  if (lang.startsWith('zh')) return 'zh-CN';
  if (lang.startsWith('en')) return 'en-US';
  return 'zh-CN';
}

interface I18nState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: I18nParams) => string;
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      locale: 'zh-CN',
      setLocale: (locale: Locale) => set({ locale }),
      t: (key: string, params?: I18nParams) => {
        const { locale } = get();
        const localeMessages = messages[locale];
        const value = getNestedValue(localeMessages, key);
        if (value === undefined) {
          return key;
        }
        return interpolate(value, params);
      },
    }),
    {
      name: 'discuzq-locale',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ locale: state.locale }),
      onRehydrateStorage: () => (state) => {
        if (state && !state.locale) {
          state.locale = detectBrowserLocale();
        }
      },
    },
  ),
);

export function getLocaleOnServer(): Locale {
  return 'zh-CN';
}

export function tOnServer(key: string, params?: I18nParams, locale: Locale = 'zh-CN'): string {
  const localeMessages = messages[locale];
  const value = getNestedValue(localeMessages, key);
  if (value === undefined) {
    return key;
  }
  return interpolate(value, params);
}

export { messages };
