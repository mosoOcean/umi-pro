/*
 * @Description: 新增仪表
 * @Author: zhanghaoyu004
 * @Date: 2020-01-19 16:09:21
 * @LastEditTime : 2020-01-20 15:27:48
 * @LastEditors  : zhanghaoyu004
 */
import React, { useState, useEffect } from "react"
import { Modal, Form, Input, message, Select } from "antd"
import { connect } from "dva"
import { insertMeter, updateMeter } from "../service"

const FormItem = Form.Item

export default connect(({ equipment }) => {
  return {
    equipment: equipment
  }
})(
  Form.create()(function(props) {
    const formLayout = {
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 13
      }
    }

    const handleOk = (equipmentId, meterId, e) => {
      const tempId = props.isNew ? props.detailValues.equipmentId : equipmentId
      props.form.validateFields((error, values) => {
        if (error) return
        if (props.isNew) {
          insertMeter(Object.assign(values, { equipmentId: tempId }))
            .then(res => {
              if (res && res.success) {
                message.success("新增仪表成功")
                props.setData(tempId)
              } else {
                message.error("新增仪表失败")
              }
            })
            .catch(err => {
              console.error(err)
            })
            .finally(() => {
              props.closeModal(false)
            })
        } else {
          updateMeter(
            Object.assign(values, {
              meterId: meterId,
              equipmentId: equipmentId,
              workStatue: values.workStatue * 1
            })
          )
            .then(res => {
              if (res && res.success) {
                const tempTxt = props.isNew
                  ? "新增仪表设备成功"
                  : "仪表数据修改成功"
                message.success(tempTxt)
                props.setData(tempId)
              } else {
                const tempTxt = props.isNew
                  ? "新增仪表设备失败"
                  : "仪表数据修改失败"
                message.error(tempTxt + res.message)
              }
            })
            .catch(err => {
              console.error(err)
            })
            .finally(() => {
              props.closeModal(false)
            })
        }
      })
    }

    const handleCancel = e => {
      props.closeModal(false)
    }

    const { getFieldDecorator } = props.form
    const { isNew, detailValues } = props
    const { meterId, equipmentId } = detailValues
    let tempIp = "",
      tempStatus = "",
      tempName = "",
      tempDesc = "",
      tempAddress = ""
    if (!isNew) {
      const { ip, name, workStatue, desc, modbusAdds } = detailValues
      tempIp = ip
      tempStatus = workStatue
      tempName = name
      tempDesc = desc
      tempAddress = modbusAdds
    }
    return (
      <Modal
        title={props.title || "仪表详情"}
        visible={props.visible}
        onOk={() => handleOk(equipmentId, meterId)}
        onCancel={handleCancel}
        width={800}
      >
        <FormItem {...formLayout} label="仪表名称">
          {getFieldDecorator("name", {
            initialValue: tempName
          })(<Input placeholder="请输入仪表名称"></Input>)}
        </FormItem>
        <FormItem {...formLayout} label="ip">
          {getFieldDecorator("ip", {
            initialValue: tempIp
          })(<Input placeholder="请输入仪表ip"></Input>)}
        </FormItem>

        <FormItem {...formLayout} label="modebus地址">
          {getFieldDecorator("modbusAdds", {
            initialValue: tempAddress
          })(<Input placeholder="请输入modebus地址"></Input>)}
        </FormItem>

        <FormItem {...formLayout} label="仪表状态">
          {getFieldDecorator("workStatue", {
            initialValue: tempStatus + "",
            rules: [
              {
                required: true,
                message: "请选择仪表状态！",
                whitespace: true
              }
            ]
          })(
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="请选择仪表工作状态"
            >
              <Select.Option value="0">使用中</Select.Option>
              <Select.Option value="1">废弃</Select.Option>
            </Select>
          )}
        </FormItem>

        <FormItem {...formLayout} label="仪表详情">
          {getFieldDecorator("desc", {
            initialValue: tempDesc
          })(<Input placeholder="请输入仪表详情"></Input>)}
        </FormItem>
      </Modal>
    )
  })
)
