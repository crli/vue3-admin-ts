/*
 * @Author: crli
 * @Date: 2021-12-15 11:02:20
 * @LastEditors: crli
 * @LastEditTime: 2022-01-06 09:59:31
 * @Description: file content
 */
import { createStore } from 'vuex'
import getters from './getters'
import { ObjTy } from '@/types/common'
//auto import (perfect!!!)
const modulesFiles = import.meta.globEager('./modules/*.ts')
const modules: ObjTy = {}
for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  modules[moduleName] = modulesFiles[path].default
}

//复杂的方式
// const modulesFiles = import.meta.globEager('./modules/*.js')
// console.log(Object.keys(modulesFiles));
// const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
//   // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const moduleName = modulePath.replace(/(.*\/)*([^.]+).*/gi, '$2')
//   const value = modulesFiles[modulePath]
//   modules[moduleName] = value.default
//   return modules
// }, {})
// console.log(modules);
export default createStore({
  modules,
  getters
})
