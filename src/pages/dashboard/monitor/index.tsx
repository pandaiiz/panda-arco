import { Space } from '@arco-design/web-react';
import React from 'react';
import ChatPanel from './chat-panel';
import Studio from './studio';
import DataStatistic from './data-statistic';
import StudioStatus from './studio-status';
import QuickOperation from './quick-operation';
import StudioInformation from './studio-information';
import styles from './style/index.module.less';
import './mock';
import { useRecoilState } from 'recoil';
import { commonState } from '@/store';

export default function Monitor() {
  const [{ userInfo }] = useRecoilState(commonState);
  return (
    <div>
      <div className={styles.layout}>
        <div className={styles['layout-left-side']}>
          <ChatPanel />
        </div>
        <div className={styles['layout-content']}>
          <Space size={16} direction="vertical" style={{ width: '100%' }}>
            <Studio userInfo={userInfo} />
            <DataStatistic />
          </Space>
        </div>
        <div className={styles['layout-right-side']}>
          <Space size={16} direction="vertical" style={{ width: '100%' }}>
            <StudioStatus />
            <QuickOperation />
            <StudioInformation />
          </Space>
        </div>
      </div>
    </div>
  );
}
