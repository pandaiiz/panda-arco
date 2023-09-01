import React from 'react';
import { Button, Popconfirm } from '@arco-design/web-react';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: '客户',
      dataIndex: 'order.customer.customerCode',
    },
    {
      title: '款号',
      dataIndex: 'styleCode',
    },
    {
      title: '品名',
      dataIndex: 'categoryTitle',
    },
    {
      title: '件重',
      dataIndex: 'singleWeight',
    },
    {
      title: '圈号',
      dataIndex: 'circle',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
    },
  ];
}
