import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  Empty,
  Message,
  Space,
  Table,
} from '@arco-design/web-react';
import { deleteFetcher, getFetcher } from '@/utils/request';
import { useRecoilValue } from 'recoil';
import { selectedDictState } from '@/pages/setting/dictionary';
import styles from '@/pages/setting/user/style/index.module.less';
import { IconPlus } from '@arco-design/web-react/icon';
import { getColumns } from '@/pages/setting/dictionary/dict-table/constants';
import Edit from '@/pages/setting/dictionary/dict-table/edit';
import useSWRMutation from 'swr/mutation';
import { useAsyncEffect } from 'ahooks';

function DictTable() {
  const selectedDict = useRecoilValue(selectedDictState);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const {
    data: dictItemList,
    isMutating,
    trigger: itemTrigger,
  } = useSWRMutation(
    { url: `/api/dictionary/item/${selectedDict?.id}` },
    getFetcher
  );

  const { trigger } = useSWRMutation(`/api/dictionary/item`, deleteFetcher);

  useAsyncEffect(async () => {
    await itemTrigger();
  }, [selectedDict?.id]);

  const tableCallback = async (record: any, type: any) => {
    if (type === 'edit') {
      setData(record);
      setVisible(true);
    }
    if (type === 'delete') {
      await trigger(record.id);
      Message.success('删除成功！');
      await itemTrigger();
    }
  };
  const columns = useMemo(() => getColumns(tableCallback), []);

  return (
    <Card title="字典详情" style={{ width: '100%' }}>
      {selectedDict?.id ? (
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
            loading={isMutating}
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
            await itemTrigger();
          }}
        />
      )}
    </Card>
  );
}

export default DictTable;
