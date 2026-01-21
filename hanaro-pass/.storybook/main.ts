import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    '../app/**/*.stories.@(ts|tsx|mdx)',
    '../src/**/*.stories.@(ts|tsx|mdx)',
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
};
export default config;
