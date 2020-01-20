/*
 * @Description: 设备详情模态框
 * @Author: zhanghaoyu004
 * @Date: 2020-01-19 16:09:21
 * @LastEditTime : 2020-01-20 15:51:45
 * @LastEditors  : zhanghaoyu004
 */
import React from "react"
import { Modal, Form, Input, message, Select, Radio } from "antd"
import { connect } from "dva"
import { addRule, updateRule } from "../service"

const FormItem = Form.Item
message.config({
  top: 100
})

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

    // 确认方法
    const handleOk = (detailValues, e) => {
      props.form.validateFields((error, values) => {
        if (error) return
        if (props.isNew) {
          addRule(
            Object.assign(props.form.getFieldsValue(), {
              parentId: detailValues.parentId
            })
          )
            .then(res => {
              if (res && res.success) {
                message.success("新增设备成功")
                props.dispatch({
                  type: "equipment/queryRule",
                  payload: {
                    parentId: detailValues.parentId
                  }
                })
              } else {
                message.error("新增设备失败" + res.message)
              }
            })
            .catch(err => {
              console.error(err)
            })
            .finally(() => {
              props.closeModal(false)
            })
        } else {
          updateRule(
            Object.assign(props.form.getFieldsValue(), {
              equipmentId: detailValues.equipmentId
            })
          )
            .then(res => {
              if (res && res.success) {
                message.success("修改设备数据成功")
                props.dispatch({
                  type: "equipment/queryRule",
                  payload: {
                    parentId: detailValues.parentId
                  }
                })
              } else {
                message.error("设备数据修改失败" + res.message)
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
    let tempCode = "",
      tempStatus = "",
      tempName = "",
      tempDesc = "",
      tempAddress = "",
      tempIsLast = "0"
    if (!isNew) {
      const {
        equipmentCode,
        name,
        workStatue,
        desc,
        address,
        lastEquipment
      } = detailValues
      tempCode = equipmentCode
      tempStatus = workStatue
      tempName = name
      tempDesc = desc
      tempAddress = address
      tempIsLast = String(lastEquipment)
    }
    return (
      <Modal
        title={props.title || "设备详情"}
        visible={props.visible}
        onOk={() => handleOk(detailValues)}
        onCancel={handleCancel}
        width={800}
      >
        <FormItem {...formLayout} label="设备编码">
          {getFieldDecorator("equipmentCode", {
            initialValue: tempCode
          })(<Input placeholder="请输入"></Input>)}
        </FormItem>

        <FormItem {...formLayout} label="设备名称">
          {getFieldDecorator("name", {
            initialValue: tempName,
            rules: [
              {
                required: true,
                message: "请输入设备名称！",
                whitespace: true
              }
            ]
          })(<Input placeholder="请输入"></Input>)}
        </FormItem>

        <FormItem {...formLayout} label="工作状态">
          {getFieldDecorator("workStatue", {
            initialValue: String(tempStatus),
            rules: [
              {
                required: true,
                message: "请选择设备状态！",
                whitespace: true
              }
            ]
          })(
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="请选择设备工作状态"
            >
              <Select.Option value="0">使用中</Select.Option>
              <Select.Option value="1">废弃</Select.Option>
            </Select>
          )}
        </FormItem>

        <FormItem {...formLayout} label="设备详情">
          {getFieldDecorator("desc", {
            initialValue: tempDesc
          })(<Input placeholder="请输入"></Input>)}
        </FormItem>

        <FormItem {...formLayout} label="设备地址">
          {getFieldDecorator("address", {
            initialValue: tempAddress
          })(<Input placeholder="请输入"></Input>)}
        </FormItem>

        <FormItem {...formLayout} label="是否为最末级设备">
          {getFieldDecorator("lastEquipment", {
            initialValue: tempIsLast,
            rules: [
              {
                required: true,
                message: "请选择是否为最末级设备！",
                whitespace: true
              }
            ]
          })(
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="是否为最末级设备"
            >
              <Select.Option value="0">否</Select.Option>
              <Select.Option value="1">是</Select.Option>
            </Select>
          )}
        </FormItem>
      </Modal>
    )
  })
)
