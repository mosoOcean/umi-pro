/*
 * @Description: 仪表模态框
 * @Author: zhanghaoyu004
 * @Date: 2020-01-19 16:09:21
 * @LastEditTime : 2020-01-21 10:31:29
 * @LastEditors  : zhanghaoyu004
 */
import React, { useState, useEffect, Fragment } from "react"
import { Modal, Button, Table, message, Select, Divider } from "antd"
import { connect } from "dva"
import moment from "moment"
import { updateMeter } from "../service"

import NewMeter from "./newMeter"
import styles from "./meterModal.less"

export default connect(({ equipment }) => {
  return {
    equipment: equipment
  }
})(function(props) {
  const [isNew, setIsNew] = useState(true)
  const [newMeter, setNewMeter] = useState(false)
  const [columnData, setColumnData] = useState([])
  const handleCancel = () => {
    props.closeModal(false)
  }

  const handleOk = () => {
    props.closeModal(false)
  }
  const columns = [
    {
      dataIndex: "meterId",
      title: "仪表id"
    },
    {
      dataIndex: "name",
      title: "仪表名称"
    },
    {
      dataIndex: "equipmentId",
      title: "关联的设备id"
    },
    {
      dataIndex: "ip",
      title: "ip"
    },
    {
      dataIndex: "modbusAdds",
      title: "modbus地址"
    },
    {
      dataIndex: "desc",
      title: "仪表详情"
    },
    {
      dataIndex: "workStatue",
      title: "仪表工作状态",
      render(text) {
        return text === 0 ? "使用中" : "废弃"
      }
    },
    {
      dataIndex: "createTime",
      title: "创建时间",
      render(text) {
        return moment(text).format("YYYY-MM-DD HH:mm:ss")
      }
    },
    {
      dataIndex: "action",
      title: "操作",
      render(text, record) {
        return (
          <Fragment>
            <a
              onClick={() => {
                setNewMeter(true)
                setIsNew(false)
                setColumnData(record)
              }}
            >
              修改
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                Modal.confirm({
                  title: "确定删除此仪表数据？",
                  onOk: () => {
                    updateMeter({ workStatue: 1, meterId: record.meterId })
                      .then(res => {
                        if (res && res.success) {
                          message.success("删除仪表成功")
                          props.setData(record.equipmentId)
                        } else {
                          message.error("删除仪表失败")
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
          </Fragment>
        )
      }
    }
  ]
  console.log("props.dataprops.data", props.data)
  return (
    <Fragment>
      <Modal
        title="设备关联的仪表"
        visible={props.isShow}
        onOk={() => handleOk(parentId)}
        onCancel={handleCancel}
        width={800}
      >
        <div>
          <Button
            className={styles["new-meter"]}
            type="primary"
            onClick={() => {
              setNewMeter(true)
              setIsNew(true)
            }}
          >
            新增仪表
          </Button>
        </div>
        <Table
          columns={columns}
          scroll={{ x: true }}
          dataSource={props.data}
        ></Table>
      </Modal>

      <NewMeter
        title="仪表详情"
        visible={newMeter}
        equipmentId={props.detailValues.equipmentId}
        detailValues={columnData}
        closeModal={setNewMeter}
        isNew={isNew}
        setData={props.setData}
      ></NewMeter>
    </Fragment>
  )
})
