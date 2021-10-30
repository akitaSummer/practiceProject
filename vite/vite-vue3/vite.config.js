import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import testPlugin from './plugins/test-plugin'

import viteMdx from './plugins/vite-mdx'

// https://vitejs.dev/config/
export default defineConfig({
    // plugins: [vue(), vueJsx(), testPlugin('post'), testPlugin(), testPlugin('pre')], // pre -> normal -> post
    plugins: [
        viteMdx(),
        vue(),
        vueJsx({
            include: /\.(jsx|tsx|mdx)/,
        }),
        testPlugin(),
    ],
    resolve: {
        alias: {
            '@styles': '/src/styles',
            'vite-mdx': '/plugins'
        },
    },
    build: {
        manifest: true,
    },
})