import React from 'react';
import { Card } from '@arco-design/web-react';

import InfoHeader from './header';
import InfoForm from './info';
import { useRecoilState } from 'recoil';
import { commonState } from '@/store';

function UserInfo() {
  const [{ userInfo, userLoading }] = useRecoilState(commonState);
  return (
    <div>
      <Card style={{ padding: '14px 20px' }}>
        <InfoHeader userInfo={userInfo} loading={userLoading} />
      </Card>
      <Card style={{ marginTop: '16px' }}>
        <InfoForm loading={userLoading} />
      </Card>
    </div>
  );
}

export default UserInfo;
