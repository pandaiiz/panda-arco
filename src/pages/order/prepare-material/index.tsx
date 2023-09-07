import React, { useState, useMemo } from 'react';
import { Table, Card, Button, Space, Typography } from '@arco-design/web-react';

import SearchForm from './form';

import { getColumns } from './constants';
import { useAsyncEffect, useRequest } from 'ahooks';
import { getOrderDetailsList } from '@/pages/order/arrange/service';
import { cloneDeep } from 'lodash';
import styles from '@/pages/order/list/style/index.module.less';
import { IconShrink } from '@arco-design/web-react/icon';
import Arrange from '@/pages/order/arrange/arrange';

const { Title } = Typography;

function PrepareMaterial() {
  const [visible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [formParams, setFormParams] = useState({});

  const { data: dataList, loading, run } = useRequest(getOrderDetailsList);

  const columns = useMemo(() => getColumns(), []);

  useAsyncEffect(async () => {
    await run(formParams);
  }, [JSON.stringify(formParams)]);

  function handleSearch(params: any) {
    setFormParams(cloneDeep(params));
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
            console.log(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
          },
          /*checkboxProps: (record) => {
            return {
              disabled: record.id === '4',
            };
          },*/
        }}
      />

      {visible && (
        <Arrange
          data={selectedRows}
          onClose={() => {
            setVisible(false);
            run(formParams);
          }}
        />
      )}
    </Card>
  );
}

export default PrepareMaterial;
