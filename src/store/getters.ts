import { statTy } from '@/types/store'

/*
 * @Author: crli
 * @Date: 2021-10-13 15:50:47
 * @LastEditors: crli
 * @LastEditTime: 2021-10-15 15:20:12
 * @Description: file content
 */
const getters = {
  device: (state: statTy) => state.app.device,
  cachedViews: (state: statTy) => state.app.cachedViews,
  // menu
  permission_routes: (state: statTy) => state.permission.routes,
  addRoutes: (state: statTy) => state.permission.addRoutes,

  roles: (state: statTy) => state.user.roles,
  permissions: (state: statTy) => state.user.permissions
}
export default getters
