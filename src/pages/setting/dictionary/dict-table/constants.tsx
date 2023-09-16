import React from 'react';
import { Button, TableColumnProps } from '@arco-design/web-react';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
): TableColumnProps[] {
  return [
    {
      title: '字段名',
      dataIndex: 'title',
      width: 300,
      align: 'center',
    },
    {
      title: '值',
      dataIndex: 'key',
      width: 300,
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      width: 300,
      align: 'center',
      render: (_, record) => [
        <Button
          type="text"
          size="small"
          key="edit"
          onClick={() => callback(record, 'detail')}
        >
          编辑
        </Button>,
        <Button
          type="text"
          size="small"
          key="delete"
          onClick={() => callback(record, 'delete')}
        >
          删除
        </Button>,
      ],
    },
  ];
}
