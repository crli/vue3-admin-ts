/*
 * @Author: crli
 * @Date: 2021-10-11 09:44:12
 * @LastEditors: crli
 * @LastEditTime: 2021-10-19 16:08:18
 * @Description: file content
 */

import store from '@/store/index'

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <el-button v-action:add >添加用户</a-button>
 *    <el-button v-action:delete>删除用户</el-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 */

export default {
  mounted(el, binding) {
    const actionName = binding.arg

    if (actionName) {
      // 所有页面按钮权限数组
      const permissions = store.getters && store.getters.permissions
      // 当前页面权限code数组
      const elVal = binding.instance.$route.meta.roles
      if (elVal && elVal instanceof Array && elVal.length > 0) {
        // 遍历所有页面按钮权限数组,查找当前页面权限
        permissions.forEach((p) => {
          if (!elVal.includes(p.permissionId)) {
            //permissionId 就是路由的唯一标识code码
            return
          }
          // 满足页面路由权限，验证是否满足操作权限
          if (p.actionList && !p.actionList.includes(actionName)) {
            ;(el.parentNode && el.parentNode.removeChild(el)) || (el.style.display = 'none')
          }
        })
      }
    } else {
      throw new Error(`need roles! Like v-action:add`)
    }
  }
}
