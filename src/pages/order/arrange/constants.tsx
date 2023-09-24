import { TableColumnProps } from '@arco-design/web-react';

export function getColumns(): TableColumnProps[] {
  return [
    {
      title: '客户',
      dataIndex: 'order.customer.name',
      width: 100,
      align: 'center',
      sorter: (a, b) =>
        a.order.customer.name?.length - b.order.customer.name?.length,
    },
    {
      title: '单号',
      dataIndex: 'order.orderNumber',
      width: 100,
      align: 'center',
      sorter: (a, b) =>
        a.order.orderNumber.length - b.order.orderNumber?.length,
    },
    {
      title: '款号',
      dataIndex: 'styleCode',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.styleCode?.length - b.styleCode?.length,
    },
    {
      title: '品名',
      dataIndex: 'categoryName',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.categoryName?.length - b.categoryName?.length,
    },
    {
      title: '件重',
      dataIndex: 'singleWeight',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.singleWeight - b.singleWeight,
    },
    {
      title: '圈号',
      dataIndex: 'circle',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.circle - b.circle,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.quantity - b.quantity,
    },
  ];
}
