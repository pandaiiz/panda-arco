import React, { useState } from 'react';
import { Card, Tabs } from '@arco-design/web-react';

import InfoHeader from './header';
import InfoForm from './info';
import Security from './security';
import './mock';
import Verified from './verified';
import { useRecoilState } from 'recoil';
import { commonState } from '@/store';

function UserInfo() {
  const [{ userInfo, userLoading }] = useRecoilState(commonState);
  const [activeTab, setActiveTab] = useState('basic');
  return (
    <div>
      <Card style={{ padding: '14px 20px' }}>
        <InfoHeader userInfo={userInfo} loading={userLoading} />
      </Card>
      <Card style={{ marginTop: '16px' }}>
        <Tabs activeTab={activeTab} onChange={setActiveTab} type="rounded">
          <Tabs.TabPane key="basic" title={['userSetting.title.basicInfo']}>
            <InfoForm loading={userLoading} />
          </Tabs.TabPane>
          <Tabs.TabPane key="security" title={['userSetting.title.security']}>
            <Security />
          </Tabs.TabPane>
          <Tabs.TabPane key="verified" title={['userSetting.label.verified']}>
            <Verified />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default UserInfo;
