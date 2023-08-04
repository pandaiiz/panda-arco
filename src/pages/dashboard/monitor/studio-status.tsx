import React from 'react';
import {
  Card,
  Typography,
  Tag,
  Space,
  Descriptions,
} from '@arco-design/web-react';

export default function StudioStatus() {
  const dataStatus = [
    {
      label: (
        <span>
          <Typography.Text style={{ paddingRight: 8 }}>
            {['monitor.studioStatus.mainstream']}
          </Typography.Text>
          {['monitor.studioStatus.bitRate']}
        </span>
      ),
      value: '6 Mbps',
    },
    {
      label: ['monitor.studioStatus.frameRate'],
      value: '60',
    },
    {
      label: (
        <span>
          <Typography.Text style={{ paddingRight: 8 }}>
            {['monitor.studioStatus.hotStandby']}
          </Typography.Text>
          {['monitor.studioStatus.bitRate']}
        </span>
      ),
      value: '6 Mbps',
    },
    {
      label: ['monitor.studioStatus.frameRate'],
      value: '60',
    },
    {
      label: (
        <span>
          <Typography.Text style={{ paddingRight: 8 }}>
            {['monitor.studioStatus.coldStandby']}
          </Typography.Text>
          {['monitor.studioStatus.bitRate']}
        </span>
      ),
      value: '6 Mbps',
    },
    {
      label: ['monitor.studioStatus.frameRate'],
      value: '60',
    },
  ];
  const dataPicture = [
    {
      label: ['monitor.studioStatus.line'],
      value: '热备',
    },
    {
      label: 'CDN',
      value: 'KS',
    },
    {
      label: ['monitor.studioStatus.play'],
      value: 'FLV',
    },
    {
      label: ['monitor.studioStatus.pictureQuality'],
      value: '原画',
    },
  ];

  return (
    <Card>
      <Space align="start">
        <Typography.Title
          style={{ marginTop: 0, marginBottom: 16 }}
          heading={6}
        >
          {['monitor.studioStatus.title.studioStatus']}
        </Typography.Title>
        <Tag color="green">{['monitor.studioStatus.smooth']}</Tag>
      </Space>
      <Descriptions
        colon=": "
        layout="horizontal"
        data={dataStatus}
        column={2}
      />
      <Typography.Title style={{ marginBottom: 16 }} heading={6}>
        {['monitor.studioStatus.title.pictureInfo']}
      </Typography.Title>
      <Descriptions
        colon=": "
        layout="horizontal"
        data={dataPicture}
        column={2}
      />
    </Card>
  );
}
