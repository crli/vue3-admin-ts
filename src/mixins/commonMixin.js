/*
 * @Author: crli
 * @Date: 2021-10-13 15:50:47
 * @LastEditors: crli
 * @LastEditTime: 2021-12-21 15:28:47
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
    },
    timeformat(obj) {
      let m = obj.monthValue > 9 ? '' + obj.monthValue : '0' + obj.monthValue
      let d = obj.dayOfMonth > 9 ? '' + obj.dayOfMonth : '0' + obj.dayOfMonth
      let hour = obj.hour > 9 ? '' + obj.hour : '0' + obj.hour
      let minute = obj.minute > 9 ? '' + obj.minute : '0' + obj.minute
      let second = obj.second > 9 ? '' + obj.second : '0' + obj.second
      return obj.year + '-' + m + '-' + d + ' ' + hour + ':' + minute + ':' + second
    }
  }
}

export default mixin
