import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    '../app/**/*.stories.@(ts|tsx|mdx)',
    '../components/**/*.stories.@(ts|tsx|mdx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
};
export default config;
