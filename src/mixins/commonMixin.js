/*
 * @Author: crli
 * @Date: 2021-10-13 15:50:47
 * @LastEditors: crli
 * @LastEditTime: 2021-10-15 10:56:00
 * @Description: file content
 */
import { getToken } from '@/utils/auth'
const mixin = {
  data() {
    return {
      VITE_APP_BASE_URL: '', // 请求的url地址
      accessTokenMixin: '' // 请求头的token
    }
  },
  created() {
    // 读取.env 多坏境里的数据
    this.VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL
    // 获取token和个人基本信息
    this.accessTokenMixin = getToken()
  },
  methods: {
    sleepMixin(time) {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          clearTimeout(timer)
          resolve()
        }, time)
      })
    }
  }
}

export default mixin
