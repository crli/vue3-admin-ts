<!--
 * @Author: crli
 * @Date: 2021-10-15 09:27:35
 * @LastEditors: crli
 * @LastEditTime: 2021-10-15 09:27:36
 * @Description: 账号管理
-->
<template>
  <div class="container">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <el-form :inline="true" :model="form">
            <el-row :gutter="10">
              <el-col :md="6" :xs="24" :offset="0">
                <el-form-item label="账户名：">
                  <el-input size="small" v-model="form.accountName" placeholder="请输入账户名" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="6" :xs="24" :offset="0">
                <el-form-item label="账号：">
                  <el-input size="small" v-model="form.accountNum" placeholder="请输入账号" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="6" :xs="24" :offset="0">
                <el-form-item label="类型：">
                  <el-select size="small" clearable v-model="form.userType" placeholder="请选择类型">
                    <el-option v-for="item in types" :key="item.key" :label="item.value" :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :xs="24" :offset="0">
                <el-form-item>
                  <el-button size="small" type="primary" @click="getList">查询</el-button>
                  <el-button size="small" type="primary" @click="addAccount">添加账号</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="accountName" label="账户名" width="180"></el-table-column>
          <el-table-column prop="accountNum" label="账号" width="180"></el-table-column>
          <el-table-column label="状态" width="180">
            <template #default="scope">
              <div class="name-wrapper">
                <el-tag v-if="scope.row.state === '1'" type="success" size="medium">正常</el-tag>
                <el-tag v-else type="danger" size="medium">锁定</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="180"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="lastTime" label="最后操作时间" width="180"></el-table-column>
          <el-table-column prop="user" label="操作人" width="180"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" plain size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" plain size="small" @click="handleDelete(scope.$index, scope.row)">
                删除
              </el-button>
              <el-button type="primary" plain size="small" @click="lock(scope.row)">锁定</el-button>
              <el-button type="primary" plain size="small" @click="resetPassword(scope.row)">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <add-or-edit></add-or-edit>
    </el-card>
  </div>
</template>

<script lang="ts">
import { onMounted, getCurrentInstance, watch, ref, toRefs, reactive, computed, defineComponent } from 'vue'
import addOrEdit from '@/views/accountMgt/addOrEdit'
import { ElMessageBox, ElMessage } from 'element-plus'
export default defineComponent({
  name: 'index',
  components: {
    addOrEdit
  },
  setup() {
    // 查询
    let getList = () => {}
    // 添加账号
    let addAccount = () => {
      alert('添加账号')
    }
    let total = ref(100)
    // 编辑
    let handleEdit = () => {}
    // 删除
    let handleDelete = () => {
      ElMessageBox.confirm('确认要删除当前数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消'
          })
        })
    }
    // 锁定
    let lock = () => {
      ElMessageBox.confirm('是否要锁定该账户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 修改状态 正常-锁定
          ElMessage({
            type: 'success',
            message: '锁定成功'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消'
          })
        })
    }
    // 重置密码
    let resetPassword = () => {}
    let data = reactive({
      form: {
        accountName: '',
        accountNum: '',
        userType: ''
      },
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      types: [
        {
          key: '1',
          value: '全部'
        },
        {
          key: '2',
          value: '平台管理员'
        },
        {
          key: '3',
          value: '租户管理员'
        },
        {
          key: '4',
          value: '对接账号'
        }
      ],
      tableData: [
        {
          accountName: '张三',
          accountNum: 'zhangsan',
          state: '1',
          type: '平台管理员',
          createTime: '2020-01-02 12:00:10',
          lastTime: '2020-01-02 12:00:10',
          user: '管理员'
        },
        {
          accountName: '张三',
          accountNum: 'zhangsan',
          state: '0',
          type: '平台管理员',
          createTime: '2020-01-02 12:00:10',
          lastTime: '2020-01-02 12:00:10',
          user: '管理员'
        },
        {
          accountName: '张三',
          accountNum: 'zhangsan',
          state: '0',
          type: '平台管理员',
          createTime: '2020-01-02 12:00:10',
          lastTime: '2020-01-02 12:00:10',
          user: '管理员'
        }
      ]
    })
    onMounted(() => {})
    return {
      ...toRefs(data),
      total,
      getList,
      addAccount,
      handleEdit,
      handleDelete,
      lock,
      resetPassword
    }
  }
})
//获取store和router
// import {useRouter} from 'vue-router'
// import {useStore} from 'vuex'
//let { proxy } = getCurrentInstance()
// const props = defineProps({
//   name: {
//     require: true,
//     default: "fai",
//     type:String,
//   },
// });
// const state = reactive({
//   levelList: null
// });

// const routes = computed(() => {
//    return proxy.$store.state.permission.routes;
//  });
// watch(() => props.name, (oldValue,newValue) => {
//
//   },
//   { immediate: true }
// );

// const store = useStore()
// const router = useRouter()
// onMounted(()=>{
//   console.log("页面挂载了")
// })
// let helloFunc = () => {
//   console.log("helloFunc");
// };
//导出给refs使用
// defineExpose({ helloFunc });
//导出属性到页面中使用
// let {levelList} = toRefs(state);
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
}
.el-row {
  margin-top: 10px;
}
.box-card {
  height: calc(100vh - 150px);
  overflow: auto;
}
</style>
