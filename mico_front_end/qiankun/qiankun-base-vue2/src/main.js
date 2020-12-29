import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

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

Vue.use(ElementUI)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')