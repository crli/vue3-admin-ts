/*
 * @Author: crli
 * @Date: 2021-10-13 15:50:46
 * @LastEditors: crli
 * @LastEditTime: 2021-11-23 16:07:44
 * @Description: file content
 */
import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteSvgIcons from 'vite-plugin-svg-icons'
import { loadEnv } from 'vite'
//mock
import { viteMockServe } from 'vite-plugin-mock'
import setting from './src/settings'
const prodMock = setting.openProdMock
export default ({ command, mode }: any) => {
  return {
    base: './',
    define: {
      'process.platform': null,
      'process.version': null
    },
    clearScreen: false,
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: 5003, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      proxy: {
        // 类型： Record<string, string | ProxyOp 为开发服务器配置自定义代理规则
        [loadEnv(mode, process.cwd()).VITE_APP_BASE_URL]: {
          target: 'http://172.22.22.222:2222/manager',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp('^' + loadEnv(mode, process.cwd()).VITE_APP_BASE_URL), '')
        },
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      viteSvgIcons({
        // config svg dir that can config multi
        iconDirs: [path.resolve(process.cwd(), 'src/icons/common'), path.resolve(process.cwd(), 'src/icons/nav-bar')],
        // appoint svg icon using mode
        symbolId: 'icon-[dir]-[name]'
      }),
      //https://blog.csdn.net/weixin_42067720/article/details/115579817
      viteMockServe({
        supportTs: true,
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: prodMock,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
        logger: true
      })
    ],
    build: {
      minify: 'terser',
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, './'),
        '@': resolve(__dirname, 'src'),
        '!mock': resolve(__dirname, 'mock')
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
    },
    css: {
      preprocessorOptions: {
        //define global scss variable
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },
    optimizeDeps: {
      include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en']
    }
  }
}
