<!--
 * @Author: crli
 * @Date: 2021-10-15 17:04:52
 * @LastEditors: crli
 * @LastEditTime: 2021-10-22 16:15:40
 * @Description: file content
-->
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-transform" mode="out-in">
      <div class="app-main" :class="{ 'show-tag-view': setting.needTagsView }" :key="key">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
      </div>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import setting from '@/settings'

import { getCurrentInstance, computed } from 'vue'
let { proxy }: any = getCurrentInstance()

const key = computed(() => {
  return proxy.$route.path
})
const cachedViews = computed(() => {
  return proxy.$store.state.tagsView.cachedViews
})
</script>

<style scoped lang="scss">
.app-main {
  padding: 10px;
  /*50 = navbar  */
  height: calc(100vh - #{$navBarHeight});
  width: 100%;
  position: relative;
  overflow: auto;
}
.show-tag-view {
  height: calc(100vh - #{$navBarHeight} - #{$tagViewHeight}) !important;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
