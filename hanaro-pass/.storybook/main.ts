import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: [
    "../components/**/*.stories.@(ts|tsx|mdx)",
    "../stories/**/*.stories.@(ts|tsx|mdx)",
  ],

  addons: [],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
};
export default config;
