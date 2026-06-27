import sharedConfig from '@discuzq/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Config = {
  ...sharedConfig,
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
};

export default config;
