import React, { useState, useMemo } from 'react';
import { Table, Card, Button, Space } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';

import styles from './style/index.module.less';
import { getColumns } from './constants';
import Edit from './edit';
import { useRequest } from 'ahooks';
import { deleteMenuById, getMenus } from '@/pages/setting/menu/service';

function Menu() {
  const [visible, setVisible] = useState(false);

  const { data: menuList, loading, refresh } = useRequest(getMenus);

  const [data, setData] = useState({});

  const tableCallback = async (record, type) => {
    switch (type) {
      case 'delete':
        await deleteMenuById(record.id);
        refresh();
        break;
      case 'edit':
        setData(record);
        setVisible(true);
        break;
    }
  };
  const columns = useMemo(() => getColumns(tableCallback), []);

  const modalClose = async () => {
    setVisible(false);
    refresh();
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
          loading={loading}
          columns={columns}
          data={menuList}
          defaultExpandAllRows={true}
        />
      )}
    </Card>
  );
}

export default Menu;
