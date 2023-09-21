import {
  Button,
  Input,
  InputNumber,
  Select,
  Table,
  TableColumnProps,
} from '@arco-design/web-react';
import React, { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useRequest } from 'ahooks';
import { getEnum } from '@/utils/commonService';
import { deleteOrderDetailById } from '@/pages/order/list/service';

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
      render: (col, record, index) => (
        <Select
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
            disabled: !record.category,
          };
        },
      }}
    />
  );
};

export default Editable;
