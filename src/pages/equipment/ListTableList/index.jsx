import { Button, Divider, Form, Table } from "antd"
import React, { useState, useEffect, Fragment } from "react"
import Equipment from "./components/equipmentModal"
import { connect } from "dva"
import moment from "moment"

import styles from "./index.less"

const TableList = props => {
  const [isNew, setIsNew] = useState(false)
  const [updateModalVisible, handleUpdateModalVisible] = useState(false)
  const [stepFormValues, setStepFormValues] = useState({})

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
      <div>
        <Button
          className={styles["new-button"]}
          type="primary"
          onClick={() => {
            handleUpdateModalVisible(true)
            setIsNew(true)
          }}
        >
          新建设备
        </Button>
      </div>
      <h1 className={styles.title}>设备列表</h1>
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={eTableData}
      ></Table>

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
