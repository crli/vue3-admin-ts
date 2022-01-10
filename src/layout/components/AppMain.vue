<!--
 * @Author: crli
 * @Date: 2021-10-15 17:04:52
 * @LastEditors: crli
 * @LastEditTime: 2022-01-07 09:45:57
 * @Description: file content
-->
<template>
  <div class="app-main" :class="{ 'show-tag-view': settings.needTagsView }">
    <router-view v-slot="{ Component }">
      <!--has transition  Judging by settings.mainNeedAnimation-->
      <transition v-if="settings.mainNeedAnimation" name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
      </transition>
      <!-- no transition -->
      <keep-alive v-else :include="cachedViews">
        <component :is="Component" :key="key" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import settings from '@/settings'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { ObjTy } from '@/types/common'
const store = useStore()
const route = useRoute()
// cachePage: is true, keep-alive this Page
// leaveRmCachePage: is true, keep-alive remote when page leave
let oldRoute: ObjTy = {}
const key = computed({
  get() {
    if (oldRoute?.name) {
      if (oldRoute.meta?.leaveRmCachePage && oldRoute.meta?.cachePage) {
        store.commit('app/DEL_CACHED_VIEW', oldRoute.name)
      }
    }
    if (route.name) {
      if (route.meta?.cachePage) {
        store.commit('app/ADD_CACHED_VIEW', route.name)
      }
    }
    oldRoute = JSON.parse(JSON.stringify({ name: route.name, meta: route.meta }))
    return route.path
  },
  set() {}
})

const cachedViews = computed(() => {
  return store.state.app.cachedViews
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
