import React from 'react';

import {
  Input,
  Button,
  Form,
  Space,
  Message,
  Skeleton,
} from '@arco-design/web-react';

function InfoForm({ loading }: { loading?: boolean }) {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      await form.validate();
      Message.success('保存成功！');
    } catch (_) {}
  };

  const handleReset = () => {
    form.resetFields();
  };

  const loadingNode = (rows = 1) => {
    return (
      <Skeleton
        text={{
          rows,
          width: new Array(rows).fill('100%'),
        }}
        animation
      />
    );
  };

  return (
    <Form
      style={{ width: '500px', marginTop: '6px' }}
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <Form.Item
        label="手机号"
        field="phone"
        rules={[{ required: true, message: '请输入手机号' }]}
      >
        {loading ? loadingNode() : <Input placeholder="请输入手机号" />}
      </Form.Item>
      <Form.Item
        label="姓名"
        field="name"
        rules={[{ required: true, message: ['请输入您的姓名'] }]}
      >
        {loading ? loadingNode() : <Input placeholder={'请输入您的姓名'} />}
      </Form.Item>

      <Form.Item label=" ">
        <Space>
          <Button type="primary" onClick={handleSave}>
            保存
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default InfoForm;
