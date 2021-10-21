import { defineComponent } from "vue";

// import "@styles/index.css";
import "@styles/test.less";

import classes from "@styles/test.module.css";

import { a } from "./test";

export default defineComponent({
  setup() {
    return () => {
      return (
        <div class={`root ${classes.moduleClass}`}>Hello Vue3 jsx {a.name}</div>
      );
    };
  },
});
