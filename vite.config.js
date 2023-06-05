import { fileURLToPath, URL } from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import NutUIResolver from '@nutui/nutui/dist/resolver'
import externalGlobals from 'rollup-plugin-external-globals'
import {createHtmlPlugin} from 'vite-plugin-html'
import viteSvgToWebfont from 'vite-svg-2-webfont'
import path from 'path'

const cdn = {
  css: [],
  js: [
    'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-y/vue/3.2.25/vue.global.prod.min.js',
    'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-y/vue-router/4.0.13/vue-router.global.prod.min.js',
    'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-y/axios/0.26.0/axios.min.js',
    'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/clipboard.js/2.0.10/clipboard.min.js'
  ],
}
export default defineConfig(({mode}) => {
  const isProduction = mode === 'production' || mode === 'docker';
  return {
    // base: 'http://127.0.0.1:8080/',//可以设置资源链接的基础路径
    build: {
      reportCompressedSize: false,
      assetsDir: './assets',
      chunkSizeWarningLimit: 500,
      mode: 'production',
      minify: 'terser',
      sourcemap: false,
      cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      terserOptions: {
        compress: {
          drop_console: isProduction,  //打包时删除console
          drop_debugger: isProduction, //打包时删除 debugger
          pure_funcs: ['console.log'],
        },
        output: {
          // 去掉注释内容
          comments: isProduction,
        },
      },
      brotliSize: false,
      target: 'es2015'
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 默认京东 APP 10.0主题 > @import "@nutui/nutui/dist/styles/variables.scss";
          // 京东科技主题 > @import "@nutui/nutui/dist/styles/variables-jdt.scss";
          // 京东B商城主题 > @import "@nutui/nutui/dist/styles/variables-jdb.scss";
          // 京东企业业务主题 > @import "@nutui/nutui/dist/styles/variables-jddkh.scss";
          additionalData: `@import "@nutui/nutui/dist/styles/variables-jdt.scss";`
        }
      }
    },
    plugins: [
      viteSvgToWebfont({
        context: path.resolve(__dirname, 'src', 'icons'),
      }),
      vue(),
      Components({
        resolvers: [NutUIResolver()],
      }),
      createHtmlPlugin({
        inject: {
          data: {
            cdnCss: isProduction ? cdn.css : [],
            cdnJs: isProduction ? cdn.js : [],
          },
        },
      }),
      {
        ...externalGlobals({
          vue: 'Vue',
          axios: 'axios',
          moment: 'moment',
          clipboard: 'ClipboardJS',
          'vue-router': 'VueRouter',
        }),
        enforce: 'post',
        apply: 'build',
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 8080,
      host: true,
      hmr: true
      // proxy: localEnabled ? {} : {
      //     '/api': {
      //         target: 'https://127.0.0.1:40000',   //实际请求地址
      //         changeOrigin: true,
      //         rewrite: (path) => path.replace(/^\/api/, '/api')
      //     },
      // }
    },
  }
})
