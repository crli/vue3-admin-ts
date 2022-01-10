/*
 * @Author: crli
 * @Date: 2021-12-15 11:02:20
 * @LastEditors: crli
 * @LastEditTime: 2022-01-06 10:03:45
 * @Description: file content
 */
/*page common ts*/
import { RouteRecordRaw } from 'vue-router'

/*此处扩展的类型*/
interface RouteItemTy {
  hidden?: boolean
  alwaysShow?: boolean
  code?: number
  name?: string
  fullPath?: string
  component?: any
  path?: string
  meta?: {
    menuId?: string
    title: string
    icon?: string
    affix?: boolean
    activeMenu?: string
    breadcrumb?: boolean
    hidden?: boolean
    cachePage?: boolean
    leaveRmCachePage?: boolean
  }
  children?: RouterTy
  redirect?: string
}

type RouterRowTy = RouteRecordRaw & RouteItemTy
type RouterTy = Array<RouterRowTy>
