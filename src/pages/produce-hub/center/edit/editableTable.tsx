import {
  Button,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  Upload,
} from '@arco-design/web-react';
import React, { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useRequest } from 'ahooks';
import { getEnum } from '@/utils/commonService';
import { deleteOrderDetailById } from '@/pages/order/list/service';

const Editable = ({ detailData, setDetailData, setSelectedRow }) => {
  const { data: categoryEnum } = useRequest(() => getEnum('CATEGORY'));
  const columns = [
    {
      // 下拉框
      title: '品名',
      dataIndex: 'categoryId',
      align: 'center',
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
      align: 'center',
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
    /*{
      title: '图片',
      dataIndex: 'picture',
      align: 'center',
      render: (col, record, index) => (
        <Upload
          showUploadList={false}
          onChange={(_, currentFile) => {
            const newData = cloneDeep(detailData);
            newData[index].picture = URL.createObjectURL(
              currentFile.originFile
            );
            setDetailData(newData);
            // setFile({
            //     ...currentFile,
            //     url: URL.createObjectURL(currentFile.originFile),
            // });
          }}
          name="file"
          fileList={record.picture}
          action="/api/picture/upload"
        />
      ),
    },*/
    {
      title: '圈号',
      dataIndex: 'circle',
      align: 'center',
      render: (col, record, index) => (
        <Input
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
      align: 'center',
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
      dataIndex: 'quantity',
      align: 'center',
      render: (col, record, index) => (
        <InputNumber
          value={record.quantity}
          onChange={(e) => {
            const newData = cloneDeep(detailData);
            newData[index].quantity = e;
            setDetailData(newData);
          }}
        />
      ),
    },
    {
      title: '生产状态',
      dataIndex: 'productionStatus',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  return (
    <Table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      columns={columns}
      data={detailData}
      pagination={false}
      rowKey="id"
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectedRowKeys(selectedRowKeys);
          setSelectedRow(selectedRows);
        },
      }}
    />
  );
};

export default Editable;
