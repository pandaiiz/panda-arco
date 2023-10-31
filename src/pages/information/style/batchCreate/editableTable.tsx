import {
  Button,
  Input,
  Select,
  Table,
  TableColumnProps,
} from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { useRequest } from 'ahooks';
import { getEnum } from '@/utils/commonService';
import { deleteOrderDetailById } from '@/pages/order/list/service';
import PictureUpload from '@/pages/information/style/batchCreate/pictureUpload';
import { getDepartmentByCode } from '@/pages/setting/department/service';

const Editable = ({
  detailData,
  setDetailData,
  setSelectedRow,
  selectedRow,
}) => {
  const { data: categoryList } = useRequest(() => getEnum('CATEGORY'));
  const { data: specList } = useRequest(() => getEnum('SPEC'));
  const { data: techList } = useRequest(() => getEnum('TECH'));
  const { data: departmentData } = useRequest(() =>
    getDepartmentByCode('PROGRAM')
  );

  const columns: TableColumnProps[] = [
    {
      title: '图片',
      dataIndex: 'realitySrc',
      align: 'center',
      render: (col, record, index) => (
        <PictureUpload
          url={record.realitySrc}
          onChange={(file: { response: { src: any } }[]) => {
            const newData = cloneDeep(detailData);
            newData[index].realitySrc = file[0]?.response?.src;
            setDetailData(newData);
          }}
        />
      ),
    },
    {
      title: '款号',
      dataIndex: 'styleId',
      align: 'center',
      width: 300,
      render: (col, record) => (
        <Input disabled value={record?.styleCode} style={{ width: '75%' }} />
      ),
    },
    {
      // 下拉框
      title: '品名',
      dataIndex: 'category',
      align: 'center',
      width: 160,
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
          {categoryList?.map((item) => (
            <Select.Option key={item.id} value={item.key}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      // 下拉框
      title: '编程',
      dataIndex: 'programmerId',
      align: 'center',
      width: 160,
      render: (col, record, index) => (
        <Select
          placeholder="请选择编程"
          allowClear
          value={record.programmerId}
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
          {departmentData?.users?.map((item: any) => (
            <Select.Option key={item.code} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },

    {
      // 下拉框
      title: '规格',
      dataIndex: 'spec',
      align: 'center',
      width: 160,
      render: (col, record, index) => (
        <Select
          placeholder="请选择规格"
          allowClear
          value={record.spec}
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
          {specList?.map((item) => (
            <Select.Option key={item.id} value={item.key}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      // 下拉框
      title: '工艺',
      dataIndex: 'tech',
      align: 'center',
      width: 160,
      render: (col, record, index) => (
        <Select
          placeholder="请选择工艺"
          allowClear
          value={record.tech}
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
          {techList?.map((item) => (
            <Select.Option key={item.id} value={item.key}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
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
