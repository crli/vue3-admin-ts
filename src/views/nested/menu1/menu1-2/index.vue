<!--
 * @Author: crli
 * @Date: 2022-01-05 10:12:04
 * @LastEditors: crli
 * @LastEditTime: 2022-01-06 11:26:34
 * @Description: file content
-->
<template>
  <router-view v-slot="{ Component }">
    <div style="padding: 15px">
      <el-alert :closable="false" title="menu 1-2-2" type="success">
        <component :is="Component" />
      </el-alert>
    </div>
  </router-view>
</template>
