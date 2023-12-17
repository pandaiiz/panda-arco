import { Grid } from '@arco-design/web-react';
import React, { useState } from 'react';
import DictList from '@/pages/setting/dictionary/dict-list';
import DictTable from '@/pages/setting/dictionary/dict-table';
import { atom, RecoilState } from 'recoil';
import DictContext from '@/pages/setting/dictionary/context';
const { Row, Col } = Grid;

const DictIndex = () => {
  const [currentDict, SetCurrentDict] = useState<any>({});
  return (
    <DictContext.Provider value={currentDict}>
      <Row gutter={20}>
        <Col span={8}>
          <DictList setCurrentDict={SetCurrentDict} />
        </Col>
        <Col span={16}>
          <DictTable />
        </Col>
      </Row>
    </DictContext.Provider>
  );
};

export default DictIndex;
