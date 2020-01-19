import React from "react"
import { Tree, Input } from "antd"
import { connect } from "dva"
import styles from "./index.less"

import {
  queryRule,
  updateRule,
  addRule,
  removeRule
} from "../ListTableList/service"

const { TreeNode } = Tree
const { Search } = Input

class SearchTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: "",
    autoExpandParent: true

    // treeData: [] // 存储树的数据
  }

  componentDidMount() {
    this.getTreeData(0)
  }

  // // 组装树状结构需要的数据
  // productTreeData = arr => {
  //   if (!Array.isArray(arr)) return
  //   return arr.map(item => {
  //     const { name, equipmentId } = item
  //     return {
  //       title: name,
  //       key: equipmentId,
  //       children: []
  //     }
  //   })
  // }

  // 查询设备数据
  getTreeData = id => {
    this.props.dispatch({
      type: "equipment/queryRule",
      payload: {
        parentId: id
      }
    })
    // queryRule({
    //   parentId
    // })
    //   .then(res => {
    //     if (res && Array.isArray(res.data)) {
    //       const tempData = this.state.treeData.slice(0)
    //       // 如果为0则为根节点
    //       if (parentId === 0) {
    //         this.setState({
    //           treeData: this.productTreeData(res.data)
    //         })
    //       } else {
    //         tempData.map(item => {
    //           if (String(item.key) === String(parentId)) {
    //             item.children = this.productTreeData(res.data)
    //           }
    //         })
    //         this.setState({
    //           treeData: tempData
    //         })
    //       }
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }

  onChange = e => {
    const { value } = e.target
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData)
        }

        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    })
  }

  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state
    const { treeDatas } = this.props.equipment
    const loop = data =>
      data.map(item => {
        const index = item.title.indexOf(searchValue)
        const beforeStr = item.title.substr(0, index)
        const afterStr = item.title.substr(index + searchValue.length)
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span
                style={{
                  color: "#f50"
                }}
              >
                {searchValue}
              </span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          )

        if (item.children) {
          return (
            <TreeNode key={item.key} title={title}>
              {loop(item.children)}
            </TreeNode>
          )
        }

        return <TreeNode key={item.key} title={title} />
      })
    return (
      <div>
        <Search
          style={{
            marginBottom: 8
          }}
          placeholder="Search"
          onChange={this.onChange}
        />
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={(selectedKeys, secondData) => {
            this.getTreeData((selectedKeys && selectedKeys[0]) || "")
          }}
        >
          {loop(treeDatas)}
        </Tree>
      </div>
    )
  }
}

const TreeSearch = props => {
  return (
    <div className={styles.container}>
      <div id="components-tree-demo-search">
        <SearchTree {...props} />
      </div>
    </div>
  )
}

export default connect(({ equipment, loading }) => {
  return {
    equipment: equipment
  }
})(TreeSearch)
