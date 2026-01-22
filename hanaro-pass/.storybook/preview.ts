import type { Preview } from '@storybook/nextjs-vite';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      router: {
        push: (path: string) => {
          console.log('[router.push]', path);
        },
        replace: (path: string) => {
          console.log('[router.replace]', path);
        },
        back: () => {},
        forward: () => {},
        refresh: () => {},
        prefetch: async () => {},
      },
    },
  },
};

export default preview;
