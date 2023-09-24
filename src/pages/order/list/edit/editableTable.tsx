import {
  Button,
  Input,
  InputNumber,
  Select,
  Table,
  TableColumnProps,
  Tag,
} from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { useRequest } from 'ahooks';
import { getEnum } from '@/utils/commonService';
import { deleteOrderDetailById } from '@/pages/order/list/service';
import PictureUpload from '@/pages/order/list/edit/pictureUpload';

const Editable = ({
  detailData,
  setDetailData,
  setSelectedRow,
  selectedRow,
}) => {
  const { data: categoryEnum } = useRequest(() => getEnum('CATEGORY'));
  const columns: TableColumnProps[] = [
    {
      // 下拉框
      title: '品名',
      dataIndex: 'category',
      align: 'center',
      width: 160,
      render: (col, record, index) => (
        <Select
          disabled={record.status === 1}
          placeholder="请选择品名"
          allowClear
          value={record.category}
          onChange={(value, option) => {
            const newSelectedRowKeys = selectedRowKeys.filter(
              (item) => item !== record.nanoid
            );
            const newSelectedRow = selectedRow.filter(
              (item) => item.nanoid !== record.nanoid
            );
            setSelectedRowKeys(newSelectedRowKeys);
            setSelectedRow(newSelectedRow);
            const newData = cloneDeep(detailData);
            if (value) {
              newData[index].category = value;
              newData[index].categoryName =
                'children' in option ? option.children : '';
            } else {
              newData[index].category = '';
              newData[index].categoryName = '';
            }
            setDetailData(newData);
          }}
        >
          {categoryEnum?.map((item) => (
            <Select.Option key={item.id} value={item.key}>
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
      width: 220,
      render: (col, record, index) => (
        <Input
          disabled={record.status === 1}
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
      title: '图片',
      dataIndex: 'imgSrc',
      align: 'center',
      render: (col, record, index) => (
        <PictureUpload
          url={record.imgSrc}
          onChange={(file) => {
            const newData = cloneDeep(detailData);
            newData[index].imgSrc = file[0]?.response?.src;
            setDetailData(newData);
          }}
        />
      ),
    },
    {
      title: '圈号',
      dataIndex: 'circle',
      align: 'center',
      width: 100,
      render: (col, record, index) => (
        <Input
          disabled={record.status === 1}
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
      width: 100,
      render: (col, record, index) => (
        <InputNumber
          disabled={record.status === 1}
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
      width: 100,
      render: (col, record, index) => (
        <InputNumber
          disabled={record.status === 1}
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
      title: '状态',
      align: 'center',
      dataIndex: 'status',
      width: 100,
      render: (status) => (
        <>
          {status === 0 && <Tag color="red">未排产</Tag>}
          {status === 1 && <Tag color="green">已排产</Tag>}
        </>
      ),
    },
    {
      title: '操作',
      align: 'center',
      width: 120,
      render: (col, record, colIndex) => (
        <Button
          disabled={record.status === 1}
          type="text"
          onClick={() => deleteRow(record.id, colIndex)}
        >
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

  useEffect(() => {
    setSelectedRowKeys(selectedRow.map((item) => item.nanoid));
  }, [selectedRow]);

  return (
    <Table
      scroll={{ y: window.screen.height - 300 }}
      columns={columns}
      data={detailData}
      pagination={false}
      rowKey="nanoid"
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectedRowKeys(selectedRowKeys);
          setSelectedRow(selectedRows);
        },
        checkboxProps: (record) => {
          return {
            disabled: !record.category || record.status === 1,
          };
        },
      }}
    />
  );
};

export default Editable;
