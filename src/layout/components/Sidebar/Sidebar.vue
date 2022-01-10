<!--
 * @Author: crli
 * @Date: 2021-10-13 15:50:47
 * @LastEditors: crli
 * @LastEditTime: 2022-01-07 10:26:13
 * @Description: file content
-->

<template>
  <div id="Sidebar" class="reset-menu-style">
    <!--logo-->
    <Logo v-if="settings.sidebarLogo" :collapse="!isCollapse" />
    <!--router nav-->
    <el-scrollbar>
      <el-menu
        class="el-menu-vertical"
        :default-active="activeMenu"
        :collapse="!isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        :background-color="scssJson.menuBg"
        :text-color="scssJson.menuText"
        :active-text-color="scssJson.menuActiveText"
        mode="vertical"
      >
        <SidebarItem v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import { computed } from 'vue'
//导入配置文件
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ObjTy } from '@/types/common'
const store = useStore()
const settings = computed(() => {
  return store.state.app.settings
})

const route = useRoute()
const permission_routes = computed(() => {
  return store.getters.permission_routes
})
const isCollapse = computed(() => {
  return store.state.app.sidebar.opened
})

//change  scss variable to js
const dillScssExportToJson = (scssExportJson: string) => {
  const jsonString = scssExportJson.replace(/:export\s*/, '').replace(/[\s+\r\n]/g, '')
  const scssJson: ObjTy = {}
  jsonString
    .slice(1, jsonString.length - 2)
    .split(';')
    .forEach((fItem) => {
      const arr = fItem.split(':')
      scssJson[arr[0]] = arr[1]
    })
  return scssJson
}

//get scss variable
import scssExportJson from '@/styles/variables-to-js.scss'
const scssJson = dillScssExportToJson(scssExportJson)
const activeMenu = computed(() => {
  const { meta, fullPath } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return fullPath
})
</script>

<style lang="scss">
.reset-menu-style {
  .el-menu {
    border-right: none;
  }
  .el-scrollbar__wrap {
    padding-bottom: 10vh;
  }
}

.el-menu-vertical {
  width: $sideBarWidth;
}
</style>
