import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  Empty,
  Message,
  Space,
  Table,
} from '@arco-design/web-react';
import styles from '@/pages/setting/user/style/index.module.less';
import { IconPlus } from '@arco-design/web-react/icon';
import { getColumns } from '@/pages/setting/dictionary/dict-table/constants';
import Edit from '@/pages/setting/dictionary/dict-table/edit';
import { useRequest } from 'ahooks';
import {
  deleteDictItemById,
  getDictsItemById,
} from '@/pages/setting/dictionary/service';
import DictContext from '@/pages/setting/dictionary/context';

function DictTable() {
  const currentDict = useContext(DictContext);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const {
    data: dictItemList,
    loading,
    run,
  } = useRequest(getDictsItemById, { manual: true });

  useEffect(() => {
    run(currentDict?.id);
  }, [currentDict?.id]);

  const tableCallback = async (record: any, type: any) => {
    if (type === 'detail') {
      setData(record);
      setVisible(true);
    }
    if (type === 'delete') {
      await deleteDictItemById(record.id);
      Message.success('删除成功！');
      run(currentDict?.id);
    }
  };
  const columns = useMemo(() => getColumns(tableCallback), []);

  return (
    <Card
      title={
        currentDict.key
          ? `${currentDict.title}（${currentDict.key}）`
          : '请先选择左侧的字典'
      }
      style={{ width: '100%' }}
    >
      {currentDict?.id ? (
        <>
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
                新增
              </Button>
            </Space>
          </div>
          <Table
            rowKey="id"
            loading={loading}
            pagination={false}
            columns={columns}
            data={dictItemList || []}
          />
        </>
      ) : (
        <Empty description="请先选择左侧的字典" />
      )}

      {visible && (
        <Edit
          data={data}
          onClose={async () => {
            setVisible(false);
            run(currentDict?.id);
          }}
        />
      )}
    </Card>
  );
}

export default DictTable;
