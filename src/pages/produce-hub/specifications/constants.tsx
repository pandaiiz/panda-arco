import React from 'react';
import { Button } from '@arco-design/web-react';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: '用户名',
      dataIndex: 'account',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <Button
          type="text"
          size="small"
          onClick={() => callback(record, 'view')}
        >
          详情
        </Button>
      ),
    },
  ];
}
