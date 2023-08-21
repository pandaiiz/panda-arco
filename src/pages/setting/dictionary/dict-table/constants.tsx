import React from 'react';
import { Button } from '@arco-design/web-react';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: '字段名',
      dataIndex: 'title',
    },
    {
      title: '值',
      dataIndex: 'itemKey',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => [
        <Button
          type="text"
          size="small"
          key="edit"
          onClick={() => callback(record, 'edit')}
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
