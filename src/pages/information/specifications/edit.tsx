import React from 'react';
import { Modal, Form, Input, Message, Select } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { getEnum } from '@/utils/commonService';
import {
  addSpecifications,
  updateSpecifications,
} from '@/pages/information/specifications/service';
const FormItem = Form.Item;

function SpecificationsEdit({ data, onClose }) {
  const [form] = Form.useForm();
  const { data: circleEnum } = useRequest(() => getEnum('CIRCLE'));
  const { data: categoryEnum } = useRequest(() => getEnum('CATEGORY'));
  const { data: singleWeightEnum } = useRequest(() => getEnum('SINGLE_WEIGHT'));

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    if (data.id) await updateSpecifications(data.id, formData);
    else await addSpecifications(formData);
    Message.success('提交成功 !');
    onClose();
  }
  return (
    <div>
      <Modal
        title={data.id ? '编辑' : '新增'}
        visible={true}
        onOk={onOk}
        autoFocus={false}
        focusLock={false}
        onCancel={onClose}
        // confirmLoading={isLoading}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          form={form}
          initialValues={data.id ? data : { enabled: true, breadcrumb: true }}
          validateMessages={{
            required: (_, { label }) => `必须填写${label}`,
            string: {
              length: `字符数必须是 #{length}`,
              match: `不匹配正则 #{pattern}`,
            },
            number: {
              min: `最小值为 #{min}`,
              max: `最大值为 #{max}`,
            },
          }}
        >
          <FormItem
            label="款号"
            field="styleNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入款号" />
          </FormItem>
          <FormItem label="圈号" field="circleNumber">
            <Select placeholder="请选择圈号" allowClear>
              {circleEnum?.map((item) => (
                <Select.Option key={item.id} value={JSON.stringify(item)}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="件重" field="singleWeight">
            <Select placeholder="请选择件重" allowClear>
              {singleWeightEnum?.map((item) => (
                <Select.Option key={item.id} value={JSON.stringify(item)}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="品名" field="category">
            <Select placeholder="请选择品名" allowClear>
              {categoryEnum?.map((item) => (
                <Select.Option key={item.id} value={JSON.stringify(item)}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default SpecificationsEdit;
