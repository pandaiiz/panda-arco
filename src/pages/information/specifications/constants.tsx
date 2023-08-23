import React from 'react';
import { Button, Popconfirm } from '@arco-design/web-react';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: '款号',
      dataIndex: 'styleNumber',
    },
    {
      title: '圈号',
      dataIndex: 'circleNumber',
      render: (text) => text && JSON.parse(text).title,
    },
    {
      title: '件重',
      dataIndex: 'singleWeight',
      render: (text) => text && JSON.parse(text).title,
    },
    {
      title: '品类',
      dataIndex: 'category',
      render: (text) => text && JSON.parse(text).title,
    },
    {
      title: '圈号',
      dataIndex: 'name',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => [
        /*<Button
          type="text"
          size="small"
          key="view"
          onClick={() => callback(record, 'view')}
        >
          详情
        </Button>,*/
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
