import React from 'react';
import { Button, Typography } from '@arco-design/web-react';

const { Text } = Typography;
export const Status = ['未上线', '已上线'];

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: 'KEY',
      dataIndex: 'key',
    },
    /*{
      title: ['searchTable.columns.filterType'],
      dataIndex: 'filterType',
      render: (value) => FilterType[value],
    },
    {
      title: ['searchTable.columns.status'],
      dataIndex: 'status',
      render: (x) => {
        if (x === 0) {
          return <Badge status="error" text={Status[x]}></Badge>;
        }
        return <Badge status="success" text={Status[x]}></Badge>;
      },
    },*/
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
          查看
        </Button>
      ),
    },
  ];
}
