import {
  Button,
  Input,
  InputNumber,
  Select,
  Table,
} from '@arco-design/web-react';
import React from 'react';
import { cloneDeep } from 'lodash';
import { useRequest } from 'ahooks';
import { getEnum } from '@/utils/commonService';
import { deleteOrderDetailById } from '@/pages/order/list/service';

const Editable = ({ detailData, setDetailData }) => {
  const { data: categoryEnum } = useRequest(() => getEnum('CATEGORY'));
  const columns = [
    {
      // 下拉框
      title: '品名',
      dataIndex: 'categoryId',
      render: (col, record, index) => (
        <Select
          placeholder="请选择品名"
          allowClear
          value={record.categoryId}
          onChange={(e) => {
            const newData = cloneDeep(detailData);
            const category = categoryEnum.find((item) => item.id === e);
            newData[index].categoryId = e;
            newData[index].categoryTitle = category.title;
            newData[index].categoryKey = category.itemKey;
            setDetailData(newData);
          }}
        >
          {categoryEnum?.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: '款号',
      dataIndex: 'styleCode',
      render: (col, record, index) => (
        <Input
          value={record.styleCode}
          onChange={(e) => {
            const newData = cloneDeep(detailData);
            newData[index].styleCode = e;
            setDetailData(newData);
          }}
        />
      ),
    },
    {
      title: '圈号',
      dataIndex: 'circle',
      render: (col, record, index) => (
        <InputNumber
          value={record.circle}
          onChange={(e) => {
            const newData = cloneDeep(detailData);
            newData[index].circle = e;
            setDetailData(newData);
          }}
        />
      ),
    },
    {
      title: '件重',
      dataIndex: 'singleWeight',
      render: (col, record, index) => (
        <InputNumber
          value={record.singleWeight}
          onChange={(e) => {
            const newData = cloneDeep(detailData);
            newData[index].singleWeight = e;
            setDetailData(newData);
          }}
        />
      ),
    },
    {
      title: '数量',
      dataIndex: 'number',
      render: (col, record, index) => (
        <InputNumber
          value={record.number}
          onChange={(e) => {
            const newData = cloneDeep(detailData);
            newData[index].number = e;
            setDetailData(newData);
          }}
        />
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      render: (col, record, index) => (
        <Input
          value={record.remark}
          onChange={(e) => {
            const newData = cloneDeep(detailData);
            newData[index].remark = e;
            setDetailData(newData);
          }}
        />
      ),
    },
    {
      title: '生产状态',
      dataIndex: 'productionStatus',
    },
    {
      title: '传递单号',
      dataIndex: 'transferNo',
    },
    {
      title: '操作',
      render: (col, record, colIndex) => (
        <Button type="text" onClick={() => deleteRow(record.id, colIndex)}>
          删除
        </Button>
      ),
    },
  ];

  const deleteRow = async (id, colIndex) => {
    if (id) await deleteOrderDetailById(id);
    setDetailData(detailData.filter((item, index) => index !== colIndex));
  };

  return (
    <>
      <Button onClick={() => setDetailData([...detailData, {}])}>新增</Button>
      <Table
        columns={columns}
        data={detailData}
        pagination={false}
        rowKey="id"
      />
    </>
  );
};

export default Editable;
