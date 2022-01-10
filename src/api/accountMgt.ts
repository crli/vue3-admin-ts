/*
 * @Author: crli
 * @Date: 2021-12-20 15:56:29
 * @LastEditors: crli
 * @LastEditTime: 2022-01-10 11:24:28
 * @Description: file content
 */
import request from '@/utils/axiosReq'
import { ObjTy } from '@/types/common'

export function queryAccountList(data: ObjTy) {
  return request({
    url: `${import.meta.env.VITE_APP_BASE_URL}/xxxx/queryAccountList`,
    method: 'post',
    data
  })
}

export function addAccount(data: ObjTy) {
  return request({
    url: `${import.meta.env.VITE_APP_BASE_URL}/xxxx/addAccount`,
    method: 'post',
    data
  })
}

export function queryAccountDetail(data: ObjTy) {
  return request({
    url: `${import.meta.env.VITE_APP_BASE_URL}/xxxx/queryAccountDetail`,
    method: 'post',
    data
  })
}

export function modifyAccount(data: ObjTy) {
  return request({
    url: `${import.meta.env.VITE_APP_BASE_URL}/xxxx/modifyAccount`,
    method: 'post',
    data
  })
}


export function deleteAccount(data: ObjTy) {
  return request({
    url: `${import.meta.env.VITE_APP_BASE_URL}/xxxx/deleteAccount`,
    method: 'post',
    data
  })
}
