<template>
  <div>模板{{ state.xxx }}{{ routes }}</div>
</template>
<script lang="ts">
export default {
  name: ''
}
</script>
<script setup lang="ts">
//相关引入
import { onMounted, getCurrentInstance, watch, ref, reactive, computed } from 'vue'
//import {useRouter} from 'vue-router'
//import {useStore} from 'vuex'
let { proxy }: any = getCurrentInstance()
//响应式数据、props、emit 定义
const state = reactive({
  xxx: null
})
const a = ref(0)
const props = defineProps({
  name: {
    require: true,
    default: 'aaa',
    type: String
  }
})
const emits = defineEmits(['change'])
//生命周期以及 watch computed书写
onMounted(() => {
  console.log(proxy)
  emits('change')
})
const routes = computed(() => {
  return []
  //return proxy.$store.state.permission.routes;
})
watch(
  () => props.name,
  (oldValue, newValue) => {
    console.log(oldValue, newValue)
  },
  { immediate: true }
)
//方法定义
let func = () => {
  console.log('func')
}
//方法、属性暴露
defineExpose({ func, a })
</script>
<style scoped lang="scss"></style>
