<template>
  <div :class="{ hidden: hidden, center: center, right: right }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { scrollTo } from '@/utils/scrollTo'
import { computed, defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: true
    }
  },
  setup(props: any, context) {
    let { proxy }: any = getCurrentInstance()
    return {
      currentPage: computed({
        get() {
          return props.page
        },
        set(val) {
          context.emit('update:page', val)
        }
      }),
      pageSize: computed({
        get() {
          return props.limit
        },
        set(val) {
          context.emit('update:limit', val)
        }
      }),
      handleSizeChange(val: number) {
        context.emit('pagination', { page: proxy.currentPage, limit: val })
        if (proxy.autoScroll) {
          scrollTo(0, 800)
        }
      },
      handleCurrentChange(val: number) {
        context.emit('pagination', { page: val, limit: proxy.pageSize })
        if (proxy.autoScroll) {
          scrollTo(0, 800)
        }
      }
    }
  }
})
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 8px 0;
  margin: 10px 0;
}
.pagination-container.hidden {
  display: none;
}
.pagination-container.center {
  text-align: center !important;
}
.pagination-container.right {
  text-align: right;
}
</style>
