/*
 * @Description: desc
 * @Author: zhanghaoyu004
 * @Date: 2020-01-08 11:40:36
 * @LastEditTime : 2020-01-20 14:36:11
 * @LastEditors  : zhanghaoyu004
 */
import request from "@/utils/request"

// const mockPre = "/api/mock/20"
const mockPre = "/api/app"

// 设备新增
export async function queryRule(params) {
  return request(mockPre + "/equipment/getEquipments", {
    params
  })
}

// 设备更新
export async function updateRule(params) {
  return request(mockPre + "/equipment/updateEquipment", {
    method: "POST",
    data: { ...params }
  })
}

export async function removeRule(params) {
  return request(mockPre + "/equipment/updateEquipment", {
    method: "POST",
    data: { ...params, method: "delete" }
  })
}
export async function addRule(params) {
  return request(mockPre + "/equipment/insertEquipment", {
    method: "POST",
    data: { ...params, method: "post" }
  })
}

// 仪表查询接口
export async function quereMeter(params) {
  return request(mockPre + "/meter/getMeters", {
    params
  })
}

// 仪表新增
export async function insertMeter(params) {
  return request(mockPre + "/meter/insertMeter", {
    method: "POST",
    data: { ...params }
  })
}

// 仪表修改
export async function updateMeter(params) {
  return request(mockPre + "/meter/updateMeter", {
    method: "POST",
    data: { ...params }
  })
}
