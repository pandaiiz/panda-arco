import React, { useState } from 'react';
import { Modal, Form, Input, Message } from '@arco-design/web-react';
import {
  addDepartment,
  updateDepartment,
} from '@/pages/information/department/service';
import { validateMessages } from '@/utils/common';
const FormItem = Form.Item;

function DepartmentEdit({ data, onClose }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  async function onOk() {
    try {
      setLoading(true);
      await form.validate();
      const formData = form.getFieldsValue();
      if (data.id) await updateDepartment(data.id, formData);
      else await addDepartment(formData);
      Message.success('提交成功 !');
      onClose();
    } catch (e) {
    } finally {
      setLoading(false);
    }
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
        confirmLoading={loading}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          form={form}
          initialValues={data.id ? data : { enabled: true, breadcrumb: true }}
          validateMessages={validateMessages}
        >
          <FormItem label="部门名称" field="name" rules={[{ required: true }]}>
            <Input placeholder="请输入部门名称" />
          </FormItem>
          <FormItem label="部门编号" field="code" rules={[{ required: true }]}>
            <Input placeholder="请输入部门名称" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default DepartmentEdit;
