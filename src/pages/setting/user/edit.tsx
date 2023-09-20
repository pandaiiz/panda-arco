import React from 'react';
import { Modal, Form, Input, Message, Select } from '@arco-design/web-react';
import { addUser, updateUser } from '@/pages/setting/user/service';
import { getRoles } from '@/pages/setting/role/service';
import { useRequest } from 'ahooks';
const FormItem = Form.Item;

function UserEdit({ data, onClose }) {
  const [form] = Form.useForm();
  const { data: roleList } = useRequest(getRoles);

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    if (data.id) await updateUser(data.id, formData);
    else await addUser(formData);
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
          <FormItem label="姓名" field="name" rules={[{ required: true }]}>
            <Input placeholder="请输入用户姓名" />
          </FormItem>
          <FormItem label="账号" field="account">
            <Input placeholder="请输入账号" />
          </FormItem>
          <FormItem label="角色" field="roleId" rules={[{ required: true }]}>
            <Select placeholder="请选择角色">
              {roleList?.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default UserEdit;
