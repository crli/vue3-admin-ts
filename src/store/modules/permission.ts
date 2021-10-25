/*
 * @Author: crli
 * @Date: 2021-10-15 17:04:52
 * @LastEditors: crli
 * @LastEditTime: 2021-10-20 10:26:06
 * @Description: file content
 */
import { generatorDynamicRouter } from '@/router/generatorRouters.js'
import { asyncRoutes, constantRoutes, rootRoute } from '@/router'
import { RouterTy } from '@/types/router'
import { PermissionTy } from '@/types/store'
import { ObjTy } from '@/types/common'
const state: PermissionTy = {
  routes: [], //将过滤后的异步路由和静态路由集合
  addRoutes: [] //过滤后的异步路由
}
const mutations = {
  SET_ROUTES: (state: PermissionTy, routes: RouterTy) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
const actions = {
  generateRoutes({ commit, rootState }: ObjTy) {
    return new Promise((resolve) => {
      const routers = []
      // 动态后端路由
      // 取用户信息接口返回来的菜单进行处理
      const dynamicRouter = generatorDynamicRouter(rootState.user.menus) || []

      const mergeRouter = asyncRoutes.concat(dynamicRouter)

      rootRoute.children = mergeRouter
      routers.push(rootRoute)

      // console.log('routers', routers)

      commit('SET_ROUTES', routers)
      resolve(routers)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
