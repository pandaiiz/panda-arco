import React from 'react';
import {
  Button,
  Popconfirm,
  TableColumnProps,
  Tag,
} from '@arco-design/web-react';
import dayjs from 'dayjs';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
): TableColumnProps[] {
  return [
    {
      title: '传递单号',
      dataIndex: 'id',
    },
    {
      title: '客户名称',
      render: (data, row) => row.order && row?.order?.customer?.name,
    },
    {
      title: '品名',
      dataIndex: 'categoryName',
    },
    {
      title: '圈号',
      dataIndex: 'circle',
    },
    {
      title: '字印',
      render: (data, row) => row.fontPrintName || row.order.fontPrintName,
    },
    {
      title: '创建日期',
      dataIndex: 'createdAt',
      render: (data) => dayjs(data).format('YYYY-MM-DD'),
    },
    {
      title: '订单日期',
      dataIndex: 'orderDate',
      render: (data, row) =>
        row?.order ? dayjs(row?.order?.orderDate).format('YYYY-MM-DD') : '',
    },
    {
      title: '订单号',
      render: (data, row) => (row?.order ? row?.order?.orderNumber : ''),
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data) => {
        if (data === 0) return '未生产';
        if (data === 1) return '生产中';
        if (data === 2) return '完单';
      },
    },
    /*{
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
    },*/
  ];
}
