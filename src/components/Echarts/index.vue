<!--
 * @Author: crli
 * @Date: 2020-12-24 10:19:49
 * @LastEditors: crli
 * @LastEditTime: 2021-10-22 16:41:23
 * @Description: file content
-->
<template>
  <div class="echart" :id="idSelect"></div>
</template>
<script lang="ts">
export default {
  name: 'echart'
}
</script>
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, watch, onMounted } from 'vue'
const chart = ref()
let props = defineProps({
  option: {
    type: Object,
    require: true
  },
  idSelect: {
    type: String,
    require: true
  }
})

let emits = defineEmits(['hideloading'])

onMounted(() => {
  if (props.idSelect) {
    chart.value = echarts.init(document.getElementById(props.idSelect) as HTMLCanvasElement)
    setOption()
  }
})
watch(
  () => props.option,
  () => {
    chart.value.setOption(props.option)
  },
  { deep: true }
)

let setOption = () => {
  chart.value.setOption(props.option)
  chart.value.on('finished', () => {
    emits('hideloading')
  })
}
</script>
<style lang="scss" scoped>
.echart {
  height: 100%;
}
</style>
