import React from 'react';
import { Button, Popconfirm, TableColumnProps } from '@arco-design/web-react';
import dayjs from 'dayjs';

export const getColumns = (
  callback: (record: Record<string, any>, type: string) => Promise<void>
): TableColumnProps[] => {
  return [
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '账号',
      dataIndex: 'account',
      align: 'center',
    },
    {
      title: '权限',
      dataIndex: 'role.title',
      align: 'center',
    },
    {
      title: '创建日期',
      dataIndex: 'createdAt',
      align: 'center',
      render: (data) => dayjs(data).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '更新日期',
      dataIndex: 'updatedAt',
      align: 'center',
      render: (data) => dayjs(data).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      render: (_, record) => [
        <Button
          key="edit"
          type="text"
          size="small"
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
};
