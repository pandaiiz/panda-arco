import React from 'react';

import {
  Input,
  Select,
  Cascader,
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
      Message.success('userSetting.saveSuccess');
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
        label={['userSetting.info.email']}
        field="email"
        rules={[
          {
            type: 'email',
            required: true,
            message: ['userSetting.info.email.placeholder'],
          },
        ]}
      >
        {loading ? (
          loadingNode()
        ) : (
          <Input placeholder={'userSetting.info.email.placeholder'} />
        )}
      </Form.Item>
      <Form.Item
        label={['userSetting.info.nickName']}
        field="nickName"
        rules={[
          {
            required: true,
            message: ['userSetting.info.nickName.placeholder'],
          },
        ]}
      >
        {loading ? (
          loadingNode()
        ) : (
          <Input placeholder={'userSetting.info.nickName.placeholder'} />
        )}
      </Form.Item>
      <Form.Item
        label={['userSetting.info.area']}
        field="rangeArea"
        rules={[
          { required: true, message: ['userSetting.info.area.placeholder'] },
        ]}
      >
        {loading ? (
          loadingNode()
        ) : (
          <Select
            options={['中国']}
            placeholder={'userSetting.info.area.placeholder'}
          />
        )}
      </Form.Item>
      <Form.Item
        label={['userSetting.info.location']}
        field="location"
        initialValue={['BeiJing', 'BeiJing', 'HaiDian']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        {loading ? (
          loadingNode()
        ) : (
          <Cascader
            options={[
              {
                label: '北京市',
                value: 'BeiJing',
                children: [
                  {
                    label: '北京市',
                    value: 'BeiJing',
                    children: [
                      { label: '海淀区', value: 'HaiDian' },
                      { label: '朝阳区', value: 'ChaoYang' },
                    ],
                  },
                ],
              },
              {
                label: '上海市',
                value: 'ShangHai',
                children: [
                  {
                    label: '上海市',
                    value: 'ShangHai',
                    children: [
                      { label: '黄浦区', value: 'HuangPu' },
                      { label: '静安区', value: 'JingAn' },
                    ],
                  },
                ],
              },
            ]}
          />
        )}
      </Form.Item>
      <Form.Item label={['userSetting.info.address']} field="address">
        {loading ? (
          loadingNode()
        ) : (
          <Input placeholder={'userSetting.info.address.placeholder'} />
        )}
      </Form.Item>
      <Form.Item label={['userSetting.info.profile']} field="profile">
        {loading ? (
          loadingNode(3)
        ) : (
          <Input.TextArea
            placeholder={'userSetting.info.profile.placeholder'}
          />
        )}
      </Form.Item>

      <Form.Item label=" ">
        <Space>
          <Button type="primary" onClick={handleSave}>
            {['userSetting.save']}
          </Button>
          <Button onClick={handleReset}>{['userSetting.reset']}</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default InfoForm;
