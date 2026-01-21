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
<<<<<<< HEAD
    nextjs: {
      appDirectory: true,
      pathname: '/',
      query: {},
=======

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
>>>>>>> 7049908 (HN-40-feat: 외국인등록증/여권/계좌 바텀시트 스토리북 추가)
    },
  },
};

export default preview;
