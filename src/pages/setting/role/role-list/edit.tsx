import React from 'react';
import { Modal, Form, Input, Message } from '@arco-design/web-react';
import useSWRMutation from 'swr/mutation';
import { patchFetcher, postFetcher } from '@/utils/request';
const FormItem = Form.Item;

function RoleList({ data, onClose }) {
  const [form] = Form.useForm();
  const { trigger: addRoleTrigger } = useSWRMutation('/api/role', postFetcher);
  const { trigger: updateRoleTrigger } = useSWRMutation(
    '/api/role',
    patchFetcher
  );

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    if (data.id) updateRoleTrigger({ data: formData, id: data.id });
    else addRoleTrigger(formData);
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
          <FormItem label="名称" field="name" rules={[{ required: true }]}>
            <Input placeholder="请输入角色名称" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default RoleList;
