import React from 'react';
import { Modal, Form, Input, Message, Switch } from '@arco-design/web-react';
import { useRecoilValue } from 'recoil';
import { selectedDictState } from '@/pages/setting/dictionary';
import {
  addDictItem,
  updateDictItem,
} from '@/pages/setting/dictionary/service';
const FormItem = Form.Item;

function EditDict({ data, onClose }) {
  const selectedDict = useRecoilValue(selectedDictState);
  const [form] = Form.useForm();

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    if (data.id) {
      await updateDictItem(data.id, formData);
    } else {
      await addDictItem({ ...formData, dictId: selectedDict.id });
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
          <FormItem label="编码" field="key" rules={[{ required: true }]}>
            <Input placeholder="请输入编码" />
          </FormItem>
          {/*<FormItem label="启用" field="enabled" triggerPropName="checked">*/}
          {/*  <Switch />*/}
          {/*</FormItem>*/}
          <FormItem label="备注" field="remark">
            <Input placeholder="请输入备注" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default EditDict;
