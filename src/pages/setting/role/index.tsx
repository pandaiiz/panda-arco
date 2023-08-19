import { Grid } from '@arco-design/web-react';
import React from 'react';
import RoleList from '@/pages/setting/role/role-list';
import MenuList from '@/pages/setting/role/menu-list';
import { atom, RecoilState } from 'recoil';
const { Row, Col } = Grid;

export const selectedRoleState: RecoilState<{
  id?: string;
  menus?: any[];
}> = atom({
  key: 'selectedRoleState',
  default: {
    menus: [],
  },
});
const RoleIndex = () => {
  return (
    <>
      <Row gutter={20}>
        <Col span={6}>
          <RoleList />
        </Col>
        <Col span={18}>
          <MenuList />
        </Col>
      </Row>
    </>
  );
};

export default RoleIndex;
