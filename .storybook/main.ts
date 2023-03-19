import type { StorybookConfig } from "@storybook/nextjs";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  // pnpm storybook --debug-webpack will show the webpack config.
  webpackFinal: async (config, options) => {
    config = {
      ...config,
      resolve: {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
        },
      },
      plugins: [...config.plugins ?? [],
      new NodePolyfillPlugin(),
      ]

    }


    return config
  },
  docs: {
    autodocs: "tag"
  },
  //https://storybook.js.org/docs/react/builders/webpack#lazy-compilation
  core: {
    builder: {
      name: '@storybook/builder-webpack5',
      options: {
        lazyCompilation: true,
        fsCache: true,
      },
    },
  },
};
export default config