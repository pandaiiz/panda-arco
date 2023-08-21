import React from 'react';
import { Modal, Form, Input, Message, Switch } from '@arco-design/web-react';
import useSWRMutation from 'swr/mutation';
import { patchFetcher, postFetcher } from '@/utils/request';
const FormItem = Form.Item;

function RoleList({ data, onClose }) {
  const [form] = Form.useForm();
  const { trigger: addDictTrigger } = useSWRMutation(
    '/api/dictionary',
    postFetcher
  );
  const { trigger: updateDictTrigger } = useSWRMutation(
    '/api/dictionary',
    patchFetcher
  );

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    if (data.id) await updateDictTrigger({ data: formData, id: data.id });
    else await addDictTrigger(formData);
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
        <Form labelCol={{ span: 5 }} form={form} initialValues={data}>
          <FormItem label="字典名" field="title" rules={[{ required: true }]}>
            <Input placeholder="请输入字典名" />
          </FormItem>
          <FormItem label="字典编码" field="key" rules={[{ required: true }]}>
            <Input placeholder="请输入字典编码" />
          </FormItem>
          <FormItem label="启用" field="enabled" triggerPropName="checked">
            <Switch />
          </FormItem>
          <FormItem label="备注" field="remark">
            <Input placeholder="请输入备注" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default RoleList;
