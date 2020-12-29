// import './set-public-path';
import { h, createApp } from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue'

// 子应用需要暴露出 bootstrap mount unmount

// 可以使用single-spa-vue

const appOptions = {
    createApp,
    appOptions: {
        render() {
            return h(App, {
                name: this.name,
                mountParcel: this.mountParcel,
                singleSpa: this.singleSpa,
            });
        },
    },
    handleInstance: (app) => {
        app.use(router);
    }
}

const vueLifeCycle = singleSpaVue({
    createApp,
    appOptions
})

// 如果父应用引用
if (window.singleSpaNavigate) {
    __webpack_public_path__ = 'http://localhost:10001'
}

// 开发子应用时
createApp(App).use(router).mount(window.singleSpaNavigate ? '#vue' : '#app')

export const bootstrap = vueLifeCycle.bootstrap
export const mount = vueLifeCycle.mount
export const unmount = vueLifeCycle.unmount

// 将子应用打包成lib给父应用使用