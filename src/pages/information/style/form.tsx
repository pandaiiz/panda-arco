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
import { filterOption } from '@/utils/common';
import { useRequest } from 'ahooks';
import { getEnum } from '@/utils/commonService';
import { getDepartmentByCode } from '@/pages/setting/department/service';

const { Row, Col } = Grid;
const { useForm } = Form;

function SearchForm(props: {
  onSearch: (values: Record<string, any>) => void;
}) {
  const [form] = useForm();
  const { data: categoryList } = useRequest(() => getEnum('CATEGORY'));
  const { data: specList } = useRequest(() => getEnum('SPEC'));
  const { data: techList } = useRequest(() => getEnum('TECH'));
  const { data: departmentData } = useRequest(() =>
    getDepartmentByCode('PROGRAM')
  );
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
            <Form.Item label="品名" field="category">
              <Select
                placeholder="请选择品名"
                showSearch
                allowClear
                filterOption={filterOption}
              >
                {categoryList?.map((item: any) => (
                  <Select.Option key={item.id} value={item.key}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="规格" field="spec">
              <Select
                placeholder="请选择规格"
                showSearch
                filterOption={filterOption}
              >
                {specList?.map((item: any) => (
                  <Select.Option key={item.id} value={item.key}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="工艺" field="tech">
              <Select
                placeholder="请选择工艺"
                showSearch
                filterOption={filterOption}
              >
                {techList?.map((item: any) => (
                  <Select.Option key={item.id} value={item.key}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="编程" field="programmerId">
              <Select
                placeholder="请选择编程"
                showSearch
                filterOption={filterOption}
              >
                {departmentData?.users?.map((item: any) => (
                  <Select.Option key={item.code} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="标签" field="tags">
              <Input allowClear placeholder="请输入标签" />
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
