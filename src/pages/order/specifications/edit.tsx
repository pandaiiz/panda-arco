import React from 'react';
import {
  Modal,
  Form,
  Input,
  Message,
  TreeSelect,
  Switch,
} from '@arco-design/web-react';
import useSWRMutation from 'swr/mutation';
import { getFetcher, patchFetcher, postFetcher } from '@/utils/request';
import useSWR from 'swr';
const FormItem = Form.Item;

function MenuList({ data, onClose }) {
  const [form] = Form.useForm();
  const { data: roleList, isLoading } = useSWR(
    { url: '/api/role' },
    getFetcher
  );
  const { trigger: addUserTrigger } = useSWRMutation('/api/user', postFetcher);
  const { trigger: updateUserTrigger } = useSWRMutation(
    '/api/user',
    patchFetcher
  );

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    if (data.id) await updateUserTrigger({ data: formData, id: data.id });
    else await addUserTrigger(formData);
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
        confirmLoading={isLoading}
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
          <FormItem label="上级节点" field="parentId">
            <TreeSelect
              placeholder="请选择上级节点"
              treeData={roleList}
              allowClear
              fieldNames={{ key: 'id' }}
              onChange={(value) => {
                if (value === data.id) {
                  Message.error('不能选择自己作为上级节点！');
                  form.setFieldsValue({ parentId: data.parentId });
                }
              }}
            />
          </FormItem>
          <FormItem label="名称" field="title" rules={[{ required: true }]}>
            <Input placeholder="请输入菜单名称" />
          </FormItem>
          <FormItem label="地址" field="key" rules={[{ required: true }]}>
            <Input placeholder="请输入菜单地址" />
          </FormItem>
          <FormItem label="备注" field="remark">
            <Input placeholder="请输入备注" />
          </FormItem>
          <FormItem label="启用" field="enabled" triggerPropName="checked">
            <Switch />
          </FormItem>
          <FormItem
            tooltip="当前页是否展示面包屑。"
            label="面包屑"
            field="breadcrumb"
            triggerPropName="checked"
          >
            <Switch />
          </FormItem>
          <FormItem
            tooltip="当前路由是否渲染菜单项，为 true 的话不会在菜单中显示，但可通过路由地址访问。"
            label="不渲染"
            field="ignore"
            triggerPropName="checked"
          >
            <Switch />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default MenuList;
