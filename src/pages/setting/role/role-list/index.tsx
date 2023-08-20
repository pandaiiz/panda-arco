import React, { useState } from 'react';
import { Button, Card, Message, Modal, Space } from '@arco-design/web-react';
import Edit from '@/pages/setting/role/role-list/edit';
import { deleteFetcher, getFetcher } from '@/utils/request';
import { Menu } from '@arco-design/web-react';
import useSWRMutation from 'swr/mutation';
import { useRecoilState } from 'recoil';
import { selectedRoleState } from '@/pages/setting/role';
import useSWRImmutable from 'swr/immutable';
const MenuItem = Menu.Item;
function RoleList() {
  const [selectedRole, setSelectedRole] = useRecoilState(selectedRoleState);
  const [visible, setVisible] = useState(false);
  const { data: roleList, mutate } = useSWRImmutable(
    { url: '/api/role' },
    getFetcher
  );
  const { trigger } = useSWRMutation(`/api/role`, deleteFetcher);
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
      title="角色列表"
      style={{ width: '100%' }}
      extra={
        <Button
          type="text"
          onClick={() => {
            setSelectedRole({});
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
            onClick={() => {
              setSelectedRole(item);
            }}
            key={item.id}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Space>{item.title}</Space>
            <Space>
              <Button
                type="primary"
                size="mini"
                onClick={() => {
                  setSelectedRole(item);
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
      {visible && <Edit data={selectedRole} onClose={modalClose} />}
    </Card>
  );
}

export default RoleList;
