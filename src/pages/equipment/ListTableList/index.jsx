import { Button, Divider, Dropdown, Form, Icon, Menu, message } from "antd"
import React, { useState, useRef, useEffect, Fragment } from "react"
import ProTable from "@ant-design/pro-table"
import CreateForm from "./components/CreateForm"
import UpdateForm from "./components/UpdateForm"
import Equipment from "./components/equipmentModal"
import { queryRule, updateRule, addRule, removeRule } from "./service"
import { connect } from "dva"
import moment from "moment"

import "./index.less"

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {
  const hide = message.loading("正在添加")

  try {
    await addRule({
      desc: fields.desc
    })
    hide()
    message.success("添加成功")
    return true
  } catch (error) {
    hide()
    message.error("添加失败请重试！")
    return false
  }
}
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {
  const hide = message.loading("正在配置")

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key
    })
    hide()
    message.success("配置成功")
    return true
  } catch (error) {
    hide()
    message.error("配置失败请重试！")
    return false
  }
}
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
  const hide = message.loading("正在删除")
  if (!selectedRows) return true

  try {
    await removeRule({
      key: selectedRows.map(row => row.key)
    })
    hide()
    message.success("删除成功，即将刷新")
    return true
  } catch (error) {
    hide()
    message.error("删除失败，请重试")
    return false
  }
}

const TableList = props => {
  const [isNew, setIsNew] = useState(false)
  const [updateModalVisible, handleUpdateModalVisible] = useState(false)
  const [stepFormValues, setStepFormValues] = useState({})
  const actionRef = useRef()

  const columns = [
    {
      title: "序号",
      dataIndex: "equipmentId"
    },
    {
      title: "设备编码",
      dataIndex: "equipmentCode"
    },
    {
      title: "父设备",
      dataIndex: "parentId"
    },
    {
      title: "设备名称",
      dataIndex: "name"
    },
    {
      title: "工作状态",
      dataIndex: "workStatue",
      render(text) {
        return text === 1 ? "使用中" : "废弃"
      }
    },
    {
      title: "设备详情",
      dataIndex: "desc"
    },
    {
      title: "设备地址",
      dataIndex: "address"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render(text) {
        return moment(text).format("YYYY-MM-DD HH:mm:ss")
      }
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => (
        <Fragment>
          <a
            onClick={() => {
              handleUpdateModalVisible(true)
              setStepFormValues(record)
              setIsNew(false)
            }}
          >
            配置
          </a>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </Fragment>
      )
    }
  ]

  const { equipment = {} } = props
  console.log("equipment.tableDatas", equipment.tableDatas)

  const [eTableData, setETableData] = useState(equipment.tableDatas)

  useEffect(() => {
    setETableData(equipment.tableDatas)
  }, [equipment.tableDatas])
  return (
    <div>
      <ProTable
        headerTitle="设备表格"
        scroll={{ x: true }}
        actionRef={actionRef}
        rowKey="equipmentCode"
        search={false}
        toolBarRender={(action, { selectedRows }) => [
          <Button
            icon="plus"
            type="primary"
            onClick={() => {
              handleUpdateModalVisible(true)
              setIsNew(true)
            }}
          >
            新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === "remove") {
                      await handleRemove(selectedRows)
                      action.reload()
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <Icon type="down" />
              </Button>
            </Dropdown>
          )
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择{" "}
            <a
              style={{
                fontWeight: 600
              }}
            >
              {selectedRowKeys.length}
            </a>{" "}
            项
          </div>
        )}
        dataSource={eTableData}
        columns={columns}
        rowSelection={{}}
      />
      {
        // 模态框
        <Equipment
          title="设备详情"
          visible={updateModalVisible}
          detailValues={stepFormValues}
          closeModal={handleUpdateModalVisible}
          isNew={isNew}
        ></Equipment>
      }
    </div>
  )
}

export default connect(({ equipment, loading }) => {
  return {
    equipment: equipment,
    submitting: loading.effects["login/login"]
  }
})(Form.create()(TableList))
