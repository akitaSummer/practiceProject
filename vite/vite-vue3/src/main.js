import { createApp } from 'vue'
// import App from './App.vue'
import App from './App.jsx'

import Worker from './worker?worker'

import pkg, { version } from '../package.json'

const worker = new Worker()

worker.onmessage = (e) => {
    console.log(e)
}

console.log(pkg, version)

console.log(
    import.meta.env
)

createApp(App).mount('#app')