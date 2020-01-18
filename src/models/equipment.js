/*
 * @Description: 设备管理model
 * @Author: zhanghaoyu004
 * @Date: 2020-01-18 10:16:35
 * @LastEditTime : 2020-01-18 11:07:16
 * @LastEditors  : zhanghaoyu004
 */
import { queryRule } from "@/pages/equipment/ListTableList/service"
const EquipmentModel = {
  namespace: "equipment",
  state: {
    currentLevel: 0, // 当前层级
    currentId: 0, // 当前树节点ID
    tableDatas: {
      // 当前节点ID查出来的table数据
    }
  },
  effects: {
    *queryRule(_, { call, put }) {
      const response = yield call(queryRule)
      yield put({
        type: "saveTableDatas",
        payload: response
      })
    }
  },
  reducers: {
    saveTableDatas(state, action) {
      return { ...state, tableDatas: action.payload || {} }
    }
  }
}
export default EquipmentModel
