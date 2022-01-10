/*
 * @Author: crli
 * @Date: 2021-10-13 15:50:46
 * @LastEditors: crli
 * @LastEditTime: 2022-01-07 10:30:55
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
declare module 'crliutils'
