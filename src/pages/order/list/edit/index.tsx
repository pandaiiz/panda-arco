import React from 'react';
import { Form, Input, Message, Select, Drawer } from '@arco-design/web-react';
import { addOrder, updateOrder } from '@/pages/order/list/service';
import { useRequest } from 'ahooks';
import { getCustomerList } from '@/pages/information/customer/service';
import EditableTable from '@/pages/order/list/edit/editableTable';
const FormItem = Form.Item;

function CustomerEdit({ data, onClose }) {
  const [form] = Form.useForm();
  const { data: customerList } = useRequest(getCustomerList);

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    if (data.id) await updateOrder(data.id, formData);
    else await addOrder(formData);
    Message.success('提交成功 !');
    onClose();
  }
  return (
    <div>
      <Drawer
        height="100%"
        placement="bottom"
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
            label="客户名称"
            field="customerId"
            rules={[{ required: true }]}
          >
            <Select placeholder="请选择" allowClear>
              {customerList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="订单号" field="orderNumber">
            <Input placeholder="请输入订单号" />
          </FormItem>
        </Form>
        <EditableTable list={[]} />
      </Drawer>
    </div>
  );
}

export default CustomerEdit;
