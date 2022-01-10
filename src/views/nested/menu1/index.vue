<!--
 * @Author: crli
 * @Date: 2022-01-05 10:12:04
 * @LastEditors: crli
 * @LastEditTime: 2022-01-06 11:26:55
 * @Description: file content
-->
<template>
  <div>
    <router-view v-slot="{ Component }">
      <el-alert :closable="false" title="menu 1">
        <component :is="Component" />
      </el-alert>
    </router-view>
  </div>
</template>
