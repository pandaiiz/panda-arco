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
      title: '客户名称',
      dataIndex: 'customer.name',
      align: 'center',
    },
    {
      title: '客户编号',
      dataIndex: 'customer.customerCode',
      align: 'center',
    },
    {
      title: '字印',
      dataIndex: 'fontPrintName',
      align: 'center',
    },
    {
      title: '下单日期',
      dataIndex: 'orderDate',
      align: 'center',
      render: (data) => data && dayjs(data).format('YYYY-MM-DD'),
    },
    {
      title: '订单号',
      dataIndex: 'orderNumber',
      align: 'center',
    },
    {
      title: '时间状态(偏差)',
      align: 'center',
      render: (data, row) => {
        const day = dayjs(dayjs().format('YYYY-MM-DD')).diff(
          dayjs(row.orderDate).format('YYYY-MM-DD'),
          'day'
        );
        if (day < 7) return <Tag color="green">{day}</Tag>;
        if (7 <= day && day < 10) return <Tag color="orange">{day}</Tag>;
        if (10 <= day && day < 15) return <Tag color="red">{day}</Tag>;
      },
    },
    {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      render: (_, record) => [
        <Button
          type="text"
          size="small"
          key="copy"
          onClick={() => callback(record, 'copy')}
        >
          复制
        </Button>,
        <Button
          type="text"
          size="small"
          key="view"
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
}
