import React, { useState } from 'react';
import {
  Steps,
  Form,
  Input,
  Select,
  DatePicker,
  InputTag,
  Button,
  Typography,
  Space,
  Card,
  Switch,
  Result,
} from '@arco-design/web-react';

import styles from './style/index.module.less';
const RangePicker: any = DatePicker.RangePicker; //写上any会是正确的

const { Title, Paragraph } = Typography;
function StepForm() {
  const [current, setCurrent] = useState(1);

  const [form] = Form.useForm();

  const viewForm = () => {
    const values = form.getFields();
    form.setFields(values);
    setCurrent(1);
  };

  const reCreateForm = () => {
    form.resetFields();
    setCurrent(1);
  };

  const toNext = async () => {
    try {
      await form.validate();
      setCurrent(current + 1);
    } catch (_) {}
  };
  return (
    <div className={styles.container}>
      <Card>
        <Title heading={5}>{['stepForm.desc.basicInfo']}</Title>
        <div className={styles.wrapper}>
          <Steps current={current} lineless>
            <Steps.Step
              title={['stepForm.title.basicInfo']}
              description={['stepForm.desc.basicInfo']}
            />
            <Steps.Step
              title={['stepForm.title.channel']}
              description={['stepForm.desc.channel']}
            />
            <Steps.Step
              title={['stepForm.title.created']}
              description={['stepForm.desc.created']}
            />
          </Steps>
          <Form form={form} className={styles.form}>
            {current === 1 && (
              <Form.Item noStyle>
                <Form.Item
                  label={['stepForm.basicInfo.name']}
                  required
                  field="basic.name"
                  rules={[
                    {
                      required: true,
                      message: ['stepForm.basicInfo.name.required'],
                    },
                    {
                      validator: (value: string, callback) => {
                        if (!/^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/g.test(value)) {
                          callback(['stepForm.basicInfo.name.placeholder']);
                        }
                      },
                    },
                  ]}
                >
                  <Input
                    placeholder={['stepForm.basicInfo.name.placeholder']}
                  />
                </Form.Item>
                <Form.Item
                  label={['stepForm.basicInfo.channelType']}
                  required
                  initialValue="app"
                  field="basic.channelType"
                  rules={[
                    {
                      required: true,
                      message: ['stepForm.basicInfo.channelType.required'],
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="app">APP通用渠道</Select.Option>
                    <Select.Option value="site">网页通用渠道</Select.Option>
                    <Select.Option value="game">游戏通用渠道</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label={['stepForm.basicInfo.time']}
                  required
                  field="basic.time"
                  rules={[
                    {
                      required: true,
                      message: ['stepForm.basicInfo.time.required'],
                    },
                  ]}
                >
                  <RangePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  label={['stepForm.basicInfo.link']}
                  required
                  extra={['stepForm.basicInfo.link.tips']}
                  field="basic.link"
                  initialValue={'https://arco.design'}
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder={['stepForm.basicInfo.link.placeholder']}
                  />
                </Form.Item>
              </Form.Item>
            )}
            {current === 2 && (
              <Form.Item noStyle>
                <Form.Item
                  label={['stepForm.channel.source']}
                  required
                  field="channel.source"
                  rules={[
                    {
                      required: true,
                      message: ['stepForm.channel.source.required'],
                    },
                  ]}
                >
                  <Input
                    placeholder={['stepForm.channel.source.placeholder']}
                  />
                </Form.Item>
                <Form.Item
                  label={['stepForm.channel.media']}
                  required
                  field="channel.media"
                  rules={[
                    {
                      required: true,
                      message: ['stepForm.channel.media.required'],
                    },
                  ]}
                >
                  <Input placeholder={['stepForm.channel.media.placeholder']} />
                </Form.Item>
                <Form.Item
                  label={['stepForm.channel.keywords']}
                  required
                  field="channel.keywords"
                  initialValue={['今日头条', '火山']}
                  rules={[{ required: true }]}
                >
                  <InputTag />
                </Form.Item>
                <Form.Item
                  label={['stepForm.channel.remind']}
                  required
                  initialValue={true}
                  field="channel.remind"
                  triggerPropName="checked"
                  rules={[{ required: true }]}
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label={['stepForm.channel.content']}
                  required
                  field="channel.content"
                  rules={[
                    {
                      required: true,
                      message: ['stepForm.channel.content.required'],
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder={['stepForm.channel.content.placeholder']}
                  />
                </Form.Item>
              </Form.Item>
            )}
            {current !== 3 ? (
              <Form.Item label=" ">
                <Space>
                  {current === 2 && (
                    <Button
                      size="large"
                      onClick={() => setCurrent(current - 1)}
                    >
                      {['stepForm.prev']}
                    </Button>
                  )}
                  {current !== 3 && (
                    <Button type="primary" size="large" onClick={toNext}>
                      {['stepForm.next']}
                    </Button>
                  )}
                </Space>
              </Form.Item>
            ) : (
              <Form.Item noStyle>
                <Result
                  status="success"
                  title={['stepForm.created.success.title']}
                  subTitle={['stepForm.created.success.desc']}
                  extra={[
                    <Button
                      key="reset"
                      style={{ marginRight: 16 }}
                      onClick={viewForm}
                    >
                      {['stepForm.created.success.view']}
                    </Button>,
                    <Button key="again" type="primary" onClick={reCreateForm}>
                      {['stepForm.created.success.again']}
                    </Button>,
                  ]}
                />
              </Form.Item>
            )}
          </Form>
        </div>
        {current === 3 && (
          <div className={styles['form-extra']}>
            <Title heading={6}>{['stepForm.created.extra.title']}</Title>
            <Paragraph type="secondary">
              {['stepForm.created.extra.desc']}
              <Button type="text">{['stepForm.created.extra.detail']}</Button>
            </Paragraph>
          </div>
        )}
      </Card>
    </div>
  );
}

export default StepForm;
