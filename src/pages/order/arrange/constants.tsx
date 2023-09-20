export function getColumns() {
  return [
    {
      title: '客户',
      dataIndex: 'order.customer.name',
    },
    {
      title: '款号',
      dataIndex: 'styleCode',
    },
    {
      title: '品名',
      dataIndex: 'categoryName',
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
