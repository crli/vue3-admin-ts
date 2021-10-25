<!--
 * @Author: crli
 * @Date: 2020-07-20 15:15:50
 * @LastEditors: crli
 * @LastEditTime: 2021-10-25 13:41:39
 * @Description: file content
-->
<template>
  <div>
    <div :id="id"></div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Editor'
}
</script>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import E from 'wangeditor'
let editor = ref()
let info = ref<any>(null)

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: 'editorId'
  }
})
let emits = defineEmits(['onupload', 'update:modelValue', 'onblur'])

watch(
  () => props.modelValue,
  (value) => {
    if (value !== editor.value.txt.html()) {
      editor.value.txt.html(props.modelValue)
    }
  }
)
onMounted(() => {
  seteditor()
})

let seteditor = () => {
  editor.value = new E(`#${props.id}`)
  console.log(editor.value)
  let header = {}
  editor.value.config.uploadImgShowBase64 = false // base 64 存储图片
  editor.value.config.uploadImgServer = 'this.uphost' + '/xxx/operate/xxx' // 配置服务器端地址
  editor.value.config.uploadImgHeaders = header // 自定义 header
  editor.value.config.uploadFileName = 'file' // 后端接受上传文件的参数名
  editor.value.config.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
  editor.value.config.uploadImgMaxLength = 1 // 限制一次最多上传 3 张图片
  editor.value.config.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
  // 配置菜单
  editor.value.config.menus = [
    'head', // 标题
    'bold', // 粗体
    'fontSize', // 字号
    'fontName', // 字体
    'italic', // 斜体
    'underline', // 下划线
    'strikeThrough', // 删除线
    'foreColor', // 文字颜色
    'backColor', // 背景颜色
    'link', // 插入链接
    'list', // 列表
    'justify', // 对齐方式
    'quote', // 引用
    'emoticon', // 表情
    'image', // 插入图片
    'table', // 表格
    'video', // 插入视频
    'code', // 插入代码
    'undo', // 撤销
    'redo' // 重复
  ]
  editor.value.config.zIndex = 1
  editor.value.config.uploadImgHooks = {
    fail: (xhr: any, editor: any, result: any) => {
      // 插入图片失败回调
    },
    success: (xhr: any, editor: any, result: any) => {
      // 图片上传成功回调
    },
    timeout: (xhr: any, editor: any) => {
      // 网络超时的回调
    },
    error: (xhr: any, editor: any) => {
      // 图片上传错误的回调
    },
    customInsert: (insertImg: (arg0: string) => void, result: { data: { link: any; name: any } }, editor: any) => {
      // debugger
      // 图片上传成功，插入图片的回调

      insertImg(`${result.data.link}`)
      emits('onupload', result.data.name)
    }
  }
  editor.value.config.onchange = (html: string) => {
    info.value = html // 绑定当前值
    if (info.value === '<p><br></p>') {
      info.value = ''
    }
    emits('update:modelValue', info.value) // 将内容同步到父组件中
  }
  editor.value.config.onblur = () => {
    emits('update:modelValue', info.value)
    emits('onblur')
  }
  editor.value.config.focus = false
  // 创建富文本编辑器
  editor.value.create()
  editor.value.txt.html(props.modelValue)
}
</script>
<style lang="scss" scoped>
.editor {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
}
:deep(.w-e-text-container) {
  min-height: 300px;
  // height: auto !important;
  .w-e-text {
    min-height: 300px;
    height: 94% !important;
  }
}
</style>
