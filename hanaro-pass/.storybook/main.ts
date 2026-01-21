import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    '../app/**/*.stories.@(ts|tsx|mdx)',
    '../components/**/*.stories.@(ts|tsx|mdx)',
    '../stories/**/*.stories.@(ts|tsx|mdx)',
  ],

  addons: ['@storybook/addon-docs'],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
};
export default config;
