import React from 'react';
import { Button, Popconfirm, TableColumnProps } from '@arco-design/web-react';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
): TableColumnProps[] {
  return [
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
      width: 300,
    },
    {
      title: '编号',
      dataIndex: 'code',
      align: 'center',
      width: 300,
    },
    {
      title: '人数',
      dataIndex: '_count.users',
      align: 'center',
      width: 300,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      width: 300,
      render: (_, record) => [
        <Button
          type="text"
          size="small"
          key="view"
          onClick={() => callback(record, 'edit')}
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
