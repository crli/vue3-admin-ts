<!--
 * @Author: crli
 * @Date: 2021-12-15 11:02:20
 * @LastEditors: crli
 * @LastEditTime: 2022-01-10 09:51:03
 * @Description: file content
-->
<template>
  <el-dialog
    :title="(id ? '编辑' : '添加') + '账户'"
    @open="open"
    v-model="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="form" :model="state.ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="账号类型" prop="accountType">
        <el-select
          size="small"
          v-model="state.ruleForm.accountType"
          placeholder="请选择类型"
        >
          <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账户名" prop="accountName">
        <el-input
          v-model="state.ruleForm.accountName"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="state.ruleForm.account" placeholder="请输入内容" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="state.ruleForm.password" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="state.ruleForm.confirmPassword" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="state.ruleForm.mobile" placeholder="请输入内容" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="state.ruleForm.email" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
//相关引入
import { reactive, getCurrentInstance, ref } from 'vue'
import { addAccount, queryAccountDetail, modifyAccount } from '@/api/accountMgt'
import { isPhoneNum, isEmail } from 'crliutils'
import { ElMessage } from 'element-plus'
import { ObjTy, ValidatorTy } from '@/types/common'
let { proxy }: any = getCurrentInstance()
//响应式数据、props、emit 定义
let visible = ref(false)
let state: ObjTy = reactive({
  ruleForm: {
    accountType: null,
    account: '',
    accountName: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    email: ''
  }
})
let typeList = [
  {
    name: 'AAA',
    id: '0'
  },
  {
    name: 'BBB',
    id: '1'
  },
  {
    name: 'CCC',
    id: '2'
  }
]

const validatemobile: ValidatorTy = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入内容'))
  } else if (!isPhoneNum(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}
const validateemail: ValidatorTy = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入内容'))
  } else if (!isEmail(value)) {
    callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}
const validateconfirmPassword: ValidatorTy = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入内容'))
  } else if (value !== state.ruleForm.password) {
    callback(new Error('密码不相同'))
  } else {
    callback()
  }
}
const validateaccount: ValidatorTy = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入内容'))
  } else if (!/^[a-zA-Z]\w{7,15}$/.test(value)) {
    callback(new Error('账号是8-15位字母、数字或下划线组合，必须字母开头'))
  } else {
    callback()
  }
}
const validatePassword: ValidatorTy = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入内容'))
  } else if (!/^(?![A-z0-9]+$)(?=.[^%&',;=?$\x22])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$/.test(value)) {
    callback(new Error('密码必须同时包含大小写字母、数字、特殊字符，8-20位'))
  } else {
    callback()
  }
}

let rules = {
  accountType: [
    {
      required: true,
      message: '请输入内容',
      trigger: 'change'
    }
  ],
  account: [
    {
      required: true,
      validator: validateaccount,
      trigger: 'blur'
    }
  ],
  accountName: [
    {
      required: true,
      message: '请输入内容',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      validator: validatePassword,
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    {
      required: true,
      validator: validateconfirmPassword,
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      required: true,
      validator: validatemobile,
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      validator: validateemail,
      trigger: 'blur'
    }
  ]
}
const props = defineProps({
  id: {
    type: String
  }
})
const emits = defineEmits(['close'])
let open = () => {
  console.log(new Date().getTime())
  if (props.id) {
    queryAccountDetail({
      entity: {
        accountId: props.id
      }
    }).then((res: ObjTy) => {
      console.log(new Date().getTime())
      state.ruleForm = Object.assign(state.ruleForm, res.result)
    })
  }
}
let cancel = () => {
  clearForm()
  visible.value = false
}
let clearForm = () => {
  state.ruleForm = Object.assign(state.ruleForm, {
    accountType: null,
    account: '',
    accountName: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    email: ''
  })
  proxy.$refs['form'].resetFields()
}
let submitForm = (formName: string) => {
  proxy.$refs[formName].validate((valid: boolean) => {
    if (valid) {
      let func = addAccount
      let txt = '添加'
      let params = {
        entity: state.ruleForm
      }
      if (props.id) {
        func = modifyAccount
        txt = '修改'
        params = {
          entity: {
            accountId: state.ruleForm.accountId,
            account: state.ruleForm.account,
            accountName: state.ruleForm.accountName,
            mobile: state.ruleForm.mobile,
            email: state.ruleForm.email
          }
        }
      }
      func(params).then((res: ObjTy) => {
        if (res.status === '200') {
          ElMessage({ message: `${txt}成功`, type: 'success' })
          cancel()
          emits('close')
        }
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
defineExpose({ visible })
</script>

<style lang="scss" scoped></style>
