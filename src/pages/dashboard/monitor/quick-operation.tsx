import React from 'react';
import { Button, Card, Typography, Space } from '@arco-design/web-react';
import {
  IconArrowRight,
  IconStop,
  IconSwap,
  IconTags,
} from '@arco-design/web-react/icon';

export default function QuickOperation() {
  return (
    <Card>
      <Typography.Title style={{ marginTop: 0, marginBottom: 16 }} heading={6}>
        {['monitor.title.quickOperation']}
      </Typography.Title>
      <Space direction="vertical" style={{ width: '100%' }} size={10}>
        <Button long icon={<IconTags />}>
          {['monitor.quickOperation.changeClarity']}
        </Button>
        <Button long icon={<IconSwap />}>
          {['monitor.quickOperation.switchStream']}
        </Button>
        <Button long icon={<IconStop />}>
          {['monitor.quickOperation.removeClarity']}
        </Button>
        <Button long icon={<IconArrowRight />}>
          {['monitor.quickOperation.pushFlowGasket']}
        </Button>
      </Space>
    </Card>
  );
}
