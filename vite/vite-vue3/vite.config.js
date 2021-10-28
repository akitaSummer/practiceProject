import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import testPlugin from './plugins/test-plugin'

// https://vitejs.dev/config/
export default defineConfig({
    // plugins: [vue(), vueJsx(), testPlugin('post'), testPlugin(), testPlugin('pre')], // pre -> normal -> post
    plugins: [vue(), vueJsx(), testPlugin()],
    resolve: {
        alias: {
            '@styles': "/src/styles",
        }
    },
    build: {
        manifest: true
    }
})