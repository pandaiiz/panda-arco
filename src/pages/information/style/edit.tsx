import React from 'react';
import { Modal, Form, Input, Message } from '@arco-design/web-react';
import {
  addCustomer,
  updateCustomer,
} from '@/pages/information/customer/service';
import { validateMessages } from '@/utils/common';
const FormItem = Form.Item;

function CustomerEdit({ data, onClose }) {
  const [form] = Form.useForm();

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    if (data.id) await updateCustomer(data.id, formData);
    else await addCustomer(formData);
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
          validateMessages={validateMessages}
        >
          <FormItem
            label="客户名称"
            field="styleCode"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入客户名称" />
          </FormItem>
          <FormItem
            label="客户编号"
            field="circle"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入客户名称" />
          </FormItem>
          <FormItem label="客户联系方式" field="singleWeight">
            <Input placeholder="请输入客户联系方式" />
          </FormItem>
          <FormItem label="联系人名字" field="contactsName">
            <Input placeholder="请输入联系人名字" />
          </FormItem>
          <FormItem label="联系人电话" field="contactsPhone">
            <Input placeholder="请输入联系人电话" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default CustomerEdit;
