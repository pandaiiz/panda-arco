import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  Card,
  PaginationProps,
  Button,
  Space,
  Typography,
} from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';

import SearchForm from './form';

import styles from './style/index.module.less';
import { getColumns } from './constants';
import useSWRImmutable from 'swr/immutable';
import { getFetcher } from '@/utils/request';

const { Title } = Typography;
export const Status = ['已上线', '未上线'];

function UserTable() {
  const [formParams, setFormParams] = useState({ pageSize: 10, current: 1 });

  const {
    data: userList,
    mutate: fetchUserList,
    isLoading,
  } = useSWRImmutable(
    { url: '/api/user/paging', params: formParams },
    getFetcher
  );

  const tableCallback = async (record, type) => {
    console.log(record, type);
  };

  const columns = useMemo(() => getColumns(tableCallback), []);

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(formParams)]);

  async function fetchData() {
    await fetchUserList(formParams);
  }

  function onChangeTable({ current, pageSize }) {
    setFormParams({
      ...formParams,
      current,
      pageSize,
    });
  }

  function handleSearch(params) {
    setFormParams({ ...params, pageSize: formParams.pageSize, current: 1 });
  }

  return (
    <Card>
      <Title heading={6}>用户列表</Title>
      <SearchForm onSearch={handleSearch} />
      <div className={styles['button-group']}>
        <Space>
          <Button type="primary" icon={<IconPlus />}>
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
        data={userList?.data}
      />
    </Card>
  );
}

export default UserTable;
