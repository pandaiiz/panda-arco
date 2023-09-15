import React from 'react';
import { Button, Popconfirm, Tag } from '@arco-design/web-react';
import dayjs from 'dayjs';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: '客户名称',
      dataIndex: 'customerName',
    },
    {
      title: '客户编号',
      dataIndex: 'customerCode',
    },
    {
      title: '字印',
      dataIndex: 'charactersTitle',
    },
    {
      title: '下单日期',
      dataIndex: 'orderDate',
      render: (data) => data && dayjs(data).format('YYYY-MM-DD'),
    },
    {
      title: '订单号',
      dataIndex: 'orderNumber',
    },
    {
      title: '时间状态(偏差)',
      render: (data, row) => {
        const day = dayjs(dayjs().format('YYYY-MM-DD')).diff(
          dayjs(row.orderDate).format('YYYY-MM-DD'),
          'day'
        );
        if (day < 7) return <Tag color="green">{day}</Tag>;
        if (7 < day && day < 10) return <Tag color="orange">{day}</Tag>;
        if (10 < day && day < 15) return <Tag color="red">{day}</Tag>;
      },
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
          <Button type="text" size="small">
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];
}
