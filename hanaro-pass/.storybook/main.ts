import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
<<<<<<< HEAD
    '../components/**/*.stories.@(ts|tsx|mdx)',
    '../stories/**/*.stories.@(ts|tsx|mdx)',
  ],

  addons: ['@storybook/addon-docs'],
=======
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
>>>>>>> a68fff0 (HN-40/feat: 신분증 등록 bottom sheet 공통 컴포넌트 구현)
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
};
export default config;