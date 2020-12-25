import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// single-spa
import { registerApplication, start } from 'single-spa'

// singleSpa 缺陷 不够灵活 不能动态加载js文件
// 样式不隔离 没有js沙盒机制

const loadScript = async(url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = url
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
    })
}

registerApplication('myVueApp',
    async() => {
        await loadScript('http://localhost:10001/js/about.js')
        await loadScript('http://localhost:10001/js/chunk-vendors.js')
        await loadScript('http://localhost:10001/js/app.js')
        return window.singleVue
    },
    location => location.pathname.startsWith('/vue'), // 用户切换到 /vue 路径下时调用刚才的子应用
    // 第四个参数用于传递prop给子应用
)

start()

createApp(App).use(router).mount('#app')