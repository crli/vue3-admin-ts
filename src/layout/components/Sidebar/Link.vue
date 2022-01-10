<!--
 * @Author: crli
 * @Date: 2021-10-13 15:50:47
 * @LastEditors: crli
 * @LastEditTime: 2022-01-07 09:53:47
 * @Description: file content
-->
<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils/validate'
import { onMounted, computed, getCurrentInstance } from 'vue'
let { proxy }: any = getCurrentInstance()
defineProps({
  to: {
    type: String,
    required: true
  }
})
const isExternalValid = computed(() => {
  return isExternal(proxy.to)
})
const type = computed(() => {
  if (isExternalValid.value) {
    return 'a'
  }
  return 'router-link'
})
const linkProps = (to: string) => {
  if (isExternalValid.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to: to
  }
}
onMounted(() => {})
</script>

<style scoped lang="scss"></style>
