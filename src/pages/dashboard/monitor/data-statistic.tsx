import { Button, Card, Radio, Tabs } from '@arco-design/web-react';
import React from 'react';

import DataStatisticList from './data-statistic-list';
import styles from './style/index.module.less';

export default function DataStatistic() {
  return (
    <Card>
      <Tabs defaultActiveTab="liveMethod">
        <Tabs.TabPane
          key="liveMethod"
          title={['monitor.tab.title.liveMethod']}
        />
        <Tabs.TabPane
          key="onlineUsers"
          title={['monitor.tab.title.onlineUsers']}
        />
      </Tabs>
      <div className={styles['data-statistic-content']}>
        <Radio.Group defaultValue="3" type="button">
          <Radio value="1">{['monitor.liveMethod.normal']}</Radio>
          <Radio value="2">{['monitor.liveMethod.flowControl']}</Radio>
          <Radio value="3">{['monitor.liveMethod.video']}</Radio>
          <Radio value="4">{['monitor.liveMethod.web']}</Radio>
        </Radio.Group>

        <div className={styles['data-statistic-list-wrapper']}>
          <div className={styles['data-statistic-list-header']}>
            <Button type="text">{['monitor.editCarousel']}</Button>
            <Button disabled>{['monitor.startCarousel']}</Button>
          </div>
          <div className={styles['data-statistic-list-content']}>
            <DataStatisticList />
          </div>
        </div>
      </div>
    </Card>
  );
}
