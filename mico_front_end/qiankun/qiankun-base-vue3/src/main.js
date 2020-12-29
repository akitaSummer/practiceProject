import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import { registerMicroApps, start } from 'qiankun'

const apps = [{
    name: 'vueApp',
    entry: '//localhost:10001', // 默认会加载这个html 解析内部js 动态执行 (但是需要子应用支持fetch)
    container: '#vue',
    activeRule: '/vue'
}, {
    name: 'reactApp',
    entry: '//localhost:10002',
    container: '#react',
    activeRule: '/react'
}]

registerMicroApps(apps)

start({
    prefetch: false, // 取消预加载
})

const app = createApp(App)

app.use(router)

app.use(ElementPlus)

app.mount('#app')