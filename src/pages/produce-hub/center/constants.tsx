import React from 'react';
import { Button, Popconfirm, Tag } from '@arco-design/web-react';
import dayjs from 'dayjs';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: '收发单号',
      dataIndex: 'id',
    },
    {
      title: '客户',
      dataIndex: 'customerCode',
    },
    {
      title: '品类',
      dataIndex: 'categoryTitle',
    },
    {
      title: '单重',
      dataIndex: 'singleWeight',
    },
    {
      title: '圈号',
      dataIndex: 'circle',
      // render: (data) => Number(data),
    },
    {
      title: '款号',
      dataIndex: 'styleCode',
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
          {/*<Button type="text" size="small">
            删除
          </Button>*/}
        </Popconfirm>,
      ],
    },
  ];
}
