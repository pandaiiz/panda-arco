import React, { useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Message,
  TreeSelect,
  Switch,
  InputNumber,
} from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { addMenu, getMenus, updateMenu } from '@/pages/setting/menu/service';
import { validateMessages } from '@/utils/common';
import { cloneDeep } from 'lodash';
const FormItem = Form.Item;

function MenuEdit({ data, onClose }) {
  const [form] = Form.useForm();
  const { data: menuList, loading } = useRequest(getMenus);

  useEffect(() => {
    if (!data.id) form.setFieldsValue({ enabled: 1, sort: 0 });
  }, []);
  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    const submitData = cloneDeep(formData);
    submitData.enabled = submitData.enabled ? 1 : 0;
    if (data.id) await updateMenu(data.id, submitData);
    else await addMenu(submitData);
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
        confirmLoading={loading}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 17 }}
          form={form}
          initialValues={data.id ? data : { enabled: true, breadcrumb: true }}
          validateMessages={validateMessages}
        >
          <FormItem label="上级节点" field="parentId">
            <TreeSelect
              placeholder="请选择上级节点"
              treeData={menuList}
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
            disabled={!data.parentId}
          >
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

export default MenuEdit;
