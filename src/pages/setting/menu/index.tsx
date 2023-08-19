import React, { useState, useMemo } from 'react';
import { Table, Card, Button, Space } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';

import styles from './style/index.module.less';
import { getColumns } from './constants';
import Edit from './edit';
import useSWR from 'swr';
import { deleteFetcher, getFetcher } from '@/utils/request';
import useSWRMutation from 'swr/mutation';

function SearchTable() {
  const [visible, setVisible] = useState(false);

  const { data: menuList, isLoading } = useSWR(
    { url: '/api/menu' },
    getFetcher
  );
  const { trigger, reset } = useSWRMutation(`/api/menu`, deleteFetcher);

  const [data, setData] = useState({});

  const tableCallback = async (record, type) => {
    switch (type) {
      case 'delete':
        await trigger(record.id);
        reset();
        break;
      case 'edit':
        setData(record);
        setVisible(true);
        break;
    }
  };
  const columns = useMemo(() => getColumns(tableCallback), []);

  const modalClose = () => {
    setVisible(false);
    // mutate();
  };
  return (
    <Card>
      {visible && <Edit data={data} onClose={modalClose} />}
      <div className={styles['button-group']}>
        <Space>
          <Button
            type="primary"
            icon={<IconPlus />}
            onClick={() => {
              setData({});
              setVisible(true);
            }}
          >
            新建
          </Button>
        </Space>
      </div>
      {menuList?.length > 0 && (
        <Table
          rowKey="id"
          pagination={false}
          loading={isLoading}
          columns={columns}
          data={menuList}
          defaultExpandAllRows={true}
        />
      )}
    </Card>
  );
}

export default SearchTable;