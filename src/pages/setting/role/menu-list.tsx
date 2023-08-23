import React, { useEffect, useState } from 'react';
import {
  Tree,
  Button,
  Card,
  Empty,
  Space,
  Message,
} from '@arco-design/web-react';
import { useRecoilValue } from 'recoil';
import { selectedRoleState } from '@/pages/setting/role/index';
import { useRequest } from 'ahooks';
import { getMenus } from '@/pages/setting/menu/service';
import { updateRole } from '@/pages/setting/role/service';

function MenuList() {
  const selectedRole = useRecoilValue(selectedRoleState);
  const { data: menuList, loading } = useRequest(getMenus);

  const allCheckedKeys = menuList?.map((item: { id: string }) => item.id);
  const [checkedKeys, setCheckedKeys] = useState([]);

  useEffect(() => {
    setCheckedKeys(selectedRole?.menus?.map((item) => item.menuId) || []);
  }, [selectedRole]);

  return (
    <Card
      title="角色权限"
      style={{ width: '100%' }}
      loading={loading}
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
                await updateRole(selectedRole?.id, { menus: checkedKeys });
                Message.success('保存成功！');
                setTimeout(() => window.location.reload(), 500);
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
              onCheck={(keys) => {
                setCheckedKeys(keys);
              }}
              treeData={menuList}
              autoExpandParent
              fieldNames={{ key: 'id' }}
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
