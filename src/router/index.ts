import { createRouter, createWebHashHistory, Router } from 'vue-router'
import Layout from '@/layout'
import { RouterTy } from '@/types/router'
import { ObjTy } from '@/types/common'
export const constantRoutes: RouterTy = [
  {
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index')
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]
// export const asyncRoutes: RouterTy = [
//   {
//     path: '/writing-demo',
//     component: Layout,
//     meta: { title: 'Writing Demo', icon: 'eye-open' },
//     alwaysShow: true,
//     children: [
//       {
//         path: 'hook',
//         component: () => import('@/views/example/hook/Hook.vue'),
//         name: 'Hook',
//         meta: { title: 'Hook-Demo' }
//       },
//       {
//         path: 'vuex-use',
//         component: () => import('@/views/example/vuex-use/VuexUse.vue'),
//         name: 'VuexUse',
//         meta: { title: 'Vuex-Demo' }
//       },
//       {
//         path: 'mock-test',
//         component: () => import('@/views/example/mock-test/MockTest.vue'),
//         name: 'MockTest',
//         meta: { title: 'Mock-Demo' }
//       },
//       {
//         path: 'svg-icon',
//         component: () => import('@/views/example/svg-icon/SvgIcon.vue'),
//         name: 'SvgIcon',
//         meta: { title: 'Svg-Demo' }
//       },
//       {
//         path: 'parent-children',
//         component: () => import('@/views/example/parent-children/Parent.vue'),
//         name: 'Parent',
//         meta: { title: 'Parent-Children' }
//       }
//     ]
//   },
//   // 404 page must be placed at the end !!!
//   // using pathMatch install of "*" in vue-router 4.0
//   { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
// ]
/**
 * 动态路由，需要配合用户权限动态加载的路由
 */
export const asyncRoutes: RouterTy = [
  {
    path: '/dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    name: 'Dashboard',
    hidden: true,
    meta: {
      title: '首页',
      icon: 'home',
      affix: true
    }
  }
]
/**
 * 跟路由，带侧边栏、导航栏的主页面框架
 */
export const rootRoute: ObjTy = {
  name: 'index',
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: []
}

const router: Router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ top: 0 }),
    routes: constantRoutes
  })
  router.resolve = newRouter.resolve
}

export default router
