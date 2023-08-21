import React, { useState } from 'react';
import { Button, Card, Message, Modal, Space } from '@arco-design/web-react';
import Edit from '@/pages/setting/dictionary/dict-list/edit';
import { deleteFetcher, getFetcher } from '@/utils/request';
import { Menu } from '@arco-design/web-react';
import useSWRMutation from 'swr/mutation';
import { useRecoilState } from 'recoil';
import useSWRImmutable from 'swr/immutable';
import { selectedDictState } from '@/pages/setting/dictionary';
const MenuItem = Menu.Item;
function RoleList() {
  const [selectedDict, setSelectedDict] = useRecoilState(selectedDictState);
  const [visible, setVisible] = useState(false);
  const { data: dictionaryList, mutate } = useSWRImmutable(
    { url: '/api/dictionary' },
    getFetcher
  );
  const { trigger } = useSWRMutation(`/api/dictionary`, deleteFetcher);
  function confirm(item: { id: any }) {
    Modal.confirm({
      title: '请确认是否要删除此数据！',
      onOk: async () => {
        await trigger(item.id);
        await mutate();
        Message.success('删除成功！');
      },
    });
  }
  const modalClose = async () => {
    setVisible(false);
    await mutate();
  };
  return (
    <Card
      title="字典列表"
      style={{ width: '100%' }}
      extra={
        <Button
          type="text"
          onClick={() => {
            setSelectedDict({});
            setVisible(true);
          }}
        >
          新增
        </Button>
      }
    >
      <Menu style={{ height: '100%' }}>
        {dictionaryList?.map((item) => (
          <MenuItem
            onClick={() => {
              setSelectedDict(item);
            }}
            key={item.id}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Space>
              {item.title}({item.key})
            </Space>
            <Space>
              <Button
                type="text"
                onClick={() => {
                  setSelectedDict(item);
                  setVisible(true);
                }}
              >
                编辑
              </Button>
              <Button type="text" status="danger" onClick={() => confirm(item)}>
                删除
              </Button>
            </Space>
          </MenuItem>
        ))}
      </Menu>
      {visible && <Edit data={selectedDict} onClose={modalClose} />}
    </Card>
  );
}

export default RoleList;
