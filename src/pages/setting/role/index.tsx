import { Card, Empty, Grid } from '@arco-design/web-react';
import React from 'react';
import RoleList from '@/pages/setting/role/role-list';
const { Row, Col } = Grid;

const RoleIndex = () => {
  return (
    <>
      <Row gutter={20}>
        <Col span={6}>
          <RoleList />
        </Col>
        <Col span={18}>
          <Card title="角色权限" style={{ width: '100%' }}>
            <Empty />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default RoleIndex;
