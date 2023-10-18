import React, { useState, useRef } from 'react';
import {
  Table,
  Card,
  Button,
  Space,
  Typography,
  TableColumnProps,
  Input,
} from '@arco-design/web-react';

import SearchForm from './form';

import { useAsyncEffect, useRequest } from 'ahooks';
import { getOrderDetailsList } from '@/pages/order/arrange/service';
import { IconSearch, IconShrink } from '@arco-design/web-react/icon';
import Arrange from '@/pages/order/arrange/arrange';
import dayjs from 'dayjs';

const { Title } = Typography;
import styles from './style/index.module.less';

function ArrangeTable() {
  const [visible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [formParams, setFormParams] = useState({});

  const {
    data: dataList,
    loading,
    run,
  } = useRequest(() => getOrderDetailsList({ status: 0, ...formParams }));
  const inputRef = useRef(null);

  const columns: TableColumnProps[] = [
    {
      title: '客户',
      dataIndex: 'order.customer.name',
      width: 100,
      align: 'center',
      filterIcon: <IconSearch />,

      filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
        return (
          <div className={styles['arco-table-custom-filter']}>
            <Input.Search
              ref={inputRef}
              searchButton
              placeholder="Please enter name"
              value={filterKeys[0] || ''}
              onChange={(value) => {
                setFilterKeys(value ? [value] : []);
              }}
              onSearch={() => {
                confirm();
              }}
            />
          </div>
        );
      },
      onFilter: (value, row) =>
        value ? row.order.customer.name.indexOf(value) !== -1 : true,
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => inputRef.current.focus(), 150);
        }
      },
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
      dataIndex: 'style.styleCode',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.style.styleCode?.length - b.style.styleCode?.length,
    },
    {
      title: '规格',
      dataIndex: 'style.specName',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.style.specName?.length - b.style.specName?.length,
    },
    {
      title: '品名',
      dataIndex: 'categoryName',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.categoryName?.length - b.categoryName?.length,
    },
    {
      title: '圈号',
      dataIndex: 'circle',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.circle - b.circle,
    },
    {
      title: '件重',
      dataIndex: 'singleWeight',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.singleWeight - b.singleWeight,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: '合计',
      dataIndex: 'totalWeight',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.totalWeight - b.totalWeight,
    },
  ];

  useAsyncEffect(async () => {
    run();
  }, [JSON.stringify(formParams)]);

  function handleSearch(params: any) {
    setFormParams({ ...params, unixTime: dayjs().unix() });
  }

  return (
    <Card>
      <Title heading={6}>排单</Title>
      <SearchForm onSearch={handleSearch} />
      <div className={styles['button-group']}>
        <Space>
          <Button
            type="primary"
            icon={<IconShrink />}
            onClick={() => setVisible(true)}
          >
            排单
          </Button>
        </Space>
      </div>
      <Table
        rowKey="id"
        loading={loading}
        pagination={false}
        columns={columns}
        data={dataList}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
          },
        }}
      />

      {visible && (
        <Arrange
          data={selectedRows}
          onClose={() => {
            setVisible(false);
            run();
          }}
        />
      )}
    </Card>
  );
}

export default ArrangeTable;
