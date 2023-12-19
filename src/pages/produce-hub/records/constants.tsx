import React from 'react';
import { Button, Popconfirm } from '@arco-design/web-react';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: '流程单号',
      dataIndex: 'transferId',
    },
    {
      title: '部门',
      dataIndex: 'department.name',
    },
    {
      title: '类型',
      dataIndex: 'productTypeName',
    },
    {
      title: '出入库',
      dataIndex: 'type',
      render: (value) => value === 'IN' ? '入库' : '出库'
    },
    {
      title: '重量',
      dataIndex: 'weight',
    },
    {
      title: '件数',
      dataIndex: 'quantity',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '品名',
      dataIndex: 'transfer.style.categoryName',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => [
        <Button
          type="text"
          size="small"
          key="translate"
          onClick={() => callback(record, 'translate')}
        >
          转发
        </Button>,
        // <Button
        //   type="text"
        //   size="small"
        //   key="view"
        //   onClick={() => callback(record, 'detail')}
        // >
        //   编辑
        // </Button>,
        <Popconfirm
          key="delete"
          focusLock
          title="确认删除吗？"
          onOk={async () => {
            await callback(record, 'delete');
          }}
        >
          <Button type="text" size="small">
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];
}
