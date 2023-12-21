import {
  Button,
  Table,
  TableColumnProps,
} from '@arco-design/web-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { deleteOrderDetailById } from '@/pages/order/list/service';

const ProductTable = ({
  detailData,
}) => {
  console.log(detailData);

  const columns: TableColumnProps[] = [
    {
      title: '品名',
      dataIndex: 'style.categoryName',
      align: 'center',
      width: 160,
    },
    {
      title: '件数',
      align: 'center',
      dataIndex: 'quantity',
      width: 100,
    },
    {
      title: '件重',
      align: 'center',
      dataIndex: 'singleWeight',
      width: 100,
    },
  ];

  return (
    <Table
      scroll={{ y: window.screen.height - 300 }}
      columns={columns}
      data={detailData}
      pagination={false}
      rowKey="id"
    />
  );
};

export default ProductTable;
