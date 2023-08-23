import React from 'react';
import { Modal, Form, Input, Message } from '@arco-design/web-react';
import { addRole, updateRole } from '@/pages/setting/role/service';
const FormItem = Form.Item;

function RoleEdit({ data, onClose }) {
  const [form] = Form.useForm();

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    if (data.id) await updateRole(data.id, formData);
    else await addRole(formData);
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
      >
        <Form labelCol={{ span: 4 }} form={form} initialValues={data}>
          <FormItem label="名称" field="title" rules={[{ required: true }]}>
            <Input placeholder="请输入角色名称" />
          </FormItem>
          <FormItem label="KEY" field="key" rules={[{ required: true }]}>
            <Input placeholder="请输入KEY" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default RoleEdit;
