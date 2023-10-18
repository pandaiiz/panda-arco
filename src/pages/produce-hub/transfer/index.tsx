import React, { useState, useMemo } from 'react';
import { Table, Card, Button, Space, Typography } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';

import SearchForm from './form';

import styles from './style/index.module.less';
import { getColumns } from './constants';
import { useAsyncEffect, useRequest } from 'ahooks';
import Edit from '@/pages/produce-hub/transfer/edit';
import {
  deleteTransferById,
  getTransferByPaging,
} from '@/pages/produce-hub/transfer/service';
import dayjs from 'dayjs';
import PrintModal from '@/pages/order/arrange/arrange/PrintModal';

const { Title } = Typography;

function CustomerTable() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const [selectedRows1, setSelectedRows1] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [formParams, setFormParams] = useState({
    unixTime: 0,
    pageSize: 10,
    current: 1,
  });

  const {
    data: dataList,
    loading,
    run,
  } = useRequest(getTransferByPaging, {
    manual: true,
  });

  const tableCallback = async (record: any, type: string) => {
    switch (type) {
      case 'delete':
        await deleteTransferById(record.id);
        setFormParams({ ...formParams, current: 1 });
        run(formParams);
        break;
      case 'detail':
        setData(record);
        setVisible(true);
        break;
    }
  };

  const columns = useMemo(() => getColumns(tableCallback), []);

  useAsyncEffect(async () => {
    run(formParams);
  }, [JSON.stringify(formParams)]);

  function onChangeTable({ current, pageSize }) {
    setFormParams({
      ...formParams,
      current,
      pageSize,
      unixTime: dayjs().unix(),
    });
  }

  function handleSearch(
    params: React.SetStateAction<{ pageSize: number; current: number }>
  ) {
    setFormParams({
      ...params,
      pageSize: formParams.pageSize,
      current: 1,
      unixTime: dayjs().unix(),
    });
  }

  return (
    <Card>
      <Title heading={6}>传递单列表</Title>
      <SearchForm onSearch={handleSearch} />
      <div className={styles['button-group']}>
        <Space>
          <Button
            type="primary"
            icon={<IconPlus />}
            onClick={() => setVisible(true)}
          >
            新增
          </Button>
          <PrintModal list={selectedRows1} onClose={() => run(formParams)} />
        </Space>
      </div>
      <Table
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows1(selectedRows);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
        loading={loading}
        onChange={onChangeTable}
        pagination={{
          sizeCanChange: true,
          showTotal: true,
          pageSizeChangeResetCurrent: true,
          current: formParams.current,
          pageSize: formParams.pageSize,
          total: dataList?.pagination?.total,
        }}
        columns={columns}
        data={dataList?.data}
      />

      {visible && (
        <Edit
          data={data}
          onClose={() => {
            setVisible(false);
            setData({});
            run(formParams);
          }}
        />
      )}
    </Card>
  );
}

export default CustomerTable;
