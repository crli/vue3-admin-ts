<!--
 * @Author: crli
 * @Date: 2021-10-21 10:17:49
 * @LastEditors: crli
 * @LastEditTime: 2021-10-21 14:47:18
 * @Description: file content
-->
<template>
  <el-dialog :title="(id ? '编辑' : '创建') + '租户'" width="30%" @open="open">
    {{ state }}
  </el-dialog>
</template>
<script lang="ts">
export default {
  name: 'tenantDlg'
}
</script>
<script setup lang="ts">
//相关引入
import { reactive } from 'vue'
//响应式数据、props、emit 定义
const state = reactive({
  xxx: ''
})
const props = defineProps({
  id: {
    type: String
  }
})
let open = () => {
  if (props.id) state.xxx = '查详情' + Math.random()
  else state.xxx = ''
}
</script>
<style scoped lang="scss"></style>
