import React from 'react';
import {
  Modal,
  Form,
  Input,
  Message,
  Upload,
  Space,
  Tag,
} from '@arco-design/web-react';
import { addStyle, updateStyle } from '@/pages/information/style/service';
import { validateMessages } from '@/utils/common';
const FormItem = Form.Item;

function CustomerEdit({ data, onClose }) {
  const [form] = Form.useForm();

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    if (data.id) await updateStyle(data.id, formData);
    else await addStyle(formData);
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
          wrapperCol={{ span: 17 }}
          form={form}
          initialValues={data.id ? data : { enabled: true, breadcrumb: true }}
          validateMessages={validateMessages}
        >
          <FormItem label="品名" field="category">
            <Input placeholder="请选择品名" />
          </FormItem>
          <FormItem label="规格" field="contactsName">
            <Input placeholder="请选择品名" />
          </FormItem>
          <FormItem label="工艺" field="contactsPhone">
            <Input placeholder="请输入工艺" />
          </FormItem>
          <FormItem label="编程" field="contactsPhone">
            <Input placeholder="请输入工艺" />
          </FormItem>
          <FormItem label="款号" field="styleCode" rules={[{ required: true }]}>
            <Input placeholder="款号自动生成" />
          </FormItem>
          <FormItem label="设计图" field="contactsPhone">
            <Upload action="/" />
          </FormItem>
          <FormItem label="编程图" field="contactsPhone">
            <Upload action="/" />
          </FormItem>
          <FormItem label="实拍图" field="contactsPhone">
            <Upload action="/" />
          </FormItem>
          <FormItem label="标签" field="contactsPhone">
            <Space size="large">
              <Tag>圆</Tag>
              <Tag>星星</Tag>
              <Tag>客户觉得丑</Tag>
            </Space>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default CustomerEdit;
