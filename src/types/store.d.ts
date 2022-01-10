/*
 * @Author: crli
 * @Date: 2021-10-13 15:50:47
 * @LastEditors: crli
 * @LastEditTime: 2022-01-06 10:52:25
 * @Description: file content
 */
/*vuex ts*/
import { RouterTy } from '@/types/router'

interface statTy {
  app: AppTy
  permission: PermissionTy
  user: UserTy
}

interface AppTy {
  sidebar: {
    opened: boolean
    //opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // withoutAnimation: false
  }
  settings: ObjTy
  device: 'desktop'
  cachedViews: Array<string>
}
interface PermissionTy {
  routes: RouterTy //将过滤后的异步路由和静态路由集合
  addRoutes: RouterTy //过滤后的异步路由
}

interface UserTy {
  userName: string
  avatar: string,
  token:string,
  avatar: string,
  roles: Array<string>,
  menus: Array,
  permissions: Array,
  userId: string,
  name: string,
}
