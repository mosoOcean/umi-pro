
import request from "@/utils/request"

 const mockPre = "/api/mock/20"
//const mockPre = "/api/app"

// 查询仪表数据
export async function getMonitorInfoList(params) {
  console.log(params)
  return request(mockPre + "/monitor/getMonitorInfoList", {
    method: "POST",
    data: { ...params }
  })
}

