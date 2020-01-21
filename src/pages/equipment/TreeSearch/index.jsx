import React from "react"
import { Tree, Input } from "antd"
import { connect } from "dva"
import styles from "./index.less"

const { TreeNode } = Tree
const { Search } = Input

const getParentKey = (key, tree) => {
  let parentKey

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]

    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }

  return parentKey
}

class SearchTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: "",
    autoExpandParent: true
  }

  componentDidMount() {
    this.getTreeData(0)
  }

  // 查询设备数据
  getTreeData = id => {
    this.props.dispatch({
      type: "equipment/queryRule",
      payload: {
        parentId: id
      }
    })
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }

  onChange = e => {
    const { value } = e.target

    const dataList = []
    const generateList = data => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const { title, key } = node
        dataList.push({ key, title })
        if (node.children) {
          generateList(node.children)
        }
      }
    }
    // 获取所有节点信息
    generateList(this.props.equipment.treeDatas || [])
    //查找现在的所有节点哪里有搜索区输入的内容，如果匹配到了并且有children，则返回该节点key值
    const expandedKeys = dataList
      .map(item => {
        if (String(item.title).indexOf(value) > -1) {
          return getParentKey(item.key, this.props.equipment.treeDatas)
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
            selectedKeys[0] && this.getTreeData(selectedKeys[0])
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
