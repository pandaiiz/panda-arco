import { Table, Tag, Typography } from '@arco-design/web-react';
import React from 'react';

import styles from './style/index.module.less';

export default function QuickOperation() {
  const columns = [
    {
      title: ['monitor.list.title.order'],
      render: (_col, _record, index) => <span>{index + 1}</span>,
    },
    {
      title: ['monitor.list.title.cover'],
      dataIndex: 'cover',
      render: (_col, record) => (
        <div className={styles['data-statistic-list-cover-wrapper']}>
          <img src={record.cover} />
          {record.status === -1 && (
            <Tag
              color="red"
              className={styles['data-statistic-list-cover-tag']}
            >
              {['monitor.list.tag.auditFailed']}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: ['monitor.list.title.name'],
      dataIndex: 'name',
    },
    {
      dataIndex: 'duration',
      title: ['monitor.list.title.duration'],
    },
    {
      dataIndex: 'id',
      title: ['monitor.list.title.id'],
    },
  ];
  const data = [
    {
      cover:
        'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp',
      name: '视频直播',
      duration: '00:05:19',
      id: '54e23ade',
      status: -1,
    },
  ];
  return (
    <div className={styles['']}>
      <Table
        columns={columns}
        data={data}
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
        }}
        border={false}
        pagination={false}
      />
      <Typography.Text
        type="secondary"
        className={styles['data-statistic-list-tip']}
      >
        {['monitor.list.tip.rotations']}
        {data.length}
        {['monitor.list.tip.rest']}
      </Typography.Text>
    </div>
  );
}
