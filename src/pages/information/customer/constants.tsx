import React from 'react';
import { Button, Popconfirm } from '@arco-design/web-react';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: '客户名称',
      dataIndex: 'name',
    },
    {
      title: '客户编号',
      dataIndex: 'customerCode',
    },
    {
      title: '客户联系方式',
      dataIndex: 'telephone',
    },
    {
      title: '联系人名字',
      dataIndex: 'contactsName',
    },
    {
      title: '联系人电话',
      dataIndex: 'contactsPhone',
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
          onClick={() => callback(record, 'detail')}
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
