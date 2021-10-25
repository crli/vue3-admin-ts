/*
 * @Author: crli
 * @Date: 2021-10-13 15:50:46
 * @LastEditors: crli
 * @LastEditTime: 2021-10-15 15:23:16
 * @Description: file content
 */
/*
 * @Author: crli
 * @Date: 2021-10-13 15:50:46
 * @LastEditors: crli
 * @LastEditTime: 2021-10-14 13:07:07
 * @Description: file content
 */
import router from '@/router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import settings from './settings'
import { getToken } from '@/utils/auth'
import { ObjTy } from '@/types/common'
import { ElMessage } from 'element-plus'
import { RouteRecordRaw } from 'vue-router'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login', '/forgetPassword', '/emailValidation', '/messageValidation'] // no redirect whitelist
const defaultRoutePath = '/dashboard'
router.beforeEach(async (to: ObjTy, from: ObjTy, next: any) => {
  NProgress.start()
  /*
   * 正常流程如下:主要有两大点token和role
   * 1.是否与token 没有去登录页 ,有 如果要去登录页则重定向到首页。没有, 重新定向到登录页
   * 2.判断是否权限筛选,是,直接放行。没有，筛选动态路由后，添加动态路由然后放行，
   * */
  let token: string
  if (settings.isNeedLogin) {
    token = getToken()
  } else {
    token = 'temp_token'
  }
  if (token) {
    if (to.path === '/login') {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      const hasRoles: boolean = store.getters.roles && store.getters.roles.length > 0
      // let hasRoles = true
      if (hasRoles) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo')
          // generate accessible routes map based on roles
          // debugger
          const accessRoutes = await store.dispatch('permission/generateRoutes')
          // dynamically add accessible routes
          accessRoutes.forEach((route: RouteRecordRaw) => router.addRoute(route))
          console.log(router)
          const toPath = { ...to }

          // console.log(toPath)
          if (toPath.path === '/') {
            // console.log(123)
            next({ name: 'Dashboard', replace: true })
          } else {
            // console.log(321)
            next({ ...to, replace: true })
          }
          //...to 路由加载完后再放行,防止白屏
          //replace: true只是一个设置信息，告诉VUE本次操作后，不能通过浏览器后退按钮，返回前一个路由。=
          //vue3.0中addRoutes被销毁了
        } catch (err) {
          await store.dispatch('user/resetToken')
          ElMessage.error(err || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
  //写具体路径时会造成死循环
  // next({ path: '/' });
})

router.afterEach(() => {
  // next();
  // console.log("路由后拦截afterEach");
  NProgress.done()
})
