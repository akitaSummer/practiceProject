import { createApp } from 'vue'
// import App from './App.vue'
import App from './App.jsx'

import Worker from './worker?worker'

import pkg, { version } from '../package.json'

// const globModules =
//     import.meta.globEager('./glob/*')

const globModules =
    import.meta.glob('./glob/*')

const worker = new Worker()

Object.entries(globModules).forEach(async([k, v]) => {
    console.log(`${k}: ${(await v()).default}`)
})

worker.onmessage = (e) => {
    console.log(e)
}

console.log(pkg, version)

console.log(
    import.meta.env
)

createApp(App).mount('#app')