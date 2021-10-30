import { defineComponent } from 'vue'

// import "@styles/index.css";
import '@styles/test.less'

import { MDXProvider } from 'vite-mdx/vue3'

import classes from '@styles/test.module.css'

import { a } from './test'
// import { a } from "./test?url"; // 文件路径
// import { a } from "./test?raw"; // 源码字符串

import logo from './assets/logo.png'

import Hello from './hello.mdx'
import { slotFlagsText } from '@vue/shared'

export default defineComponent({
  setup() {
    return () => {
      return (
        <MDXProvider
          components={{
            h1: (props, { slots }) => (
              <div data-at="h1" {...props}>
                {slots.default && slots.default()}
              </div>
            ),
          }}
        >
          <div class={`root ${classes.moduleClass}`}>
            Hello Vue3 jsx {a.name}
          </div>
          <img src={logo} />
          <Hello />
        </MDXProvider>
      )
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.on('test', (val) => {
    console.log(val)
  })
}
