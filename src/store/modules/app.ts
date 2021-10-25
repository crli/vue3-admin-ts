/*
 * @Author: crli
 * @Date: 2021-10-13 15:50:47
 * @LastEditors: crli
 * @LastEditTime: 2021-10-14 16:09:04
 * @Description: file content
 */
import { ObjTy } from '@/types/common'
import { AppTy } from '@/types/store'
const state: AppTy = {
  sidebar: {
    opened: true
    //opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // withoutAnimation: false
  },
  device: 'desktop',
  cachedViews: []
}

const mutations = {
  /*mutations建议以M_开头*/
  SIDEBAR_OPEN: (state: AppTy, data: boolean) => {
    state.sidebar.opened = data
  },
  SIDEBAR_TOGGLE: (state: AppTy) => {
    state.sidebar.opened = !state.sidebar.opened
  },

  /*keepAlive缓存*/
  ADD_CACHED_VIEW: (state: AppTy, view: string) => {
    if (state.cachedViews.includes(view)) return
    state.cachedViews.push(view)
  },

  DEL_CACHED_VIEW: (state: AppTy, view: string) => {
    const index = state.cachedViews.indexOf(view)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  RESET_CACHED_VIEW: (state: AppTy) => {
    state.cachedViews = []
  }
}
const actions = {
  sidebarOpened({ commit }: ObjTy, data: boolean) {
    commit('SIDEBAR_OPEN', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
