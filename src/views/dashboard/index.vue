<!--
 * @Author: crli
 * @Date: 2021-10-13 15:50:47
 * @LastEditors: crli
 * @LastEditTime: 2021-12-29 13:56:20
 * @Description: file content
-->
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ username }}</div>
    <div style="height: 400px; display: flex" v-loading="chartloading">
      <chart idSelect="RAM" :option="RAMOption" style="width: 600px" @hideloading="chartloading = false"></chart>
    </div>
    <editor v-model="content"></editor>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import chart from '@/components/Echarts/index'
import editor from '@/components/Editor/index'
import { computed } from 'vue'
import { useStore } from 'vuex'
let store = useStore()
let chartloading = ref(false)
let RAMOption = ref<any>({})
let content = ref()
onMounted(() => {
  RAMOption.value = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    toolbox: {
      feature: {}
    },
    series: [
      {
        name: '业务指标',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: 50, name: '内存使用率' }]
      }
    ]
  }
  content.value = '<p>😎<br/></p>'
  // setInterval(() => {
  //   RAMOption.value.series[0].data[0].value = Math.random() * 100
  // },101100)
})
const username = computed(() => {
  return store.state.user.username
})
</script>

<style lang="scss" scoped></style>
