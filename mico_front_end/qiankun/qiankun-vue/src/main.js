import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

let app

const render = (props) => {
    const { container } = props
    // 这里是挂载到自己的html中，基座会将其插入进去
    app = createApp(App)

    app.use(router)

    app.mount(container ? container.querySelector("#app") : "#app")
}

if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

// 独立运行
if (!window.__POWERED_BY_QIANKUN__) {
    render({})
}

// 子组件协议
export const bootstrap = async(props) => {}
export const mount = async(props) => {
    render(props)
}
export const unmount = async(props) => {
    app.unmount()
}