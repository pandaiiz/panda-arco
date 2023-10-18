import React from 'react';
import {
  Form,
  Input,
  Button,
  Grid,
  Space,
  InputNumber,
  Select,
  Tag,
} from '@arco-design/web-react';

import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';

const { Row, Col } = Grid;
const { useForm } = Form;

function SearchForm(props: {
  onSearch: (values: Record<string, any>) => void;
}) {
  const [form] = useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    props.onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    props.onSearch({});
  };

  return (
    <div className={styles['search-form-wrapper']}>
      <Form
        form={form}
        className={styles['search-form']}
        labelAlign="left"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 17 }}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="传递单" field="id">
              <InputNumber placeholder="传递单号" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="状态" field="status">
              <Select placeholder="状态">
                <Select.Option value={0}>未生产</Select.Option>
                <Select.Option value={1}>生产中</Select.Option>
                <Select.Option value={2}>完单</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles['right-button']}>
        <Space>
          <Button type="primary" icon={<IconSearch />} onClick={handleSubmit}>
            搜索
          </Button>
          <Button icon={<IconRefresh />} onClick={handleReset}>
            重置
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default SearchForm;
