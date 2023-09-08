import React, { useState, useMemo } from 'react';
import { Table, Card, Button, Space, Typography } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';

import SearchForm from './form';

import styles from './style/index.module.less';
import { getColumns } from './constants';
import useSWRImmutable from 'swr/immutable';
import { getFetcher } from '@/utils/request';
import { useAsyncEffect, useRequest } from 'ahooks';
import Edit from '@/pages/setting/user/edit';
import { getUsersByPaging } from '@/pages/setting/user/service';

const { Title } = Typography;

function UsersTable() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});

  const [formParams, setFormParams] = useState({ pageSize: 10, current: 1 });

  const {
    data: dataList,
    mutate: fetchDataList,
    isLoading,
  } = useSWRImmutable(
    { url: '/api/specifications/paging', params: formParams },
    getFetcher
  );

  useRequest(() => getUsersByPaging(formParams));

  const tableCallback = async (record: any, type: any) => {
    switch (type) {
      case 'delete':
        // await trigger(record.id);
        // await mutate();
        break;
      case 'detail':
        setData(record);
        setVisible(true);
        break;
    }
  };

  const columns = useMemo(() => getColumns(tableCallback), []);

  useAsyncEffect(async () => {
    await fetchDataList(formParams);
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
    setFormParams({ ...params, pageSize: formParams.pageSize, current: 1 });
  }

  return (
    <Card>
      <Title heading={6}>款式列表</Title>
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
        </Space>
      </div>
      <Table
        rowKey="id"
        loading={isLoading}
        onChange={onChangeTable}
        pagination={{
          sizeCanChange: true,
          showTotal: true,
          pageSizeChangeResetCurrent: true,
          current: formParams.current,
          pageSize: formParams.pageSize,
        }}
        columns={columns}
        data={dataList?.data}
      />

      {visible && (
        <Edit
          data={data}
          onClose={() => {
            setVisible(false);
          }}
        />
      )}
    </Card>
  );
}

export default UsersTable;
