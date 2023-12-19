import React from 'react';
import { Button, Popconfirm, TableColumnProps, Tag } from '@arco-design/web-react';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
): TableColumnProps[] {
  return [
    {
      title: '流程单号',
      dataIndex: 'transferId',
      width: 100,
      align: 'center',
    },
    {
      title: '部门',
      dataIndex: 'department.name',
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'productTypeName',
      align: 'center',
    },
    {
      title: '出入库',
      dataIndex: 'type',
      align: 'center',
      render: (value) => value === 'IN' ? <Tag color='green'> 入库</Tag> : <Tag color='blue'> 出库</Tag>
    },
    {
      title: '重量',
      dataIndex: 'weight',
      align: 'center',
    },
    {
      title: '件数',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
    },
    {
      title: '品名',
      dataIndex: 'transfer.style.categoryName',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
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
