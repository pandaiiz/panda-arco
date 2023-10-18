import React, { useState, useMemo } from 'react';
import { Table, Card, Button, Space, Typography } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';

import SearchForm from './form';

import styles from './style/index.module.less';
import { getColumns } from './constants';
import { useAsyncEffect, useRequest } from 'ahooks';
import Edit from '@/pages/order/list/edit';
import { copyOrderById, deleteOrderById } from '@/pages/order/list/service';
import dayjs from 'dayjs';
import { getFinishedTransferByPaging } from '@/pages/order/finished/service';

const { Title } = Typography;

function CustomerTable() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});

  const [formParams, setFormParams] = useState<any>({
    pageSize: 10,
    current: 1,
  });

  const {
    data: dataList,
    loading,
    run,
  } = useRequest(getFinishedTransferByPaging);

  const tableCallback = async (record: any, type: string) => {
    switch (type) {
      case 'delete':
        await deleteOrderById(record.id);
        setFormParams({ ...formParams, current: 1 });
        run(formParams);
        break;
      case 'edit':
        setData(record);
        setVisible(true);
        break;
      case 'copy':
        await copyOrderById(record.id);
        run(formParams);
        break;
    }
  };

  const columns = useMemo(() => getColumns(tableCallback), []);

  useAsyncEffect(async () => {
    await run(formParams);
  }, [JSON.stringify(formParams)]);

  function onChangeTable({ current, pageSize }) {
    setFormParams({
      ...formParams,
      current,
      pageSize,
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
      <Title heading={6}>送货单</Title>
      <SearchForm onSearch={handleSearch} />
      <div className={styles['button-group']}>
        <Space>
          <Button type="primary" onClick={() => setVisible(true)}>
            出货
          </Button>
        </Space>
      </div>
      <Table
        rowKey="id"
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
