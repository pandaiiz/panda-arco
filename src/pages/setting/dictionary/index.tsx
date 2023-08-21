import { Grid } from '@arco-design/web-react';
import React from 'react';
import DictList from '@/pages/setting/dictionary/dict-list';
import DictTable from '@/pages/setting/dictionary/dict-table';
import { atom, RecoilState } from 'recoil';
const { Row, Col } = Grid;

// 字典请求方式
/*const { data: dictionaryItemList } = useSWRImmutable(
    { url: '/api/dictionary/key/CIRCLE' },
    getFetcher
);*/

export const selectedDictState: RecoilState<any> = atom({
  key: 'selectedDictState',
  default: {},
});
const RoleIndex = () => {
  return (
    <>
      <Row gutter={20}>
        <Col span={6}>
          <DictList />
        </Col>
        <Col span={18}>
          <DictTable />
        </Col>
      </Row>
    </>
  );
};

export default RoleIndex;
