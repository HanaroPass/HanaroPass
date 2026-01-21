import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    '../app/**/*.stories.@(ts|tsx|mdx)',
    '../components/**/*.stories.@(ts|tsx|mdx)',
    '../stories/**/*.stories.@(ts|tsx|mdx)',
    '../src/**/*.stories.@(ts|tsx|mdx)',
  ],

  addons: [],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
};
export default config;
