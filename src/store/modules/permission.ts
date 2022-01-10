/*
 * @Author: crli
 * @Date: 2021-10-15 17:04:52
 * @LastEditors: crli
 * @LastEditTime: 2022-01-06 09:48:54
 * @Description: file content
 */
import { generatorDynamicRouter } from '@/router/generatorRouters.js'
import { constantRoutes, rootRoute } from '@/router'
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
      // 动态后端路由
      // 取用户信息接口返回来的菜单进行处理
      const dynamicRouter = generatorDynamicRouter(rootState.user.menus) || []
      // console.log(dynamicRouter, 11111)
      const mergeRouter = rootRoute.concat(dynamicRouter)
      // console.log('routers', mergeRouter)

      commit('SET_ROUTES', mergeRouter)
      resolve(mergeRouter)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
