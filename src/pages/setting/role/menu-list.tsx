import React, { useEffect, useState } from 'react';
import {
  Tree,
  Button,
  Card,
  Empty,
  Space,
  Message,
} from '@arco-design/web-react';
import useSWR from 'swr';
import { getFetcher, patchFetcher } from '@/utils/request';
import { useRecoilValue } from 'recoil';
import { selectedRoleState } from '@/pages/setting/role/index';
import useSWRMutation from 'swr/mutation';

function MenuList() {
  const selectedRole = useRecoilValue(selectedRoleState);
  const { data: menuList, isLoading } = useSWR(
    { url: '/api/menu' },
    getFetcher
  );
  const { trigger: updateRoleTrigger } = useSWRMutation(
    '/api/role',
    patchFetcher
  );

  const allCheckedKeys = menuList?.map((item) => item.id);
  const [checkedKeys, setCheckedKeys] = useState([]);

  useEffect(() => {
    setCheckedKeys(selectedRole?.menus?.map((item) => item.menuId));
  }, [selectedRole]);

  return (
    <Card
      title="角色权限"
      style={{ width: '100%' }}
      loading={isLoading}
      extra={
        selectedRole?.id && (
          <Space>
            <Button
              type="text"
              onClick={() =>
                setCheckedKeys(checkedKeys.length ? [] : allCheckedKeys)
              }
            >
              {checkedKeys.length ? '取消选择' : '全选'}
            </Button>
            <Button
              type="text"
              onClick={async () => {
                await updateRoleTrigger({
                  data: { menus: checkedKeys },
                  id: selectedRole?.id,
                });
                Message.success('保存成功！');
              }}
            >
              保存
            </Button>
          </Space>
        )
      }
    >
      {selectedRole?.id ? (
        <>
          {menuList?.length > 0 && (
            <Tree
              checkable
              selectable={false}
              checkedKeys={checkedKeys}
              onCheck={(keys, extra) => {
                console.log(keys, extra);
                setCheckedKeys(keys);
              }}
              treeData={menuList}
              autoExpandParent
              fieldNames={{ key: 'id', title: 'name' }}
            />
          )}
        </>
      ) : (
        <Empty description="请先选择左侧的角色" />
      )}
    </Card>
  );
}

export default MenuList;
