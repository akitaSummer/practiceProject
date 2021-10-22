import { defineComponent } from 'vue'

// import "@styles/index.css";
import '@styles/test.less'

import classes from '@styles/test.module.css'

import { a } from './test'
// import { a } from "./test?url"; // 文件路径
// import { a } from "./test?raw"; // 源码字符串

import logo from './assets/logo.png'

export default defineComponent({
  setup() {
    return () => {
      return (
        <>
          <div class={`root ${classes.moduleClass}`}>
            Hello Vue3 jsx {a.name}
          </div>
          <img src={logo} />
        </>
      )
    }
  },
})
