import React from 'react';
import { Button, Drawer, Form, Input, Select } from '@arco-design/web-react';
import { filterOption } from '@/utils/common';
import { useRequest } from 'ahooks';
import { getEnum } from '@/utils/commonService';
import { getDepartmentByCode } from '@/pages/setting/department/service';
const { useForm } = Form;

function MobileFilter(props: {
  onSearch: (values: Record<string, any>) => void;
  setVisible: (visible: boolean) => void;
}) {
  const { onSearch, setVisible } = props;
  const [form] = useForm();
  const { data: categoryList } = useRequest(() => getEnum('CATEGORY'));
  const { data: specList } = useRequest(() => getEnum('SPEC'));
  const { data: techList } = useRequest(() => getEnum('TECH'));
  const { data: departmentData } = useRequest(() =>
    getDepartmentByCode('PROGRAM')
  );

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    onSearch(values);
    setVisible(false);
  };
  return (
    window.innerWidth < 500 && (
      <>
        <Drawer
          autoFocus={false}
          width={300}
          title="查询"
          visible={true}
          onOk={handleSubmit}
          onCancel={() => setVisible(false)}
        >
          <Form layout="vertical" form={form} labelAlign="left">
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
            </Form.Item>{' '}
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
            </Form.Item>{' '}
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
            <Form.Item label="标签" field="tags">
              <Input allowClear placeholder="请输入标签" />
            </Form.Item>
            <Form.Item>
              <Button long type="outline" onClick={() => form.resetFields()}>
                重置
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </>
    )
  );
}

export default MobileFilter;
