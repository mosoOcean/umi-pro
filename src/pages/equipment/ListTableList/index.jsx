import { Button, Divider, Form, Table, Modal, message } from "antd"
import React, { useState, useEffect, Fragment } from "react"
import Equipment from "./components/equipmentModal"
import MeterTable from "./components/meterModal"
import { connect } from "dva"
import moment from "moment"
import { quereMeter, updateRule } from "./service"

import styles from "./index.less"

const TableList = props => {
  const [isNew, setIsNew] = useState(false)
  const [updateModalVisible, handleUpdateModalVisible] = useState(false)
  const [stepFormValues, setStepFormValues] = useState({})

  const [meterShow, setMeterShow] = useState(false)
  const [meterData, setMeterData] = useState([])

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
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              Modal.confirm({
                title: "确定删除此设备数据？",
                onOk: () => {
                  updateRule({ workStatue: 1, equipmentId: record.equipmentId })
                    .then(res => {
                      if (res && res.success) {
                        message.success("删除设备成功")
                        props.dispatch({
                          type: "equipment/queryRule",
                          payload: {
                            parentId: record.equipmentId
                          }
                        })
                      } else {
                        message.error("删除设备失败")
                      }
                    })
                    .catch(err => {
                      console.error(err)
                    })
                }
              })
            }}
          >
            删除
          </a>
          {record.lastEquipment ? (
            <Fragment>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  setMeterShow(true)
                  setStepFormValues(record)
                  quereMeterFunc(record.equipmentId)
                }}
              >
                查看仪表
              </a>
            </Fragment>
          ) : null}
        </Fragment>
      )
    }
  ]

  // 仪表查询方法
  const quereMeterFunc = id => {
    quereMeter({ equipmentId: id })
      .then(res => {
        if (res && res.data) {
          setMeterData(res.data)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  const { equipment = {} } = props

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

      <Equipment
        title="设备详情"
        visible={updateModalVisible}
        detailValues={stepFormValues}
        closeModal={handleUpdateModalVisible}
        isNew={isNew}
      ></Equipment>
      <MeterTable
        isShow={meterShow}
        closeModal={setMeterShow}
        detailValues={stepFormValues}
        data={meterData}
        setData={quereMeterFunc}
      ></MeterTable>
    </div>
  )
}

export default connect(({ equipment, loading }) => {
  return {
    equipment: equipment,
    submitting: loading.effects["login/login"]
  }
})(Form.create()(TableList))
