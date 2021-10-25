<!--
 * @Author: crli
 * @Date: 2021-10-15 17:04:52
 * @LastEditors: crli
 * @LastEditTime: 2021-10-20 09:28:47
 * @Description: file content
-->
<template>
  <div>ref1:{{ ref1 }},ref2:{{ ref2 }}</div>
  <el-button @click="hookExample">执行hook方法</el-button>
</template>

<script setup lang="ts">
import testHooks from '@/hooks/testHooks'
let { ref1, ref2, hooksFunc } = testHooks()
const hookExample = () => {
  hooksFunc()
}
console.log(`获取到hook导出的数据${ref2}`)
console.log(`获取到hook导出的数据${ref1}`)
</script>

<style scoped lang="scss"></style>
