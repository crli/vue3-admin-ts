<!--
 * @Author: crli
 * @Date: 2021-10-19 13:59:45
 * @LastEditors: crli
 * @LastEditTime: 2021-10-21 14:41:47
 * @Description: file content
-->
<template>
  <el-dialog title="应用列表" width="30%" @open="open">{{ id }}{{ appList }}</el-dialog>
</template>
<script lang="ts">
export default {
  name: 'appListDlg'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
let appList: any = ref([])
const props = defineProps({
  id: {
    require: true,
    type: String
  }
})
let open = () => {
  console.log(props.id)
  appList.value = [Math.random(), Math.random()]
}
</script>
<style scoped lang="scss"></style>
