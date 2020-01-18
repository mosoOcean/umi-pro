/*
 * @Description: desc
 * @Author: zhanghaoyu004
 * @Date: 2020-01-08 11:40:36
 * @LastEditTime: 2020-01-18 09:46:51
 * @LastEditors: zhanghaoyu004
 */
import request from "@/utils/request"

export async function queryRule(params) {
  return request("/api/mock/20/equipment/getEquipments", {
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
  return request("/api/rule", {
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
