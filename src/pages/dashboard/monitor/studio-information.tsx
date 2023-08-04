import { Card, Typography, Form, Input, Button } from '@arco-design/web-react';
import React from 'react';

export default function StudioInformation() {
  return (
    <Card>
      <Typography.Title style={{ marginTop: 0, marginBottom: 16 }} heading={6}>
        {['monitor.title.studioInfo']}
      </Typography.Title>
      <Form layout="vertical">
        <Form.Item label={['monitor.studioInfo.label.studioTitle']} required>
          <Input
            placeholder={`王立群${[
              'monitor.studioInfo.placeholder.studioTitle',
            ]}`}
          />
        </Form.Item>
        <Form.Item
          label={['monitor.studioInfo.label.onlineNotification']}
          required
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label={['monitor.studioInfo.label.studioCategory']} required>
          <Input.Search />
        </Form.Item>
        <Form.Item label={['monitor.studioInfo.label.studioCategory']} required>
          <Input.Search />
        </Form.Item>
      </Form>
      <Button type="primary">更新</Button>
    </Card>
  );
}
