import { Plugin } from 'vite'

import { createCompiler } from '@mdx-js/mdx'

import { createFilter, FilterPattern } from '@rollup/pluginutils'

interface Options {
  include?: FilterPattern
  exclude?: FilterPattern
}

const render = `
import { mdx } from 'vite-mdx/vue3'
`

const pargma = `
/** @jsx mdx */
`

export default (options: Options = {}): Plugin => {
  return {
    name: 'vite-mdx',

    transform(code, id, ssr) {
      const { include = /\.mdx/, exclude } = options

      const filter = createFilter(include, exclude)

      if (filter(id)) {
        const compiler = createCompiler()

        const result = compiler.processSync(code)

        return {
          code: `${render}${pargma}${result.contents}`,
        }
      }
    },
  }
}
