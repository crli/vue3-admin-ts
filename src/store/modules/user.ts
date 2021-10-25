/*
 * @Author: crli
 * @Date: 2021-10-13 15:50:47
 * @LastEditors: crli
 * @LastEditTime: 2021-10-18 10:19:23
 * @Description: file content
 */
import { loginReq, logoutReq } from '@/api/user'
import { setToken, removeToken, getToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { ObjTy } from '@/types/common'
import { UserTy } from '@/types/store'

//token: getToken(),

const getDefaultState = () => {
  return {
    token: getToken(),
    username: '',
    avatar: '',
    roles: [],
    menus: [],
    permissions: [],
    userId: '',
    name: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_NAME: (state: UserTy, name: string) => {
    state.name = name
  },
  SET_AVATAR: (state: UserTy, avatar: string) => {
    state.avatar = avatar
  },
  SET_TOKEN: (state: UserTy, token: string) => {
    state.token = token
  },
  SET_ROLES: (state: UserTy, roles: Array<string>) => {
    state.roles = roles
  },
  SET_MENUS: (state: UserTy, menus: any) => {
    state.menus = menus
  },
  SET_PERMISSIONS: (state: UserTy, permissions: Array<ObjTy>) => {
    state.permissions = permissions
  },
  SET_USER_ID: (state: UserTy, userId: string) => {
    state.userId = userId
  },
  SET_USERNAME: (state: UserTy, userName: string) => {
    state.userName = userName
  }
}

const actions = {
  // user login
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login({ commit }: ObjTy, data: ObjTy) {
    return new Promise((resolve, reject) => {
      loginReq(data)
        .then((res: ObjTy) => {
          if (res.code === 20000) {
            //commit('SET_Token', res.data?.jwtToken)
            setToken(res.data?.jwtToken)
            resolve(null)
          } else {
            reject(res)
          }
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  },
  // get user info

  getInfo({ commit }: ObjTy) {
    return new Promise((resolve, reject) => {
      const menus = [
        /** *code,component,menuid,title,parentid,url,redirect**最后一个参数表示菜单显示隐藏，不传为false**/
        // {
        //   path: '/error-log',
        //   component: Layout,
        //   children: [
        //     {
        //       path: 'log',
        //       component: () => import('@/views/error-log/index'),
        //       name: 'ErrorLog',
        //       meta: { title: 'Error Log', icon: 'bug' }
        //     }
        //   ]
        // }
        // createmenu('log', 'RouteView', 'log', '错误日志', 'root', '', '/error-log'),
        // createmenu('errorlog', 'errorlog', 'log-errorlog', '错误日志', 'log', '/error-log', ''),
        createmenu('tenant', 'RouteView', 'tenant', '租户管理', 'root', '', '/tenantMgt/index'),
        createmenu('tenantMgt', 'tenantMgt', 'tenant-tenantMgt', '租户管理', 'tenant', '/tenantMgt/index', ''),
        createmenu('account', 'RouteView', 'account', '账户管理', 'root', '', '/accountMgt/index'),
        createmenu('accountMgt', 'accountMgt', 'account-accountMgt', '账户管理', 'account', '/accountMgt/index', ''),
        createmenu('resource', 'RouteView', 'resource', '资源管理', 'root', '', '/resourceMgt/directory'),
        createmenu(
          'resourceDir',
          'resourceDir',
          'resource-directory',
          '资源目录',
          'resource',
          '/resourceMgt/directory',
          ''
        ),
        createmenu('resourceList', 'resourceList', 'resource-list', '资源列表', 'resource', '/resourceMgt/list', '')
      ]
      // 按钮级别权限，控制所有页面按钮级别显示隐藏 permissionId 就是路由的唯一标识code码
      const permissions = [
        {
          permissionId: 'tenantMgt',
          permissionName: '租户管理',
          actions: [
            {
              action: 'btn_add',
              describe: '新增',
              type: 'button'
            },
            {
              action: 'btn_edit',
              describe: '编辑',
              type: 'button'
            },
            {
              action: 'btn_del',
              describe: '删除',
              type: 'button'
            },
            {
              action: 'btn_auth',
              describe: '权限设置',
              type: 'button'
            }
            // {
            //   action: 'btn_lock',
            //   describe: '锁定',
            //   type: 'button'
            // }
          ],
          actionList: []
        },
        {
          permissionId: 'accountMgt',
          permissionName: '账号管理',
          actions: [
            {
              action: 'btn_edit',
              describe: '编辑',
              type: 'button'
            }
          ],
          actionList: []
        }
      ]
      const name = '是是是'
      const id = '2222'
      const username = 'usename'
      //筛出用户页面权限
      const roles = permissions.map((per: { actions: any[]; actionList: any; permissionId: any }) => {
        if (per.actions && per.actions.length > 0) {
          const actions = per.actions.map((action: { action: any }) => {
            return action.action
          })
          per.actionList = actions
        }
        return per.permissionId
      })
      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        reject('getInfo: 权限不足请配置权限')
      }
      commit('SET_MENUS', menus)
      commit('SET_PERMISSIONS', permissions)
      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      commit('SET_USER_ID', id)
      commit('SET_USERNAME', username)
      resolve(roles)
      // getInfoReq()
      //   .then((response: ObjTy) => {
      //     const { result } = response

      //     if (!result) {
      //       reject('Verification failed, please Login again.')
      //     }
      //     const { permissions, menus, name, id, username } = result
      //     // console.log(permissions)
      //     // 筛出用户页面权限
      //     const roles = permissions.map((per: { actions: any[]; actionList: any; permissionId: any }) => {
      //       if (per.actions && per.actions.length > 0) {
      //         const actions = per.actions.map((action: { action: any }) => {
      //           return action.action
      //         })
      //         per.actionList = actions
      //       }
      //       return per.permissionId
      //     })
      //     permissions.permissionList = roles
      //     // roles must be a non-empty array
      //     if (!roles || roles.length <= 0) {
      //       reject('getInfo: 权限不足请配置权限')
      //     }
      //     commit('SET_MENUS', menus)
      //     commit('SET_PERMISSIONS', permissions)
      //     commit('SET_ROLES', roles)
      //     commit('SET_NAME', name)
      //     commit('SET_USER_ID', id)
      //     commit('SET_USERNAME', username)
      //     resolve(roles)
      //   })
      //   .catch((error: any) => {
      //     reject(error)
      //   })
    })
  },
  // user logout
  logout() {
    return new Promise((resolve, reject) => {
      logoutReq()
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          resolve(null)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  },
  // remove token
  resetToken() {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      resolve(null)
    })
  }
}
function createmenu(
  code: string,
  component: string,
  menuid: string,
  title: string,
  parentid: string,
  url: string,
  redirect: string,
  hidden = false
) {
  const menuobj = {
    code: code,
    component: component,
    description: '',
    menuId: menuid,
    hidden: hidden,
    meta: {
      hidden: false,
      icon: component,
      title: title
    },
    orderNum: 0,
    parentId: parentid,
    redirect: redirect,
    type: 'menu',
    url: url
  }
  return menuobj
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
