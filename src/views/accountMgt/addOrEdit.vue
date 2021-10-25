<template>
  <div>
    <el-button type="text" @click="dialogFormVisible = true">打开对话框</el-button>
    <el-dialog v-model="dialogFormVisible" title="添加">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="账号类型" :label-width="formLabelWidth">
          <el-input v-model="form.accountType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户名" :label-width="formLabelWidth">
          <el-select v-model="form.name" placeholder="Please select">
            <el-option label="Zone No.1" value="shanghai"></el-option>
            <el-option label="Zone No.2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属租户" :label-width="formLabelWidth">
          <el-input v-model="form.tenant" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="环境" :label-width="formLabelWidth">
          <el-input v-model="form.environment" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="应用" :label-width="formLabelWidth">
          <el-input v-model="form.application" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="form.confirmPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { toRefs, reactive, defineComponent } from 'vue'
export default defineComponent({
  setup() {
    let aa = reactive({
      dialogFormVisible: false,
      form: {
        accountType: '',
        name: '',
        tenant: '',
        environment: '',
        application: '',
        account: '',
        password: '',
        confirmPassword: '',
        phone: '',
        email: ''
      },
      rules: {
        accountType: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: 'Length should be 3 to 5',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change'
          }
        ],
        tenant: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
          }
        ],
        environment: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
          }
        ],
        application: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
          }
        ],
        account: [
          {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please input activity form',
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
          }
        ]
      },
      formLabelWidth: '120px'
    })
    return {
      ...toRefs(aa)
    }
  }
})
// let store = useStore()
// const username = computed(() => {
//   return store.state.user.username
// })
</script>

<style lang="scss" scoped></style>
