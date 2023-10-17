import React from 'react';
import {
  Button,
  Popconfirm,
  TableColumnProps,
  Tag,
} from '@arco-design/web-react';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
): TableColumnProps[] {
  return [
    {
      title: '名称',
      dataIndex: 'title',
      width: 300,
    },
    {
      title: '地址',
      dataIndex: 'key',
      width: 300,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      align: 'center',
      width: 200,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
      width: 200,
    },
    {
      title: '启用',
      dataIndex: 'enabled',
      align: 'center',
      width: 200,
      render: (enabled: number) =>
        enabled === 1 ? (
          <Tag color="green">启用</Tag>
        ) : (
          <Tag color="red">停用</Tag>
        ),
    },
    {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      width: 200,
      render: (_, record) => [
        <Button
          key="detail"
          type="text"
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
