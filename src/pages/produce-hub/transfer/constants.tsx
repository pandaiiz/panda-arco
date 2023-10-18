import { TableColumnProps, Tag } from '@arco-design/web-react';
import dayjs from 'dayjs';
import React from 'react';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
): TableColumnProps[] {
  return [
    {
      title: '传递单号',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '款号',
      dataIndex: 'style.styleCode',
      align: 'center',
    },
    {
      title: '客户名称',
      render: (data, row) => row.order && row?.order?.customer?.name,
      align: 'center',
    },
    {
      title: '规格',
      dataIndex: 'style.specName',
      align: 'center',
    },
    {
      title: '品名',
      dataIndex: 'style.categoryName',
      align: 'center',
    },
    {
      title: '工艺',
      dataIndex: 'style.techName',
      align: 'center',
    },
    {
      title: '圈号',
      dataIndex: 'circle',
      align: 'center',
    },
    {
      title: '件重',
      dataIndex: 'singleWeight',
      align: 'center',
    },
    {
      title: '字印',
      render: (_, row) => row.order?.fontPrintName,
      align: 'center',
    },
    {
      title: '创建日期',
      dataIndex: 'createdAt',
      render: (data) => dayjs(data).format('YYYY-MM-DD HH:mm'),
      align: 'center',
    },
    {
      title: '订单日期',
      dataIndex: 'orderDate',
      render: (data, row) =>
        row?.order
          ? dayjs(row?.order?.orderDate).format('YYYY-MM-DD HH:mm')
          : '',
      align: 'center',
    },
    {
      title: '订单号',
      render: (data, row) => (row?.order ? row?.order?.orderNumber : ''),
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (data) => {
        if (data === 0) return <Tag color="red">未生产</Tag>;
        if (data === 1) return <Tag color="green">生产中</Tag>;
        if (data === 2) return <Tag color="blue">完单</Tag>;
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
