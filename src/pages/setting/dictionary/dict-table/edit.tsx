import React from 'react';
import { Modal, Form, Input, Message, Switch } from '@arco-design/web-react';
import useSWRMutation from 'swr/mutation';
import { patchFetcher, postFetcher } from '@/utils/request';
import { useRecoilValue } from 'recoil';
import { selectedDictState } from '@/pages/setting/dictionary';
const FormItem = Form.Item;

function EditDict({ data, onClose }) {
  const selectedDict = useRecoilValue(selectedDictState);
  const [form] = Form.useForm();
  const { trigger: addDictItemTrigger } = useSWRMutation(
    '/api/dictionary/item',
    postFetcher
  );
  const { trigger: updateDictItemTrigger } = useSWRMutation(
    '/api/dictionary/item',
    patchFetcher
  );

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    if (data.id) {
      await updateDictItemTrigger({ data: formData, id: data.id });
    } else {
      await addDictItemTrigger({ ...formData, dictId: selectedDict.id });
    }
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
          <FormItem label="字段名" field="title" rules={[{ required: true }]}>
            <Input placeholder="请输入字段名" />
          </FormItem>
          <FormItem label="编码" field="itemKey" rules={[{ required: true }]}>
            <Input placeholder="请输入编码" />
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

export default EditDict;
