<template>
  <div class="navbar rowBC">
    <div class="rowSC">
      <hamburger
        v-if="settings.showHamburger"
        :is-active="opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <breadcrumb class="breadcrumb-container" v-if="settings.showHamburger" />
    </div>
    <!--nav title-->
    <div class="heardCenterTitle" v-if="settings.showTitle">{{ settings.showTitle }}111</div>
    <div class="right-menu" v-if="settings.ShowDropDown">
      <el-dropdown trigger="click" size="medium">
        <div class="avatar-wrapper">
          <img src="" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item divided @click="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
import { computed } from 'vue'
import { useStore } from 'vuex'
// import { ElMessage } from 'element-plus'
// let { proxy }: any = getCurrentInstance()
const store = useStore()
const settings = computed(() => {
  return store.state.app.settings
})
const opened = computed(() => {
  return store.state.app.sidebar.opened
})
const toggleSideBar = () => {
  store.commit('app/SIDEBAR_TOGGLE')
}

/*
 * 退出登录
 * */
const loginOut = () => {
  store.dispatch('user/logout').then(() => {
    // ElMessage({ message: '退出登录成功', type: 'success' })
    // proxy.$router.push(`/login?redirect=${proxy.$route.fullPath}`)
    //此处reload清空路由和重置部分状态,避免路由权限错误
    location.reload()
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  height: $navBarHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

//logo
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
  cursor: pointer;

  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
}

//center-title
.heardCenterTitle {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 46%;
  font-weight: 600;
  font-size: 20px;
  transform: translate(-50%, -50%);
}

//drop-down
.right-menu {
  cursor: pointer;
  margin-right: 40px;
}
</style>
