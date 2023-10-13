import { Grid } from '@arco-design/web-react';
import React from 'react';
import DictList from '@/pages/setting/dictionary/dict-list';
import DictTable from '@/pages/setting/dictionary/dict-table';
import { atom, RecoilState } from 'recoil';
const { Row, Col } = Grid;

export const selectedDictState: RecoilState<any> = atom({
  key: 'selectedDictState',
  default: {},
});
const RoleIndex = () => {
  return (
    <>
      <Row gutter={20}>
        <Col span={8}>
          <DictList />
        </Col>
        <Col span={16}>
          <DictTable />
        </Col>
      </Row>
    </>
  );
};

export default RoleIndex;
