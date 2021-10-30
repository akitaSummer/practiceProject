import { Plugin } from "vite";

import { createCompiler } from "@mdx-js/mdx";

import { createFilter, FilterPattern } from "@rollup/pluginutils";

export enum Framework {
  React = "react",
  Vue3 = "vue3",
}

interface Options {
  include?: FilterPattern;
  exclude?: FilterPattern;
  framework?: Framework;
  renderer?: string;
  pargma?: string;
}

const vue3DefaultRenderer = `
import { mdx } from 'vite-mdx/vue3'
`;

const vue3DefaultPargma = `
/** @jsx mdx */
`;

const reactDefaultRenderer = `
import React from 'react'
import {mdx} from '@mdx-js/react'
`;

const reactDefaultPargma = `
/** @jsxRuntime classic */
/* @jsx mdx */
/* @jsxFrag mdx.Fragment */
`;

const frameworkRendererPargmaMap = {
  vue3: {
    renderer: vue3DefaultRenderer,
    pargma: vue3DefaultPargma,
  },
  react: {
    renderer: reactDefaultRenderer,
    pargma: reactDefaultPargma,
  },
};

export default (options: Options = {}): Plugin => {
  const framework = options.framework || "vue3";
  if (
    (framework as any) !== Framework.Vue3 &&
    (framework as any) !== Framework.React
  ) {
    throw new Error("framework now only support `vue3` and `react`");
  }
  return {
    name: "vite-mdx",

    enforce: framework === Framework.React ? "pre" : undefined,

    config() {
      return {
        esbuild: {
          include: /\.(jsx|tsx|ts|mdx)/,
          loader: "jsx",
        },
      };
    },

    transform(code, id, ssr) {
      const {
        include = /\.mdx/,
        exclude,
        renderer: optionRenderer,
        pargma: optionPargma,
      } = options;

      const filter = createFilter(include, exclude);

      const { renderer: defaultRenderer, pargma: defaultPargma } =
        frameworkRendererPargmaMap[framework];

      const renderer = optionRenderer ?? defaultRenderer;

      const pargma = optionPargma ?? defaultPargma;

      if (filter(id)) {
        const compiler = createCompiler();

        const result = compiler.processSync(code);

        return {
          code: `${renderer}${pargma}${result.contents}`,
        };
      }
    },
  };
};
