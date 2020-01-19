/*
 * @Description: 设备详情模态框
 * @Author: zhanghaoyu004
 * @Date: 2020-01-19 16:09:21
 * @LastEditTime : 2020-01-19 16:49:14
 * @LastEditors  : zhanghaoyu004
 */
import React, { useState, useEffect } from "react"
import { Modal, Form, Input, message } from "antd"
import { queryRule, updateRule, addRule, removeRule } from "../service"

const FormItem = Form.Item

export default Form.create()(function(props) {
  console.log("============", props)

  const formLayout = {
    labelCol: {
      span: 7
    },
    wrapperCol: {
      span: 13
    }
  }

  const handleOk = e => {
    addRule(props.form.getFieldsValue())
      .then(res => {
        if (res && res.success) {
          message.success("新增设备成功")
        } else {
          message.error("新增设备失败")
        }
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        props.closeModal(false)
      })
  }

  const handleCancel = e => {
    props.closeModal(false)
  }

  const { getFieldDecorator } = props.form
  return (
    <Modal
      title={props.title || "设备详情"}
      visible={props.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
    >
      <FormItem {...formLayout} label="设备编码">
        {getFieldDecorator("equipmentCode", {
          initialValue: ""
        })(<Input placeholder="请输入"></Input>)}
      </FormItem>

      <FormItem {...formLayout} label="设备名称">
        {getFieldDecorator("name", {
          initialValue: ""
        })(<Input placeholder="请输入"></Input>)}
      </FormItem>

      <FormItem {...formLayout} label="工作状态">
        {getFieldDecorator("workStatue", {
          initialValue: ""
        })(<Input placeholder="请输入"></Input>)}
      </FormItem>

      <FormItem {...formLayout} label="设备详情">
        {getFieldDecorator("desc", {
          initialValue: ""
        })(<Input placeholder="请输入"></Input>)}
      </FormItem>

      <FormItem {...formLayout} label="设备地址">
        {getFieldDecorator("address", {
          initialValue: ""
        })(<Input placeholder="请输入"></Input>)}
      </FormItem>
    </Modal>
  )
})
