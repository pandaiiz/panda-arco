import React from 'react';
import { Button, Popconfirm } from '@arco-design/web-react';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: '品名',
      dataIndex: 'name',
    },
    {
      title: '规格',
      dataIndex: 'customerCode',
    },
    {
      title: '工艺',
      dataIndex: 'telephone',
    },
    {
      title: '编程',
      dataIndex: 'contactsName',
    },
    {
      title: '设计图',
      dataIndex: 'contactsPhone',
    },
    {
      title: '编程图',
      dataIndex: 'contactsPhone',
    },
    {
      title: '实拍图',
      dataIndex: 'contactsPhone',
    },
    {
      title: '标签',
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
