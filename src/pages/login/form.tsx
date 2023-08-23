import { Form, Input, Button, Space } from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useRef } from 'react';

import styles from './style/index.module.less';
import { useRequest } from 'ahooks';
import { login } from '@/pages/login/service';

export default function LoginForm() {
  const { data, loading, run } = useRequest(login, {
    manual: true,
  });
  const formRef = useRef<FormInstance>();

  useEffect(() => afterLoginSuccess(), [data]);
  function afterLoginSuccess() {
    if (data?.accessToken) {
      // 记录登录状态
      localStorage.setItem('userStatus', 'login');
      localStorage.setItem('X-Token', data.accessToken);
      // 跳转首页
      window.location.href = '/';
    }
  }

  async function onSubmitClick() {
    const values = await formRef.current.validate();
    await run(values);
  }

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>Cyan</div>
      <Form
        className={styles['login-form']}
        layout="vertical"
        ref={formRef}
        initialValues={{ account: 'wwhcer', password: 'secret42' }}
      >
        <Form.Item
          field="account"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={'用户名'}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={'密码'}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            登录
          </Button>
        </Space>
      </Form>
    </div>
  );
}
