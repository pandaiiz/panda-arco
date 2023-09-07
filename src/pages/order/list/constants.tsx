import React from 'react';
import { Button, Popconfirm } from '@arco-design/web-react';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: '客户名称',
      dataIndex: 'customerName',
    },
    {
      title: '客户编号',
      dataIndex: 'customerCode',
    },
    {
      title: '订单号',
      dataIndex: 'orderNumber',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => [
        <Button
          type="text"
          size="small"
          key="view"
          onClick={() => callback(record, 'arrange')}
        >
          编辑
        </Button>,
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
