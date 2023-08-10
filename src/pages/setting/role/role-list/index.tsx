import React, { useState } from 'react';
import { Button, Card, Message, Modal, Space } from '@arco-design/web-react';
import Edit from '@/pages/setting/role/role-list/edit';
import { deleteFetcher, getFetcher } from '@/utils/request';
import useSWR from 'swr';
import { Menu } from '@arco-design/web-react';
import useSWRMutation from 'swr/mutation';
const MenuItem = Menu.Item;
function RoleList() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const { data: roleList, mutate } = useSWR('/api/role', getFetcher);
  const { trigger, reset } = useSWRMutation(`/api/role`, deleteFetcher);
  function confirm(item) {
    Modal.confirm({
      title: '请确认是否要删除此数据！',
      onOk: async () => {
        await trigger(item.id);
        Message.success('删除成功！');
        reset();
      },
    });
  }
  const modalClose = () => {
    setVisible(false);
    mutate();
  };
  return (
    <Card
      title="角色列表"
      style={{ width: '100%' }}
      extra={
        <Button
          type="text"
          onClick={() => {
            setData({});
            setVisible(true);
          }}
        >
          新增
        </Button>
      }
    >
      <Menu style={{ height: '100%' }}>
        {roleList?.map((item) => (
          <MenuItem
            key={item.id}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Space>{item.name}</Space>
            <Space>
              <Button
                type="primary"
                size="mini"
                onClick={() => {
                  setData(item);
                  setVisible(true);
                }}
              >
                编辑
              </Button>
              <Button
                type="primary"
                status="danger"
                size="mini"
                onClick={() => confirm(item)}
              >
                删除
              </Button>
            </Space>
          </MenuItem>
        ))}
      </Menu>
      {visible && <Edit data={data} onClose={modalClose} />}
    </Card>
  );
}

export default RoleList;
