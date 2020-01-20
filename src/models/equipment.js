/*
 * @Description: 设备管理model
 * @Author: zhanghaoyu004
 * @Date: 2020-01-18 10:16:35
 * @LastEditTime : 2020-01-20 11:43:04
 * @LastEditors  : zhanghaoyu004
 */
import { queryRule } from "@/pages/equipment/ListTableList/service"

// 组装树状结构需要的数据
const productTreeData = arr => {
  if (!Array.isArray(arr)) return
  return arr.map(item => {
    const { name, equipmentId } = item
    return {
      title: name,
      key: equipmentId,
      children: []
    }
  })
}

const EquipmentModel = {
  namespace: "equipment",
  state: {
    currentId: 0, // 当前树节点ID
    tableDatas: [], // 当前节点ID查出来的table数据
    treeDatas: []
  },
  effects: {
    *queryRule({ payload }, { call, put, select }) {
      const response = yield call(queryRule, payload)
      console.log("发送设备查询请求")
      yield put({ type: "setCurrentId", payload: payload.parentId })
      if (!response || !response.data) return

      const resData = response.data
      yield put({
        type: "saveTableDatas",
        payload: resData || []
      })
      if (Array.isArray(resData) && resData.length > 0) {
        const { parentId } = payload
        const state = yield select(state => state)
        // 遍历去除树结构的数据，防止因为对象的引用指向导致的直接改变state中的数据
        const tempData = []
        state.equipment.treeDatas.forEach(item => {
          const obj = Object.assign({}, item)
          tempData.push(obj)
        })
        // 如果为0则为根节点
        if (parentId === 0) {
          yield put({
            type: "saveTreeDatas",
            payload: productTreeData(resData)
          })
        } else {
          const setChildren = (arr, id, childrenData) => {
            if (!Array.isArray(arr)) return
            arr.map(item => {
              if (String(item.key) === String(id)) {
                item.children = productTreeData(childrenData)
              } else if (
                Array.isArray(item.children) &&
                item.children.length > 0
              ) {
                setChildren(item.children, id, childrenData)
              }
            })
            return arr
          }
          setChildren(tempData, parentId, resData)
          yield put({
            type: "saveTreeDatas",
            payload: tempData
          })
        }
      }
    }
  },
  reducers: {
    saveTableDatas(state, action) {
      return { ...state, tableDatas: action.payload || [] }
    },
    // 保存树结构的数据
    saveTreeDatas(state, action) {
      return { ...state, treeDatas: action.payload || [] }
    },
    setCurrentId(state, action) {
      return { ...state, currentId: action.payload }
    }
  }
}
export default EquipmentModel
