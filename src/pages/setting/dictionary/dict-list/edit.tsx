import React, { useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Message,
  Switch,
  InputNumber,
} from '@arco-design/web-react';
import { addDict, updateDict } from '@/pages/setting/dictionary/service';
import { cloneDeep } from 'lodash';
const FormItem = Form.Item;

function RoleList({ data, onClose }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!data.id) form.setFieldsValue({ enabled: 1, sort: 0 });
  }, []);

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    const submitData = cloneDeep(formData);
    submitData.enabled = submitData.enabled ? 1 : 0;
    if (data.id) await updateDict(data.id, submitData);
    else await addDict(submitData);
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
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 17 }}
          form={form}
          initialValues={data}
        >
          <FormItem label="字典名" field="title" rules={[{ required: true }]}>
            <Input placeholder="请输入字典名" />
          </FormItem>
          <FormItem label="字典编码" field="key" rules={[{ required: true }]}>
            <Input placeholder="请输入字典编码" />
          </FormItem>
          <FormItem label="排序" field="sort" rules={[{ required: true }]}>
            <InputNumber min={0} defaultValue={0} step={1} precision={0} />
          </FormItem>
          <FormItem label="备注" field="remark">
            <Input placeholder="请输入备注" />
          </FormItem>
          <FormItem
            label="启用"
            field="enabled"
            triggerPropName="checked"
            rules={[{ required: true }]}
          >
            <Switch />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default RoleList;
