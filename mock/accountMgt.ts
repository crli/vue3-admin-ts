/*
 * @Author: crli
 * @Date: 2022-01-10 13:15:46
 * @LastEditors: crli
 * @LastEditTime: 2022-01-10 13:19:01
 * @Description: file content
 */
import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: `/manager/xxxx/queryAccountList`,
    method: 'post',
    response: () => {
      return {
        "flag":true,
        "status":'200',
        "message":"操作成功!",
        "result": {
          "list": [
            {
              "operatorId": null,
              "id": "e121e18a26554e7b9d8c5933f913fed9",
              "accountId": null,
              "loginType": null,
              "account": "app12345678",
              "password": null,
              "accountType": "0",
              "accountTypeName": "swsws",
              "accountName": "asdasd",
              "accountStatus": "0",
              "accountStatusName": "正常",
              "mobile": null,
              "email": "13542064572",
              "operatorName": null,
              "createdTime": {
                  "hour": 13,
                  "minute": 37,
                  "second": 27,
                  "nano": 0,
                  "dayOfYear": 196,
                  "dayOfWeek": "THURSDAY",
                  "month": "JULY",
                  "dayOfMonth": 15,
                  "year": 2021,
                  "monthValue": 7,
                  "chronology": {
                      "calendarType": "iso8601",
                      "id": "ISO"
                  }
              },
              "updatedTime": {
                  "hour": 9,
                  "minute": 10,
                  "second": 47,
                  "nano": 0,
                  "dayOfYear": 356,
                  "dayOfWeek": "WEDNESDAY",
                  "month": "DECEMBER",
                  "dayOfMonth": 22,
                  "year": 2021,
                  "monthValue": 12,
                  "chronology": {
                      "calendarType": "iso8601",
                      "id": "ISO"
                  }
              }
          },
          ],
          'total': 19
        }
      }
    }
  }
] as MockMethod[]