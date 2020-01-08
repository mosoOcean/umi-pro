import { Button, Divider, Dropdown, Form, Icon, Menu, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryRule, updateRule, addRule, removeRule } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {
  const hide = message.loading('正在添加');

  try {
    await addRule({
      desc: fields.desc,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map(row => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '角色',
      dataIndex: 'role',
      sorter: true,
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      sorter: true,
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      sorter: true,
    },
    {
      title: '部门',
      dataIndex: 'original',
      sorter: true,
    },
    {
      title: '项目方案',
      dataIndex: 'projectTxt',
      sorter: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        2: {
          text: '已上线',
          status: 'Success',
        },
        3: {
          text: '异常',
          status: 'Error',
        },
      },
    },
    {
      title: '行程',
      dataIndex: 'updatedAt',
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            配置
          </a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={()=>{Modal.confirm({
            title:'确认删除？'
          })}}>删除</a>
        </>
      ),
    },
  ];
  return (
    <div>
    <ProTable
    headerTitle="用户管理"
    actionRef={actionRef}
    rowKey="key"
    tableAlertRender={(selectedRowKeys, selectedRows) => (
      <div>
        已选择{' '}
        <a
          style={{
            fontWeight: 600,
          }}
        >
          {selectedRowKeys.length}
        </a>{' '}
        项&nbsp;&nbsp;
        <span>
          服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
        </span>
      </div>
    )}
    request={params => queryRule(params)}
    columns={columns}
    rowSelection={{}}
  />
  <CreateForm
    onSubmit={async value => {
      const success = await handleAdd(value);

      if (success) {
        handleModalVisible(false);

        if (actionRef.current) {
          actionRef.current.reload();
        }
      }
    }}
    onCancel={() => handleModalVisible(false)}
    modalVisible={createModalVisible}
  />
  {stepFormValues && Object.keys(stepFormValues).length ? (
    <UpdateForm
      onSubmit={async value => {
        const success = await handleUpdate(value);

        if (success) {
          handleModalVisible(false);
          setStepFormValues({});

          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}
      onCancel={() => {
        handleUpdateModalVisible(false);
        setStepFormValues({});
      }}
      updateModalVisible={updateModalVisible}
      values={stepFormValues}
    />
  ) : null}
    </div>
  );
};

export default Form.create()(TableList);
