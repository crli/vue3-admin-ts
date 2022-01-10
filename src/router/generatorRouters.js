/**
 * 动态路由生成器
 */

// import Layout from '@/layout'
// import RouteView from '@/layout/RouteView'
// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  Layout: () => import(/* webpackChunkName: "Layout" */ '@/layout/Layout'),
  // 你需要动态引入的页面组件
  // 用户权限中心
  // errorlog: () => import(/* webpackChunkName: "errorlog" */ '@/views/error-log/index'),
  accountMgt: () => import(/* webpackChunkName: "accountMgt" */ '@/views/accountMgt/index'),
  tenantMgt: () => import(/* webpackChunkName: "tenantMgt" */ '@/views/tenantMgt/index'),
  resourceDir: () => import(/* webpackChunkName: "resourceDir" */ '@/views/resourceMgt/directory'),
  resourceList: () => import(/* webpackChunkName: "resourceList" */ '@/views/resourceMgt/list'),
  Menu1: () => import(/* webpackChunkName: "Menu1" */ '@/views/nested/menu1/index.vue'),
  'Menu1-1': () => import(/* webpackChunkName: "Menu1-1" */ '@/views/nested/menu1/menu1-1/index.vue'),
  'Menu1-2': () => import(/* webpackChunkName: "Menu1-2" */ '@/views/nested/menu1/menu1-2/index.vue'),
  'Menu1-2-1': () => import(/* webpackChunkName: "Menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
  'Menu1-2-2': () => import(/* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
  Menu2: () => import(/* webpackChunkName: "Menu2" */ '@/views/nested/menu2/index.vue')
}
// 前端未找到页面路由（固定不用改）
// eslint-disable-next-line
const notFoundRouter = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  hidden: true
}

/**
 * 动态生成菜单
 * @param menus
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (menus) => {
  const menuNav = []
  // 后端路由转树形
  listToTree(menus, menuNav, 'root') // 0
  // 生成路由目录结构
  // console.log(menuNav)
  const routers = generator(menuNav)
  routers.push(notFoundRouter)
  // console.log(routers, 222222)
  return routers
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach((item) => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.code
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.menuId)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  // console.log(routerMap, 2222)
  // const currentRouterArray = ['addParameterSetting', 'addVersionInfo', 'updateVersionInfo']
  return routerMap.map((item) => {
    const { title, icon, breadcrumb, activeMenu, cachePage, leaveRmCachePage } = item.meta || {}
    const menuId = item.menuId
    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.url || `${(parent && parent.path) || ''}/${item.key}`,
      // 路由名称，建议唯一
      alwaysShow: item.alwaysShow, //当设置 true 的时候永远会显示根菜单，不设置的情况下只有当子路由个数大于一个时才会显示根菜单
      name: item.code || item.key || '',
      // 该路由对应页面的 组件(动态加载)
      component: constantRouterComponents[item.component || item.key], // || (() => import(`@/views/${item.component}`)),
      hidden: item.hidden || false, // 子路由隐藏的情况
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用)
      meta: {
        menuId: menuId,
        title: title,
        icon: icon || 'eye-open',
        roles: [item.code],
        breadcrumb: breadcrumb, //如果设置为false,则在面包屑导航中不会被显示(默认 true)
        activeMenu: activeMenu || undefined, //如果设置，则sidebar会在选中时高亮设置的path
        cachePage: cachePage, //如果设置为true,则不会被 <keep-alive> 缓存(默认 false)
        leaveRmCachePage: leaveRmCachePage //如果设置为true,则会刪除  <keep-alive> 缓存(默认 true)
      }
    }

    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)

    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}
