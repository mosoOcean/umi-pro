/*
 * @Description: desc
 * @Author: zhanghaoyu004
 * @Date: 2020-01-08 11:40:36
 * @LastEditTime : 2020-01-19 23:03:45
 * @LastEditors  : zhanghaoyu004
 */
import request from "@/utils/request"

// const mockPre = "/api/mock/20"
const mockPre = "/api/app"

export async function queryRule(params) {
  return request(mockPre + "/equipment/getEquipments", {
    params
  })
}
export async function removeRule(params) {
  return request("/api/rule", {
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
export async function updateRule(params) {
  return request("/api/rule", {
    method: "POST",
    data: { ...params, method: "update" }
  })
}
