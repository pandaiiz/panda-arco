import React from 'react';
import {
  Form,
  Input,
  Button,
  Grid,
  Space,
  Select,
} from '@arco-design/web-react';

import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import { useRequest } from 'ahooks';
import { getEnum } from '@/utils/commonService';
import { cloneDeep } from 'lodash';
import { filterOption } from '@/utils/common';

const { Row, Col } = Grid;
const { useForm } = Form;

function SearchForm(props: {
  onSearch: (values: Record<string, any>) => void;
}) {
  const [form] = useForm();
  const { data: categoryEnum } = useRequest(() => getEnum('CATEGORY'));

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
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="单号" field="orderNumber">
              <Input allowClear placeholder="单号" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="品名" field="category">
              <Select
                placeholder="请选择品名"
                allowClear
                showSearch
                filterOption={filterOption}
              >
                {categoryEnum?.map((item: any) => (
                  <Select.Option key={item.id} value={item.key}>
                    {item.title}
                  </Select.Option>
                ))}
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
