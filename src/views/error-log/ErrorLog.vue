<template>
  <!--操作-->

  <div class="mr-3 rowSS">
    <el-button type="primary" @click="errorLogProd">错误日志测试</el-button>
    <el-button type="primary" icon="el-icon-delete" @click="multiDelBtnClick">删除</el-button>
    <!--条件搜索-->
    <el-form ref="reflistQuery" :inline="true" class="demo-listQuery ml-2">
      <el-form-item label-width="0px" label="" prop="errorLog" label-position="left">
        <el-input v-model="listQuery.errorLog" class="widthPx-150" placeholder="错误日志" />
      </el-form-item>
      <el-form-item label-width="0px" label="" prop="pageUrl" label-position="left">
        <el-input v-model="listQuery.pageUrl" class="widthPx-150" placeholder="页面路径" />
      </el-form-item>
      <el-form-item label-width="0px" label="" prop="createTime" label-position="left">
        <el-date-picker
          v-model="startEndArrMixin"
          type="datetimerange"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD HH:mm:ss"
          @change="dateTimePacking"
          class="widthPx-250"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <!--查询按钮-->
      <el-button @click="searchBtnClick">查询</el-button>
    </el-form>
  </div>
  <!--表格和分页-->
  <el-table
    id="resetElementDialog"
    ref="refuserTable"
    size="mini"
    border
    @selection-change="handleSelectionChange"
    :data="usertableData"
  >
    <el-table-column type="selection" align="center" width="50" />
    <el-table-column align="center" prop="errorLog" label="错误日志" min-width="300" />
    <el-table-column align="center" prop="pageUrl" label="页面路径" width="180" />
    <el-table-column align="center" prop="createTime" label="创建时间" width="140" />
    <!--    <el-table-column align="center" prop="id" label="id主键" min-width="100" />-->
    <!--点击操作-->
    <el-table-column fixed="right" align="center" label="操作" width="80">
      <template #default="{ row }">
        <!--        <el-button type="text" size="small" @click="tableEditClick(row)">编辑</el-button>-->
        <!--        <el-button type="text" size="small" @click="tableDetailClick(row)">详情</el-button>-->
        <el-button type="text" size="small" @click="tableDelClick(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--分页-->
  <div class="block columnCC mt-2 mb-5">
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="listQuery.pageNum"
      v-model:limit="listQuery.pageSize"
      :auto-scroll="false"
      @pagination="getList"
    />
  </div>
  <!--详情-->
  <el-dialog
    v-if="detailDialogMixin"
    :title="111"
    v-model="detailDialogMixin"
    width="40vw"
    :close-on-click-modal="false"
  >
    <div class="detail-container rowBC elODialogModalBodyH60vh">
      <div class="detail-container-item">DBC文件名：{{ detailData.username }}</div>
    </div>
    <div class="detail-container rowBC elODialogModalBodyH60vh">
      <div class="detail-container-item" style="color: green" v-if="detailData.status === 1">状态： 启用</div>
      <div class="detail-container-item" v-else>状态： 停用</div>
    </div>
    <div class="detail-container rowBC elODialogModalBodyH60vh">
      <div class="detail-container-item">说明：{{ detailData.remark }}</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="detailDialogMixin = false">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import bus from '@/utils/bus'
import { onMounted, getCurrentInstance, ref, reactive } from 'vue'
import Pagination from '@/components/Pagination'
import { ObjTy } from '@/types/common'
let { proxy }: any = getCurrentInstance()
{
  Pagination
}
/*
 * 一般根据页面层次来排序 如此页面 表格查询和筛选->table的操作
 * 每个模块按：响应数据定义->公用方法->请求方法->页面按钮操作方法 进行排序
 * */

let errorLogProd = () => {
  throw new Error('产生的错误日志')
}
/*表格查询和筛选*/
let usertableData = ref([])
let listQuery: ObjTy = reactive({
  errorLog: '',
  pageUrl: '',
  createTime: '',
  id: '',
  pageNum: 1,
  pageSize: 10
})
let startEndArrMixin = reactive([new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)])
let detailDialogMixin = ref(false)
let total = ref(100)
let getList = () => {
  Object.keys(listQuery).forEach((fItem) => {
    if (listQuery[fItem] === '' || listQuery[fItem] === null || listQuery[fItem] === undefined) delete listQuery[fItem]
  })
  let reqConfig = {
    url: '/ty-user/errorCollection/selectPage',
    method: 'get',
    data: listQuery,
    isParams: true,
    isAlertErrorMsg: false
  }
  proxy.$axiosReq(reqConfig).then((resData: ObjTy) => {
    usertableData.value = resData.data?.records
    proxy.total = resData.data?.total
  })
}
const dateTimePacking = (timeArr: Array<string>) => {
  if (timeArr && timeArr.length === 2) {
    listQuery.startTime = timeArr[0]
    listQuery.endTime = timeArr[1]
  } else {
    listQuery.startTime = ''
    listQuery.endTime = ''
  }
}
onMounted(() => {
  getList()
  bus.on('reloadErrorPage', () => {
    getList()
  })
})
const searchBtnClick = () => {
  listQuery.pageNum = 1
  getList()
}
// const handleCurrentChange = (val) => {
//   listQuery.pageNum = val
//   getList()
// }
// const handleSizeChange = (val) => {
//   listQuery.pageSize = val
//   getList()
// }
/*添加和修改*/
/*详情*/
let detailData = ref({})

/*删除*/
let deleteByIdReq = (id: string) => {
  return proxy.$axiosReq({
    url: '/ty-user/errorCollection/deleteById',
    data: { id: id },
    isParams: true,
    method: 'delete',
    bfLoading: true
  })
}
let tableDelClick = async (row: ObjTy) => {
  await proxy.elConfirmMixin('确定', `您确定要删除【${row.pageUrl}】吗？`)
  deleteByIdReq(row.id).then(() => {
    getList()
    proxy.elMessageMixin(`【${row.pageUrl}】删除成功`)
  })
}

/*批量删除*/
let multipleSelection = ref([])
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
}
const multiDelBtnClick = async () => {
  let rowDeleteIdArrMixin = []
  // let selectionArr = proxy.$refs.refuserTable //--c
  let deleteNameTitle = ''
  rowDeleteIdArrMixin = multipleSelection.value.map((mItem: ObjTy) => {
    deleteNameTitle = deleteNameTitle + mItem.pageUrl + ','
    return mItem.id
  })
  if (rowDeleteIdArrMixin.length === 0) {
    proxy.elMessageMixin('表格选项不能为空', 'warning')
    return
  }
  let stringLength = deleteNameTitle.length - 1
  await proxy.elConfirmMixin('删除', `您确定要删除【${deleteNameTitle.slice(0, stringLength)}】吗`)
  const data = rowDeleteIdArrMixin
  proxy
    .$axiosReq({
      url: `/ty-user/errorCollection/deleteBatchIds`,
      data,
      method: 'DELETE',
      bfLoading: true
    })
    .then(() => {
      getList()
      proxy.elMessageMixin('删除成功')
    })
}
</script>

<style scoped lang="scss">
/*详情*/
.detail-container {
  flex-wrap: wrap;
}

.detail-container-item {
  min-width: 40%;
  margin-bottom: 20px;
}

.detailDialog-title {
  margin-bottom: 14px;
  font-weight: bold;
  font-size: 16px;
}
</style>
