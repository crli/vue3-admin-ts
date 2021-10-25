/*
 * @Author: crli
 * @Date: 2021-10-13 15:50:46
 * @LastEditors: crli
 * @LastEditTime: 2021-10-14 10:24:21
 * @Description: file content
 */
/*生命模块类型*/
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module './*'
declare module './*/*'
declare module '@/*'
declare module '@/hooks'
declare module 'js-cookie'
declare module '!mock'
declare module 'nprogress'
