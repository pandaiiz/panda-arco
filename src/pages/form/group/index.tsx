import React, { useState, useRef } from 'react';
import {
  Typography,
  Card,
  Form,
  Select,
  Input,
  Grid,
  Space,
  Button,
  Message,
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import axios from 'axios';

import styles from './style/index.module.less';
import './mock';

function GroupForm() {
  const formRef = useRef<FormInstance>();
  const [loading, setLoading] = useState(false);

  function submit(data) {
    setLoading(true);
    axios
      .post('/api/groupForm', {
        data,
      })
      .then(() => {
        Message.success(['groupForm.submitSuccess']);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleSubmit() {
    formRef.current.validate().then((values) => {
      submit(values);
    });
  }

  function handleReset() {
    formRef.current.resetFields();
  }

  return (
    <div className={styles.container}>
      <Form layout="vertical" ref={formRef} className={styles['form-group']}>
        <Card>
          <Typography.Title heading={6}>
            {['groupForm.title.video']}
          </Typography.Title>
          <Grid.Row gutter={80}>
            <Grid.Col span={8}>
              <Form.Item
                label={['groupForm.form.label.video.mode']}
                field="video.mode"
                initialValue={'custom'}
              >
                <Select placeholder={['groupForm.placeholder.video.mode']}>
                  <Select.Option value="custom">自定义</Select.Option>
                  <Select.Option value="mode1">模式1</Select.Option>
                  <Select.Option value="mode2">模式2</Select.Option>
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={['groupForm.form.label.video.acquisition.resolution']}
                field="video.acquisition.resolution"
              >
                <Select
                  placeholder={[
                    'groupForm.placeholder.video.acquisition.resolution',
                  ]}
                >
                  <Select.Option value="resolution1">分辨率1</Select.Option>
                  <Select.Option value="resolution2">分辨率2</Select.Option>
                  <Select.Option value="resolution3">分辨率3</Select.Option>
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={['groupForm.form.label.video.acquisition.frameRate']}
                field="video.acquisition.frameRate"
              >
                <Input
                  placeholder={[
                    'groupForm.placeholder.video.acquisition.frameRate',
                  ]}
                  addAfter="fps"
                />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={80}>
            <Grid.Col span={8}>
              <Form.Item
                label={['groupForm.form.label.video.encoding.resolution']}
                field="video.encoding.resolution"
              >
                <Select
                  placeholder={[
                    'groupForm.placeholder.video.encoding.resolution',
                  ]}
                >
                  <Select.Option value="resolution1">分辨率1</Select.Option>
                  <Select.Option value="resolution2">分辨率2</Select.Option>
                  <Select.Option value="resolution3">分辨率3</Select.Option>
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={['groupForm.form.label.video.encoding.rate.min']}
                field="video.encoding.rate.min"
              >
                <Input
                  placeholder={[
                    'groupForm.placeholder.video.encoding.rate.min',
                  ]}
                  addAfter="bps"
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={['groupForm.form.label.video.encoding.rate.max']}
                field="video.encoding.rate.max"
              >
                <Input
                  placeholder={[
                    'groupForm.placeholder.video.encoding.rate.max',
                  ]}
                  addAfter="bps"
                />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={80}>
            <Grid.Col span={8}>
              <Form.Item
                label={['groupForm.form.label.video.encoding.rate.default']}
                field="video.encoding.rate.default"
              >
                <Input
                  placeholder={[
                    'groupForm.placeholder.video.encoding.rate.default',
                  ]}
                  addAfter="bps"
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={['groupForm.form.label.video.encoding.frameRate']}
                field="video.encoding.frameRate"
              >
                <Input
                  placeholder={[
                    'groupForm.placeholder.video.encoding.frameRate',
                  ]}
                  addAfter="fps"
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={['groupForm.form.label.video.encoding.profile']}
                field="video.encoding.profile"
              >
                <Input
                  placeholder={['groupForm.placeholder.video.encoding.profile']}
                  addAfter="bps"
                />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Card>
        <Card>
          <Typography.Title heading={6}>
            {['groupForm.title.audio']}
          </Typography.Title>
          <Grid.Row gutter={80}>
            <Grid.Col span={8}>
              <Form.Item
                label={['groupForm.form.label.audio.mode']}
                initialValue={'custom'}
                field="audio.mode"
              >
                <Select placeholder={['groupForm.placeholder.audio.mode']}>
                  <Select.Option value="custom">自定义</Select.Option>
                  <Select.Option value="mode1">模式1</Select.Option>
                  <Select.Option value="mode2">模式2</Select.Option>
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={['groupForm.form.label.audio.acquisition.channels']}
                field="audio.acquisition.channels"
              >
                <Select
                  placeholder={[
                    'groupForm.placeholder.audio.acquisition.channels',
                  ]}
                >
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label={['groupForm.form.label.audio.encoding.rate']}
                field="audio.encoding.rate"
              >
                <Input
                  placeholder={['groupForm.placeholder.audio.encoding.rate']}
                  addAfter="bps"
                />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={80}>
            <Grid.Col span={8}>
              <Form.Item
                label={['groupForm.form.label.audio.encoding.profile']}
                field="audio.encoding.profile"
              >
                <Input
                  placeholder={['groupForm.placeholder.audio.encoding.profile']}
                  addAfter="fps"
                />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Card>
        <Card style={{ marginBottom: '40px' }}>
          <Typography.Title heading={6}>
            {['groupForm.title.explanation']}
          </Typography.Title>
          <Form.Item
            label={['groupForm.form.label.explanation']}
            field="audio.explanation"
          >
            <Input.TextArea
              placeholder={['groupForm.placeholder.explanation']}
            />
          </Form.Item>
        </Card>
      </Form>
      <div className={styles.actions}>
        <Space>
          <Button onClick={handleReset} size="large">
            {['groupForm.reset']}
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            size="large"
          >
            {['groupForm.submit']}
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default GroupForm;
