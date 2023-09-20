import React, { useState, useMemo } from 'react';
import { Table, Card, Button, Space, Typography } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';

import SearchForm from './form';

import styles from './style/index.module.less';
import { getColumns } from './constants';
import { useAsyncEffect, useRequest } from 'ahooks';
import Edit from '@/pages/setting/user/edit';
import { deleteUserById, getUserByPaging } from '@/pages/setting/user/service';
import dayjs from 'dayjs';

const { Title } = Typography;

function UserTable() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});

  const [formParams, setFormParams] = useState<any>({
    pageSize: 10,
    current: 1,
  });
  const { data: dataList, loading, run } = useRequest(getUserByPaging);

  const tableCallback = async (record: any, type: any) => {
    switch (type) {
      case 'delete':
        await deleteUserById(record.id);
        setFormParams({ ...formParams, current: 1, unixTime: dayjs().unix() });
        break;
      case 'edit':
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
    });
  }

  function handleSearch(
    params: React.SetStateAction<{ pageSize: number; current: number }>
  ) {
    setFormParams({ ...params, pageSize: formParams.pageSize, current: 1 });
  }

  return (
    <Card>
      <Title heading={6}>用户列表</Title>
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
        loading={loading}
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
            run(formParams);
            setData({});
            setVisible(false);
          }}
        />
      )}
    </Card>
  );
}

export default UserTable;
